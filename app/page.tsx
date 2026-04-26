"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type EventItem = {
  id: number | string;
  nombre: string;
  fecha: string;
  ciudad: string;
  venue: string;
  url: string;
  imagen_url: string | null;
  categoria: string;
};

// ─── Types ───────────────────────────────────────────────────────────────────

type Deal = {
  dealID: string;
  title: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  thumb: string;
  metacriticScore: string;
  steamRatingText: string;
  steamRatingPercent: string;
  storeID: string;
};

const CITY_FILTERS = [
  { label: "Todas",   value: null      },
  { label: "NYC",     value: "NYC"     },
  { label: "Miami",   value: "Miami"   },
  { label: "LA",      value: "LA"      },
  { label: "Chicago", value: "Chicago" },
];

const CATEGORY_STYLE: Record<string, { gradient: string; accent: string }> = {
  "Pokemon":       { gradient: "linear-gradient(135deg, #2a1500, #b45309)", accent: "#f59e0b" },
  "Comic Con":     { gradient: "linear-gradient(135deg, #1a0a2e, #4c1d95)", accent: "#a855f7" },
  "Esports":       { gradient: "linear-gradient(135deg, #0a2010, #16a34a)", accent: "#4ade80" },
  "Trading Cards": { gradient: "linear-gradient(135deg, #2a0f00, #c2410c)", accent: "#fb923c" },
  "Gaming":        { gradient: "linear-gradient(135deg, #0f2a4a, #185FA5)", accent: "#85B7EB" },
};

// ─── Ofertas ─────────────────────────────────────────────────────────────────

const STORE_FILTERS = [
  { label: "Todos",  storeID: null },
  { label: "Steam",  storeID: "1"  },
  { label: "GOG",    storeID: "7"  },
  { label: "Humble", storeID: "11" },
  { label: "Epic",   storeID: "25" },
];

const STORE_NAMES: Record<string, string> = {
  "1": "Steam", "7": "GOG", "8": "Origin",
  "11": "Humble", "15": "Fanatical", "25": "Epic",
};

