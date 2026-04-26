"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

const FILTERS = [
  { label: "Todos",     storeID: null },
  { label: "Steam",     storeID: "1"  },
  { label: "GOG",       storeID: "7"  },
  { label: "Humble",    storeID: "11" },
  { label: "Epic",      storeID: "25" },
];

function ratingColor(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("overwhelmingly positive") || t.includes("very positive") || t.includes("positive")) return "#4ade80";
  if (t.includes("mixed") || t.includes("mostly positive")) return "#facc15";
  return "#f87171";
}

const STORE_NAMES: Record<string, string> = {
  "1": "Steam", "2": "GamersGate", "3": "GreenManGaming",
  "7": "GOG", "8": "Origin", "11": "Humble",
  "13": "Uplay", "15": "Fanatical", "25": "Epic",
};

export default function Page() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activeStore, setActiveStore] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchDeals() {
      setLoading(true);
      const url = new URL("https://www.cheapshark.com/api/1.0/deals");
      url.searchParams.set("upperPrice", "20");
      url.searchParams.set("pageSize", "12");
      if (activeStore) url.searchParams.set("storeID", activeStore);
      const res = await fetch(url.toString());
      const data: Deal[] = await res.json();
      if (!cancelled) {
        setDeals(data);
        setLoading(false);
      }
    }
    fetchDeals();
    return () => { cancelled = true; };
  }, [activeStore]);

  const freeDeals = deals.filter((d) => parseFloat(d.salePrice) === 0).length;
  const bestDiscount = deals.length
    ? Math.max(...deals.map((d) => Math.round(parseFloat(d.savings))))
    : 0;

  const stats = [
    { label: "Ofertas activas",  value: deals.length ? `${deals.length}+` : "—" },
    { label: "Juegos gratis",    value: String(freeDeals)          },
    { label: "Mejor descuento",  value: deals.length ? `-${bestDiscount}%` : "—" },
    { label: "Actualizado",      value: "Cada hora"                },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#85B7EB" }}>

      {/* Navbar */}
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
        <div style={{ display: "flex", gap: "20px", fontSize: "13px" }}>
          {["Ofertas", "Top Rated", "Gratis"].map((item) => (
            <a key={item} href="#"
              className="text-[rgba(133,183,235,0.55)] hover:text-[#85B7EB] transition-colors duration-150"
              style={{ textDecoration: "none" }}
            >{item}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        background: "#0d1b2e",
        backgroundImage: "radial-gradient(rgba(133,183,235,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        borderBottom: "1px solid rgba(133,183,235,0.08)",
        padding: "56px 24px 52px",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "48px" }}>

          {/* Izquierda */}
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
              fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900,
              lineHeight: 1.1, letterSpacing: "-1.5px", color: "#ffffff", margin: "0 0 16px",
            }}>
              Las mejores ofertas<br />
              <span style={{ color: "#85B7EB" }}>gaming en español</span>
            </h1>
            <p style={{ fontSize: "15px", color: "rgba(133,183,235,0.55)", margin: "0 0 32px", lineHeight: 1.5 }}>
              Precios en dólares. Actualizado cada hora.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="#deals" style={{
                display: "inline-block", padding: "11px 24px",
                background: "#185FA5", color: "#fff",
                fontSize: "14px", fontWeight: 700, borderRadius: "8px",
                textDecoration: "none", border: "1px solid #1e72c0",
              }}>
                Ver ofertas de hoy
              </a>
              <a href="#" style={{
                display: "inline-block", padding: "11px 24px",
                background: "transparent", color: "#85B7EB",
                fontSize: "14px", fontWeight: 700, borderRadius: "8px",
                textDecoration: "none", border: "1px solid rgba(133,183,235,0.35)",
              }}>
                Juegos gratis
              </a>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", flexShrink: 0, width: "280px" }}>
            {stats.map(({ label, value }) => (
              <div key={label} style={{
                background: "rgba(13,21,32,0.7)", border: "1px solid rgba(133,183,235,0.1)",
                borderRadius: "10px", padding: "16px 14px", backdropFilter: "blur(6px)",
              }}>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", margin: "0 0 4px", lineHeight: 1 }}>
                  {value}
                </p>
                <p style={{ fontSize: "11px", color: "rgba(133,183,235,0.45)", margin: 0, lineHeight: 1.3 }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de deals */}
      <main id="deals" style={{ padding: "0 24px 48px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* Filtros */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "20px 0 18px" }}>
          {FILTERS.map(({ label, storeID }) => {
            const isActive = activeStore === storeID;
            return (
              <button
                key={label}
                onClick={() => setActiveStore(storeID)}
                style={{
                  padding: "7px 16px",
                  fontSize: "13px",
                  fontWeight: 600,
                  borderRadius: "999px",
                  border: isActive ? "1px solid #185FA5" : "1px solid rgba(133,183,235,0.18)",
                  background: isActive ? "#185FA5" : "transparent",
                  color: isActive ? "#ffffff" : "rgba(133,183,235,0.6)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Cabecera sección */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "rgba(133,183,235,0.35)" }}>
            Destacadas
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(133,183,235,0.08)" }} />
          <span style={{ fontSize: "11px", color: "rgba(133,183,235,0.25)" }}>
            {loading ? "Cargando..." : `${deals.length} juegos`}
          </span>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{
                background: "#0d1520", border: "1px solid #1a2a3a",
                borderRadius: "14px", overflow: "hidden",
              }}>
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

        {/* Grid de cards */}
        {!loading && deals.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(133,183,235,0.35)" }}>
            <p style={{ fontSize: "15px" }}>No hay ofertas disponibles para esta plataforma.</p>
          </div>
        )}

        {!loading && deals.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {deals.map((deal) => {
              const savings = Math.round(parseFloat(deal.savings));
              const storeName = STORE_NAMES[deal.storeID] ?? "Tienda";
              const hasRating = deal.steamRatingText && deal.steamRatingText !== "0";
              const ratingPct = deal.steamRatingPercent && deal.steamRatingPercent !== "0"
                ? deal.steamRatingPercent : null;

              return (
                <article
                  key={deal.dealID}
                  className="hover:shadow-[0_0_0_1px_#2a4060] group"
                  style={{
                    background: "#0d1520", border: "1px solid #1a2a3a",
                    borderRadius: "14px", overflow: "hidden",
                    display: "flex", flexDirection: "column",
                    transition: "box-shadow 0.2s",
                  }}
                >
                  <div style={{ position: "relative", height: "140px", overflow: "hidden", flexShrink: 0 }}>
                    <Image
                      src={deal.thumb} alt={deal.title}
                      width={460} height={215}
                      style={{ width: "100%", height: "140px", objectFit: "cover", display: "block" }}
                      unoptimized
                    />
                    {savings > 0 && (
                      <span style={{
                        position: "absolute", top: "10px", left: "10px",
                        background: "#4ade80", color: "#0a0a0a",
                        fontSize: "11px", fontWeight: 800,
                        padding: "3px 8px", borderRadius: "6px", letterSpacing: "0.02em",
                      }}>
                        -{savings}%
                      </span>
                    )}
                    <span style={{
                      position: "absolute", top: "10px", right: "10px",
                      background: "#1a2a3a", color: "#85B7EB",
                      fontSize: "10px", fontWeight: 600,
                      padding: "3px 8px", borderRadius: "6px", border: "1px solid #2a4060",
                    }}>
                      {storeName}
                    </span>
                  </div>

                  <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                    <h3
                      className="group-hover:text-[#85B7EB] transition-colors"
                      style={{
                        fontSize: "14px", fontWeight: 600, color: "#e2eaf4",
                        lineHeight: 1.4, margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}
                    >
                      {deal.title}
                    </h3>

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
                      <span style={{ fontSize: "22px", fontWeight: 800, color: "#4ade80", lineHeight: 1 }}>
                        ${deal.salePrice}
                      </span>
                      {parseFloat(deal.normalPrice) > parseFloat(deal.salePrice) && (
                        <span style={{ fontSize: "13px", color: "#4a5a6a", textDecoration: "line-through" }}>
                          ${deal.normalPrice}
                        </span>
                      )}
                    </div>

                    <a
                      href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-[#1a3550] hover:border-[#85B7EB]/40"
                      style={{
                        display: "block", textAlign: "center", padding: "9px 0",
                        background: "#0f2235", border: "1px solid #2a4060",
                        borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                        color: "#85B7EB", textDecoration: "none",
                        transition: "background 0.15s, border-color 0.15s",
                      }}
                    >
                      Ver oferta →
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <footer style={{ borderTop: "1px solid rgba(133,183,235,0.07)", padding: "20px 24px", textAlign: "center" }}>
        <p style={{ fontSize: "11px", color: "rgba(133,183,235,0.18)", margin: 0 }}>
          BajoPerfil.gg · Precios vía CheapShark API
        </p>
      </footer>
    </div>
  );
}
