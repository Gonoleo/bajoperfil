"use client";

import { useState } from "react";
import LocationsMap from "./components/LocationsMap";

const CATEGORIES = [
  { key: "arcade", label: "Arcades", color: "#ff2e88" },
  { key: "tienda_retro", label: "Tiendas Retro", color: "#2ee6d6" },
  { key: "tcg_mesa", label: "Cartas y Mesa", color: "#f5a623" },
  { key: "lan_center", label: "LAN Centers", color: "#7d3c98" },
  { key: "bar_torneos", label: "Bares con Torneos", color: "#2d7a4f" },
  { key: "comic_gaming", label: "Comics Gaming", color: "#e91e8c" },
];

const responsiveStyles = ".bp-hero { padding: 56px 24px 32px; } .bp-search-wrap { max-width: 480px; margin: 0 auto 24px; padding: 0 24px; } .bp-pills { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; padding: 0 24px 32px; } @media (max-width: 640px) { .bp-hero { padding: 36px 16px 24px; } .bp-search-wrap { padding: 0 16px; } .bp-pills { flex-wrap: nowrap; overflow-x: auto; justify-content: flex-start; padding: 0 16px 24px; -webkit-overflow-scrolling: touch; } .bp-pills button { flex-shrink: 0; } .bp-map-section { padding: 0 12px 40px !important; } }";

export default function HomePage() {
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div style={{ minHeight: "100vh", background: "#0f0b1a", color: "#f5f3ff" }}>
      <style>{responsiveStyles}</style>

      <nav style={{ display: "flex", alignItems: "center", gap: "10px", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "13px", fontWeight: 700, color: "#0f0b1a", background: "#ff2e88", borderRadius: "6px", padding: "4px 9px", letterSpacing: "-0.02em" }}>
          BP
        </span>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#f5f3ff" }}>
          BajoPerfil
        </span>
      </nav>

      <section className="bp-hero" style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#2ee6d6", margin: "0 0 14px" }}>
          Directorio gaming en español
        </p>
        <h1 style={{ fontSize: "clamp(26px, 6vw, 48px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 12px" }}>
          Locaciones gaming en NYC
        </h1>
        <p style={{ fontSize: "15px", color: "#9a8fc2", maxWidth: "480px", margin: "0 auto" }}>
          Arcades, tiendas retro, LAN centers y más lugares gaming en toda la ciudad.
        </p>
      </section>

      <div className="bp-search-wrap">
        <input
          type="text"
          placeholder="Busca un lugar por nombre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "12px 14px", color: "#f5f3ff", fontSize: "14px", outline: "none" }}
        />
      </div>

      <div className="bp-pills">
        <button
          onClick={() => setCategoryFilter(null)}
          style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "12px", fontWeight: 600, color: !categoryFilter ? "#0f0b1a" : "#f5f3ff", background: !categoryFilter ? "#f5f3ff" : "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "999px", padding: "6px 14px", cursor: "pointer" }}
        >
          Todos
        </button>
        {CATEGORIES.map((cat) => {
          const active = categoryFilter === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setCategoryFilter(active ? null : cat.key)}
              style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "12px", fontWeight: 600, color: active ? "#0f0b1a" : "#f5f3ff", background: active ? cat.color : "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "999px", padding: "6px 12px 6px 8px", cursor: "pointer" }}
            >
              <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: active ? "#0f0b1a" : cat.color, flexShrink: 0 }} />
              {cat.label}
            </button>
          );
        })}
      </div>

      <section className="bp-map-section" style={{ padding: "0 24px 64px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", borderRadius: "16px", border: "1px solid rgba(255,46,136,0.35)", boxShadow: "0 0 0 1px rgba(46,230,214,0.08), 0 20px 60px rgba(0,0,0,0.5)", overflow: "hidden" }}>
          <LocationsMap categoryFilter={categoryFilter} searchQuery={searchQuery} />
        </div>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "28px 24px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", color: "#6b5f8f", margin: 0 }}>
          BajoPerfil · Locaciones gaming en New York City
        </p>
      </footer>
    </div>
  );
}