function ratingColor(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("overwhelmingly positive") || t.includes("very positive") || t.includes("positive")) return "#4ade80";
  if (t.includes("mixed") || t.includes("mostly positive")) return "#facc15";
  return "#f87171";
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Page() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activeStore, setActiveStore] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("Eventos")
      .select("*")
      .order("fecha", { ascending: true })
      .then(({ data, error }) => {
        if (error) console.error("[eventos]", error.message);
        setEvents(Array.isArray(data) ? data : []);
        setEventsLoading(false);
      });
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function fetchDeals() {
      setLoading(true);
      const url = new URL("https://www.cheapshark.com/api/1.0/deals");
      url.searchParams.set("upperPrice", "20");
      url.searchParams.set("pageSize", "12");
      if (activeStore) url.searchParams.set("storeID", activeStore);
      if (searchQuery.length >= 3) url.searchParams.set("title", searchQuery);
      const res = await fetch(url.toString());
      const data: Deal[] = await res.json();
      if (!cancelled) { setDeals(data); setLoading(false); }
    }
    if (searchQuery.length >= 3) {
      const timer = setTimeout(fetchDeals, 400);
      return () => { cancelled = true; clearTimeout(timer); };
    }
    if (searchQuery.length === 0) {
      fetchDeals();
      return () => { cancelled = true; };
    }
  }, [activeStore, searchQuery]);

  const displayedDeals = searchQuery.length > 0 && searchQuery.length < 3
    ? deals.filter((d) => d.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : deals;

  const filteredEvents = Array.isArray(events)
    ? (cityFilter ? events.filter((e) => e.ciudad === cityFilter) : events)
    : [];

  const freeDeals = deals.filter((d) => parseFloat(d.salePrice) === 0).length;
  const bestDiscount = deals.length ? Math.max(...deals.map((d) => Math.round(parseFloat(d.savings)))) : 0;

  const stats = [
    { label: "Eventos este mes", value: eventsLoading ? "—" : String(events.length) },
    { label: "Ciudades",         value: "4"                                       },
    { label: "Mejor descuento",  value: deals.length ? `-${bestDiscount}%` : "—" },
    { label: "Juegos gratis",    value: String(freeDeals)                         },
  ];

  // Helpers de estilos reutilizables
  const filterBtn = (active: boolean) => ({
    padding: "7px 16px", fontSize: "13px", fontWeight: 600,
    borderRadius: "999px", cursor: "pointer", transition: "all 0.15s",
    border: active ? "1px solid #185FA5" : "1px solid rgba(133,183,235,0.18)",
    background: active ? "#185FA5" : "transparent",
    color: active ? "#ffffff" : "rgba(133,183,235,0.6)",
  });

  const sectionHeader = (title: string, count: string | number) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
      <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "rgba(133,183,235,0.35)" }}>
        {title}
      </span>
      <div style={{ flex: 1, height: "1px", background: "rgba(133,183,235,0.08)" }} />
      <span style={{ fontSize: "11px", color: "rgba(133,183,235,0.25)" }}>{count}</span>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#85B7EB" }}>

      {/* ── Navbar ── */}
      <nav style={{
        borderBottom: "1px solid rgba(133,183,235,0.12)",
        padding: "0 24px", height: "52px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 10,
        backdropFilter: "blur(8px)", background: "rgba(10,10,10,0.85)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{
            fontSize: "18px", fontWeight: 900, color: "#85B7EB",
            background: "rgba(133,183,235,0.1)", border: "1px solid rgba(133,183,235,0.25)",
            borderRadius: "8px", padding: "3px 10px", letterSpacing: "-0.5px",
          }}>BP</span>
          <span style={{ fontSize: "13px", color: "rgba(133,183,235,0.45)", fontWeight: 500 }}>
            BajoPerfil.gg
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", fontSize: "13px" }}>
          <a href="#eventos" style={{
            textDecoration: "none", fontWeight: 700, color: "#85B7EB",
            background: "rgba(133,183,235,0.1)", border: "1px solid rgba(133,183,235,0.2)",
            borderRadius: "6px", padding: "4px 10px",
          }}>
            Eventos
          </a>
          {["Ofertas", "Top Rated", "Gratis"].map((item) => (
            <a key={item} href="#"
              className="text-[rgba(133,183,235,0.55)] hover:text-[#85B7EB] transition-colors duration-150"
              style={{ textDecoration: "none" }}
            >{item}</a>
          ))}
        </div>
      </nav>

      {/* ── Barra de búsqueda ── */}
      <div style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(133,183,235,0.08)", padding: "10px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          <svg
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", opacity: 0.35, pointerEvents: "none" }}
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#85B7EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Buscar juegos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%", boxSizing: "border-box",
              background: "#0d1520", border: "1px solid rgba(133,183,235,0.15)",
              borderRadius: "8px", padding: "9px 36px",
              color: "#e2eaf4", fontSize: "14px", outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(133,183,235,0.4)")}
            onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(133,183,235,0.15)")}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} style={{
              position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(133,183,235,0.4)", fontSize: "18px", lineHeight: 1, padding: "2px 4px",
            }}>×</button>
          )}
        </div>
      </div>

      {/* ── Hero ── */}
      <section style={{
        background: "#0d1b2e",
        backgroundImage: "radial-gradient(rgba(133,183,235,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        borderBottom: "1px solid rgba(133,183,235,0.08)",
        padding: "56px 24px 52px",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "48px" }}>
          <div style={{ flex: "1 1 0", minWidth: 0 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "rgba(133,183,235,0.1)", border: "1px solid rgba(133,183,235,0.2)",
              borderRadius: "999px", padding: "5px 14px",
              fontSize: "12px", fontWeight: 600, color: "#85B7EB", marginBottom: "22px",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#85B7EB", display: "inline-block" }} />
              Para el gamer latino en USA
            </span>
            <h1 style={{
              fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 900,
              lineHeight: 1.1, letterSpacing: "-1.5px", color: "#ffffff", margin: "0 0 14px",
            }}>
              Eventos y ofertas gaming<br />
              <span style={{ color: "#85B7EB" }}>para el latino en USA</span>
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(133,183,235,0.6)", margin: "0 0 32px", fontWeight: 500, letterSpacing: "0.02em" }}>
              NYC · Miami · LA · Chicago
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="#eventos" style={{
                display: "inline-block", padding: "11px 24px",
                background: "#185FA5", color: "#fff",
                fontSize: "14px", fontWeight: 700, borderRadius: "8px",
                textDecoration: "none", border: "1px solid #1e72c0",
              }}>
                Ver próximos eventos
              </a>
              <a href="#deals" style={{
                display: "inline-block", padding: "11px 24px",
                background: "transparent", color: "#85B7EB",
                fontSize: "14px", fontWeight: 700, borderRadius: "8px",
                textDecoration: "none", border: "1px solid rgba(133,183,235,0.35)",
              }}>
                Ver ofertas
              </a>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", flexShrink: 0, width: "280px" }}>
            {stats.map(({ label, value }) => (
              <div key={label} style={{
                background: "rgba(13,21,32,0.7)", border: "1px solid rgba(133,183,235,0.1)",
                borderRadius: "10px", padding: "16px 14px", backdropFilter: "blur(6px)",
              }}>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", margin: "0 0 4px", lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: "11px", color: "rgba(133,183,235,0.45)", margin: 0, lineHeight: 1.3 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sección Eventos ── */}
      <section id="eventos" style={{ padding: "40px 24px 48px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header + filtros ciudad */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", margin: 0, letterSpacing: "-0.5px" }}>
            Próximos eventos
          </h2>
          <div style={{ display: "flex", gap: "6px" }}>
            {CITY_FILTERS.map(({ label, value }) => (
              <button key={label} onClick={() => setCityFilter(value)} style={filterBtn(cityFilter === value)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {sectionHeader("Eventos", `${filteredEvents.length} eventos`)}

        {eventsLoading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ background: "#0d1520", border: "1px solid #1a2a3a", borderRadius: "14px", overflow: "hidden" }}>
                <div className="animate-pulse" style={{ height: "110px", background: "#1a2a3a" }} />
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div className="animate-pulse" style={{ height: "14px", background: "#1a2a3a", borderRadius: "4px", width: "85%" }} />
                  <div className="animate-pulse" style={{ height: "12px", background: "#1a2a3a", borderRadius: "4px", width: "55%" }} />
                  <div className="animate-pulse" style={{ height: "36px", background: "#1a2a3a", borderRadius: "8px", marginTop: "8px" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {!eventsLoading && filteredEvents.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(133,183,235,0.35)" }}>
            <p style={{ fontSize: "15px", margin: 0 }}>No hay eventos próximos. Vuelve pronto.</p>
          </div>
        )}

        {!eventsLoading && filteredEvents.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {filteredEvents.map((event) => {
              const style = CATEGORY_STYLE[event.categoria] ?? CATEGORY_STYLE["Gaming"];
              return (
                <article key={event.id} style={{
                  background: "#0d1520", border: "1px solid #1a2a3a",
                  borderRadius: "14px", overflow: "hidden",
                  display: "flex", flexDirection: "column",
                }}>
                  {/* Header: imagen real o gradient de categoría */}
                  <div style={{
                    height: "110px", flexShrink: 0, position: "relative",
                    background: event.imagen_url ? "#0d1520" : style.gradient,
                    display: "flex", alignItems: "flex-end", padding: "12px",
                    overflow: "hidden",
                  }}>
                    {event.imagen_url && (
                      <Image src={event.imagen_url} alt={event.nombre} fill
                        style={{ objectFit: "cover" }} unoptimized
                      />
                    )}
                    <span style={{
                      position: "relative", zIndex: 1,
                      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
                      border: `1px solid ${style.accent}40`,
                      color: style.accent, fontSize: "10px", fontWeight: 700,
                      padding: "3px 8px", borderRadius: "5px", letterSpacing: "0.04em",
                      textTransform: "uppercase" as const,
                    }}>
                      {event.categoria}
                    </span>
                    <span style={{
                      position: "absolute", top: "12px", right: "12px", zIndex: 1,
                      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
                      color: "rgba(255,255,255,0.85)", fontSize: "10px", fontWeight: 600,
                      padding: "3px 8px", borderRadius: "5px",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}>
                      {event.ciudad}
                    </span>
                  </div>

                  {/* Contenido */}
                  <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                    <h3 style={{
                      fontSize: "14px", fontWeight: 700, color: "#e2eaf4",
                      lineHeight: 1.35, margin: 0,
                      display: "-webkit-box", WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical", overflow: "hidden",
                    }}>
                      {event.nombre}
                    </h3>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={style.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span style={{ fontSize: "12px", color: style.accent, fontWeight: 500 }}>{event.fecha}</span>
                    </div>

                    {event.venue && (
                      <p style={{ fontSize: "11px", color: "rgba(133,183,235,0.4)", margin: 0, lineHeight: 1.4 }}>
                        {event.venue}
                      </p>
                    )}

                    <div style={{ flex: 1 }} />

                    <a href={event.url} target="_blank" rel="noopener noreferrer" style={{
                      display: "block", textAlign: "center", padding: "9px 0",
                      background: "#0f2235", border: "1px solid #2a4060",
                      borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                      color: "#85B7EB", textDecoration: "none",
                    }}>
                      Ver evento →
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Sección Ofertas ── */}
      <section style={{ borderTop: "1px solid rgba(133,183,235,0.08)" }}>
        <main id="deals" style={{ padding: "40px 24px 48px", maxWidth: "1200px", margin: "0 auto" }}>

          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", margin: "0 0 20px", letterSpacing: "-0.5px" }}>
            Ofertas gaming
          </h2>

          {/* Filtros tienda */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "18px" }}>
            {STORE_FILTERS.map(({ label, storeID }) => (
              <button key={label} onClick={() => setActiveStore(storeID)} style={filterBtn(activeStore === storeID)}>
                {label}
              </button>
            ))}
          </div>

          {sectionHeader("Destacadas", loading ? "Cargando..." : `${displayedDeals.length} juegos`)}

          {/* Skeleton */}
          {loading && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ background: "#0d1520", border: "1px solid #1a2a3a", borderRadius: "14px", overflow: "hidden" }}>
                  <div className="animate-pulse" style={{ height: "140px", background: "#1a2a3a" }} />
                  <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div className="animate-pulse" style={{ height: "14px", background: "#1a2a3a", borderRadius: "4px", width: "80%" }} />
                    <div className="animate-pulse" style={{ height: "12px", background: "#1a2a3a", borderRadius: "4px", width: "50%" }} />
                    <div className="animate-pulse" style={{ height: "24px", background: "#1a2a3a", borderRadius: "4px", width: "40%", marginTop: "8px" }} />
                    <div className="animate-pulse" style={{ height: "36px", background: "#1a2a3a", borderRadius: "8px", marginTop: "4px" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && displayedDeals.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(133,183,235,0.35)" }}>
              <p style={{ fontSize: "15px", margin: 0 }}>
                {searchQuery.length >= 3 ? "No encontramos juegos con ese nombre." : "No hay ofertas disponibles para esta tienda."}
              </p>
            </div>
          )}

          {!loading && displayedDeals.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {displayedDeals.map((deal) => {
                const savings = Math.round(parseFloat(deal.savings));
                const storeName = STORE_NAMES[deal.storeID] ?? "Tienda";
                const hasRating = deal.steamRatingText && deal.steamRatingText !== "0";
                const ratingPct = deal.steamRatingPercent && deal.steamRatingPercent !== "0" ? deal.steamRatingPercent : null;

                return (
                  <article key={deal.dealID} className="hover:shadow-[0_0_0_1px_#2a4060] group" style={{
                    background: "#0d1520", border: "1px solid #1a2a3a",
                    borderRadius: "14px", overflow: "hidden",
                    display: "flex", flexDirection: "column", transition: "box-shadow 0.2s",
                  }}>
                    <div style={{ position: "relative", height: "140px", overflow: "hidden", flexShrink: 0 }}>
                      <Image src={deal.thumb} alt={deal.title} width={460} height={215}
                        style={{ width: "100%", height: "140px", objectFit: "cover", display: "block" }}
                        unoptimized
                      />
                      {savings > 0 && (
                        <span style={{
                          position: "absolute", top: "10px", left: "10px",
                          background: "#4ade80", color: "#0a0a0a",
                          fontSize: "11px", fontWeight: 800,
                          padding: "3px 8px", borderRadius: "6px", letterSpacing: "0.02em",
                        }}>-{savings}%</span>
                      )}
                      <span style={{
                        position: "absolute", top: "10px", right: "10px",
                        background: "#1a2a3a", color: "#85B7EB",
                        fontSize: "10px", fontWeight: 600,
                        padding: "3px 8px", borderRadius: "6px", border: "1px solid #2a4060",
                      }}>{storeName}</span>
                    </div>

                    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                      <h3 className="group-hover:text-[#85B7EB] transition-colors" style={{
                        fontSize: "14px", fontWeight: 600, color: "#e2eaf4",
                        lineHeight: 1.4, margin: 0,
                        display: "-webkit-box", WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}>{deal.title}</h3>

                      {hasRating && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: ratingColor(deal.steamRatingText), flexShrink: 0 }} />
                          <span style={{ fontSize: "12px", color: ratingColor(deal.steamRatingText), fontWeight: 500 }}>
                            {deal.steamRatingText}
                            {ratingPct && <span style={{ opacity: 0.7 }}> · {ratingPct}%</span>}
                          </span>
                        </div>
                      )}

                      <div style={{ flex: 1 }} />

                      <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                        <span style={{ fontSize: "22px", fontWeight: 800, color: "#4ade80", lineHeight: 1 }}>${deal.salePrice}</span>
                        {parseFloat(deal.normalPrice) > parseFloat(deal.salePrice) && (
                          <span style={{ fontSize: "13px", color: "#4a5a6a", textDecoration: "line-through" }}>${deal.normalPrice}</span>
                        )}
                      </div>

                      <a href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                        target="_blank" rel="noopener noreferrer"
                        className="hover:bg-[#1a3550] hover:border-[#85B7EB]/40"
                        style={{
                          display: "block", textAlign: "center", padding: "9px 0",
                          background: "#0f2235", border: "1px solid #2a4060",
                          borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                          color: "#85B7EB", textDecoration: "none",
                          transition: "background 0.15s, border-color 0.15s",
                        }}
                      >Ver oferta →</a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
      </section>

      <footer style={{ borderTop: "1px solid rgba(133,183,235,0.07)", padding: "20px 24px", textAlign: "center" }}>
        <p style={{ fontSize: "11px", color: "rgba(133,183,235,0.18)", margin: 0 }}>
          BajoPerfil.gg · Eventos gaming para el latino en USA
        </p>
      </footer>
    </div>
  );
}
