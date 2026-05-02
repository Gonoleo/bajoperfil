"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type EventItem = {
  id: number | string;
  nombre: string;
  fecha: string;
  hora: string | null;
  lugar: string;
  ciudad: string;
  categoria: string;
  descripcion: string | null;
  url: string;
  imagen_url: string | null;
};

const CATEGORY_PILLS = ["Todos", "Gaming", "Pokemon", "Comic Con", "Esports", "Trading Cards", "Nintendo"];

const CATEGORY_COLOR: Record<string, string> = {
  "Gaming":        "#6d28d9",
  "Pokemon":       "#d97706",
  "Comic Con":     "#7c3aed",
  "Esports":       "#059669",
  "Trading Cards": "#ea580c",
  "Nintendo":      "#dc2626",
};

export default function Page() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    supabase
      .from("Eventos")
      .select("id, nombre, fecha, hora, lugar, ciudad, categoria, descripcion, url, imagen_url")
      .order("fecha", { ascending: true })
      .then(({ data, error }) => {
        if (error) console.error("[eventos]", error.message);
        if (data && data[0]) console.log("[eventos] campos del primer evento:", Object.keys(data[0]));
        setEvents(Array.isArray(data) ? data : []);
        setEventsLoading(false);
      });
  }, []);

  const filteredEvents = Array.isArray(events)
    ? events.filter((e) => {
        if (categoryFilter && e.categoria !== categoryFilter) return false;
        if (searchQuery.length >= 2 && !e.nombre.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
      })
    : [];

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#1a1a1a" }}>

      {/* ── Navbar ── */}
      <nav style={{
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        padding: "0 24px", height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <span style={{
            fontSize: "20px", fontWeight: 900, color: "#ffffff",
            background: "#1a0533", borderRadius: "8px", padding: "4px 10px",
            letterSpacing: "-0.5px",
          }}>BP</span>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#1a0533" }}>BajoPerfil.gg</span>
        </div>

        <div style={{ flex: 1, maxWidth: "480px", margin: "0 32px", position: "relative" }}>
          <svg style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Buscar eventos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%", boxSizing: "border-box",
              background: "#f3f4f6", border: "1px solid #e5e7eb",
              borderRadius: "8px", padding: "9px 36px",
              color: "#1a1a1a", fontSize: "14px", outline: "none",
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} style={{
              position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer",
              color: "#9ca3af", fontSize: "18px", lineHeight: 1,
            }}>×</button>
          )}
        </div>

        <button style={{
          padding: "9px 20px", background: "#1a0533", color: "#ffffff",
          fontSize: "14px", fontWeight: 600, borderRadius: "8px", border: "none",
          cursor: "pointer", flexShrink: 0,
        }}>
          Explorar
        </button>
      </nav>

      {/* ── Hero ── */}
      <section style={{ background: "#1a0533", padding: "64px 24px 56px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.45)",
            margin: "0 0 16px",
          }}>
            Eventos gaming para el latino en USA
          </p>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900,
            color: "#ffffff", lineHeight: 1.1, margin: "0 0 16px",
            letterSpacing: "-1.5px",
          }}>
            Encuentra tu próximo evento
          </h1>
          <p style={{
            fontSize: "14px", color: "rgba(255,255,255,0.5)",
            margin: "0 0 36px", fontWeight: 500,
          }}>
            Torneos · Comic Con · Pokemon · Esports · New York City
          </p>

          <div style={{ position: "relative", maxWidth: "560px", margin: "0 auto 32px" }}>
            <svg style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Busca un evento, juego o ciudad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%", boxSizing: "border-box",
                background: "#ffffff", border: "none",
                borderRadius: "12px", padding: "16px 48px",
                color: "#1a1a1a", fontSize: "16px", outline: "none",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }}
            />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
            {CATEGORY_PILLS.map((cat) => {
              const active = cat === "Todos" ? !categoryFilter : categoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat === "Todos" ? null : cat)}
                  style={{
                    padding: "7px 16px", fontSize: "13px", fontWeight: 600,
                    borderRadius: "999px", cursor: "pointer", border: "1px solid",
                    background: active ? "#ffffff" : "rgba(255,255,255,0.08)",
                    color: active ? "#1a0533" : "rgba(255,255,255,0.7)",
                    borderColor: active ? "#ffffff" : "rgba(255,255,255,0.2)",
                    transition: "all 0.15s",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Sección Eventos ── */}
      <section style={{ background: "#ffffff", padding: "48px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111827", margin: 0 }}>
              Próximos eventos en New York City
            </h2>
            {!eventsLoading && (
              <span style={{ fontSize: "13px", color: "#6b7280" }}>
                {filteredEvents.length} evento{filteredEvents.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {eventsLoading && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
                  <div className="animate-pulse" style={{ height: "160px", background: "#e5e7eb" }} />
                  <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div className="animate-pulse" style={{ height: "12px", background: "#e5e7eb", borderRadius: "4px", width: "40%" }} />
                    <div className="animate-pulse" style={{ height: "16px", background: "#e5e7eb", borderRadius: "4px", width: "85%" }} />
                    <div className="animate-pulse" style={{ height: "12px", background: "#e5e7eb", borderRadius: "4px", width: "60%" }} />
                    <div className="animate-pulse" style={{ height: "36px", background: "#e5e7eb", borderRadius: "8px", marginTop: "8px" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!eventsLoading && filteredEvents.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af" }}>
              <p style={{ fontSize: "15px", margin: 0 }}>No hay eventos próximos para estos filtros.</p>
            </div>
          )}

          {!eventsLoading && filteredEvents.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {filteredEvents.map((event) => {
                const catColor = CATEGORY_COLOR[event.categoria] ?? "#6d28d9";
                return (
                  <Link key={event.id} href={`/eventos/${event.id}`} style={{ textDecoration: "none" }}>
                  <article style={{
                    background: "#ffffff", border: "1px solid #e5e7eb",
                    borderRadius: "12px", overflow: "hidden",
                    display: "flex", flexDirection: "column",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    cursor: "pointer", height: "100%",
                  }}>
                    <div style={{ height: "160px", position: "relative", background: "#f3f4f6", flexShrink: 0 }}>
                      {event.imagen_url ? (
                        <Image src={event.imagen_url} alt={event.nombre} fill
                          style={{ objectFit: "cover" }} unoptimized />
                      ) : (
                        <div style={{
                          width: "100%", height: "100%",
                          background: `linear-gradient(135deg, ${catColor}22, ${catColor}55)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <span style={{ fontSize: "40px" }}>🎮</span>
                        </div>
                      )}
                      <span style={{
                        position: "absolute", bottom: "10px", left: "10px",
                        background: catColor, color: "#ffffff",
                        fontSize: "10px", fontWeight: 700, letterSpacing: "0.05em",
                        padding: "3px 8px", borderRadius: "4px",
                        textTransform: "uppercase" as const,
                      }}>
                        {event.categoria}
                      </span>
                    </div>

                    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "#ea580c", margin: 0 }}>
                        {event.fecha}
                      </p>
                      <h3 style={{
                        fontSize: "15px", fontWeight: 700, color: "#111827",
                        lineHeight: 1.4, margin: 0,
                        display: "-webkit-box", WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                      }}>
                        {event.nombre}
                      </h3>
                      {event.lugar && (
                        <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                          {event.lugar} · New York City
                        </p>
                      )}

                      <div style={{ flex: 1 }} />

                      <div style={{
                        display: "block", textAlign: "center",
                        marginTop: "12px", padding: "10px 0",
                        background: "#1a0533", color: "#ffffff",
                        fontSize: "13px", fontWeight: 600,
                        borderRadius: "8px",
                      }}>
                        Ver evento →
                      </div>
                    </div>
                  </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#1a0533", padding: "36px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span style={{
            fontSize: "20px", fontWeight: 900, color: "#ffffff",
            background: "rgba(255,255,255,0.1)", borderRadius: "8px", padding: "4px 10px",
          }}>BP</span>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "12px 0 0" }}>
            BajoPerfil.gg · Eventos gaming en New York City
          </p>
        </div>
      </footer>
    </div>
  );
}
