import { NextResponse } from "next/server";

// ─── Tipos de Eventbrite ──────────────────────────────────────────────────────

type EBLogo = {
  url: string;
  original?: { url: string };
} | null;

type EBVenue = {
  name: string;
  address: {
    city?: string;
    localized_address_display?: string;
  };
} | null;

type EBEvent = {
  id: string;
  name: { text: string };
  start: { local: string };
  url: string;
  logo: EBLogo;
  venue: EBVenue;
};

type EBResponse = {
  events?: EBEvent[];
  error?: string;
};

// ─── Tipo público que consume el frontend ─────────────────────────────────────

export type EventItem = {
  id: string;
  name: string;
  date: string;
  city: string;
  venue: string;
  url: string;
  imageUrl: string | null;
  category: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalizeCity(raw: string): string {
  const c = raw.toLowerCase();
  if (c.includes("new york") || c.includes("brooklyn") || c.includes("manhattan") || c.includes("queens")) return "NYC";
  if (c.includes("miami") || c.includes("fort lauderdale")) return "Miami";
  if (c.includes("los angeles") || c.includes("hollywood") || c.includes("santa monica")) return "LA";
  if (c.includes("chicago")) return "Chicago";
  return raw;
}

function detectCategory(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("pokemon") || n.includes("pokémon")) return "Pokemon";
  if (n.includes("comic con") || n.includes("comicon") || n.includes("comic-con")) return "Comic Con";
  if (n.includes("esport") || n.includes("tournament") || n.includes("championship")) return "Esports";
  if (n.includes("card") || n.includes("tcg") || n.includes("magic the gathering") || n.includes("mtg")) return "Trading Cards";
  return "Gaming";
}

function formatDate(local: string): string {
  const d = new Date(local);
  return d.toLocaleDateString("es-US", { month: "short", day: "numeric", year: "numeric" });
}

function buildUrl(q: string, city: string, token: string): string {
  const url = new URL("https://www.eventbriteapi.com/v3/events/search/");
  url.searchParams.set("q", q);
  url.searchParams.set("location.address", city);
  url.searchParams.set("location.within", "25mi");
  url.searchParams.set("expand", "venue,logo");
  url.searchParams.set("sort_by", "date");
  url.searchParams.set("token", token);
  return url.toString();
}

// ─── Búsquedas a ejecutar ─────────────────────────────────────────────────────

const SEARCHES = [
  { q: "gaming",    city: "New York, NY"   },
  { q: "pokemon",   city: "New York, NY"   },
  { q: "comic con", city: "New York, NY"   },
  { q: "esports",   city: "New York, NY"   },
  { q: "gaming",    city: "Miami, FL"      },
  { q: "gaming",    city: "Los Angeles, CA"},
  { q: "gaming",    city: "Chicago, IL"    },
];

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET() {
  const token = process.env.EVENTBRITE_API_KEY;
  if (!token) {
    console.error("[events] EVENTBRITE_API_KEY no está configurada");
    return NextResponse.json({ error: "EVENTBRITE_API_KEY no configurada" }, { status: 500 });
  }

  console.log("[events] Iniciando búsquedas en Eventbrite...");

  const responses = await Promise.allSettled(
    SEARCHES.map(({ q, city }) => {
      const url = buildUrl(q, city, token);
      console.log("[events] GET", url.replace(token, "***TOKEN***"));
      return fetch(url, { next: { revalidate: 3600 } });
    })
  );

  const seen = new Set<string>();
  const events: EventItem[] = [];

  for (let i = 0; i < responses.length; i++) {
    const result = responses[i];
    const search = SEARCHES[i];

    if (result.status === "rejected") {
      console.error(`[events] Fetch falló para "${search.q}" en "${search.city}":`, result.reason);
      continue;
    }

    const res = result.value;
    console.log(`[events] "${search.q}" en "${search.city}" → HTTP ${res.status}`);

    let data: EBResponse;
    try {
      data = await res.json();
    } catch (e) {
      console.error(`[events] JSON parse error para "${search.q}":`, e);
      continue;
    }

    console.log(`[events] Respuesta para "${search.q}" en "${search.city}":`, JSON.stringify(data).slice(0, 300));

    if (!data.events) {
      console.warn(`[events] Sin campo "events" en la respuesta. Claves recibidas:`, Object.keys(data));
      continue;
    }

    console.log(`[events] ${data.events.length} eventos encontrados para "${search.q}" en "${search.city}"`);

    for (const ev of data.events) {
      if (seen.has(ev.id)) continue;
      seen.add(ev.id);

      const rawCity = ev.venue?.address?.city ?? "";
      events.push({
        id:       ev.id,
        name:     ev.name.text,
        date:     formatDate(ev.start.local),
        city:     normalizeCity(rawCity) || rawCity || "USA",
        venue:    ev.venue?.name ?? "",
        url:      ev.url,
        imageUrl: ev.logo?.url ?? null,
        category: detectCategory(ev.name.text),
      });
    }
  }

  // Ordenar por fecha y devolver máximo 18
  events.sort((a, b) => a.date.localeCompare(b.date));
  return NextResponse.json(events.slice(0, 18));
}
