"use client";

import { useState } from "react";
import LocationsMap from "./components/LocationsMap";

const CATEGORIES = [
  { key: "arcade", label: "Arcades", color: "#ff2e88" },
  { key: "tienda_retro", label: "Tiendas Retro", color: "#2ee6d6" },
  { key: "tcg_mesa", label: "Cartas y Mesa", color: "#f5a623" },
  { key: "lan_center", label: "LAN Centers", color: "#7d3c98" },
  { key: "bar_torneos", label: "Bares con Torneos", color: "#2d7a4f" },
  { key: "comic_gaming", label: "Comics Gaming", color: "#3d5afe" },
];

export default function HomePage() {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#0f0b1a] text-[#f5f3ff]">
      <nav className="sticky top-0 z-20 flex items-center gap-2.5 border-b border-white/[0.08] bg-[#0f0b1a]/70 px-6 py-5 backdrop-blur-md">
        <span className="rounded-md bg-[#ff2e88] px-[9px] py-1 font-mono text-[13px] font-bold tracking-tight text-[#0f0b1a]">
          BP
        </span>
        <span className="text-sm font-semibold text-[#f5f3ff]">BajoPerfil</span>
      </nav>

      <section className="px-6 pb-8 pt-14 text-center sm:pt-14">
        <p className="mb-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2ee6d6]">
          Directorio gaming en español
        </p>
        <h1 className="mb-3 text-[clamp(26px,6vw,48px)] font-extrabold leading-[1.1] tracking-tight">
          Locaciones gaming en NYC
        </h1>
        <p className="mx-auto max-w-[480px] text-[15px] text-[#9a8fc2]">
          Arcades, tiendas retro, LAN centers y más lugares gaming en toda la ciudad.
        </p>
      </section>

      <div className="mx-auto mb-6 max-w-[480px] px-6 sm:px-6">
        <input
          type="text"
          placeholder="Busca un lugar por nombre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-[10px] border border-white/10 bg-white/[0.06] px-3.5 py-3 text-sm text-[#f5f3ff] outline-none transition-colors focus:border-[#2ee6d6]/50"
        />
      </div>

      <div className="scrollbar-none flex gap-2.5 overflow-x-auto px-4 pb-6 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-6">
        <button
          onClick={() => setCategoryFilter(null)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.08] px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 hover:brightness-110 ${
            !categoryFilter ? "bg-[#f5f3ff] text-[#0f0b1a]" : "bg-white/[0.05] text-[#f5f3ff]"
          }`}
        >
          Todos
        </button>
        {CATEGORIES.map((cat) => {
          const active = categoryFilter === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setCategoryFilter(active ? null : cat.key)}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.08] py-1.5 pl-2 pr-3 text-xs font-semibold transition-all duration-200 hover:brightness-110"
              style={{
                background: active ? cat.color : "rgba(255,255,255,0.05)",
                color: active ? "#0f0b1a" : "#f5f3ff",
              }}
            >
              <span
                className="h-[9px] w-[9px] shrink-0 rounded-full"
                style={{ background: active ? "#0f0b1a" : cat.color }}
              />
              {cat.label}
            </button>
          );
        })}
      </div>

      <section className="px-3 pb-16 sm:px-6">
        <div className="mx-auto max-w-[1000px] overflow-hidden rounded-2xl border border-[#ff2e88]/35 shadow-[0_0_0_1px_rgba(46,230,214,0.08),0_20px_60px_rgba(0,0,0,0.5)] transition-opacity duration-300">
          <LocationsMap categoryFilter={categoryFilter} searchQuery={searchQuery} />
        </div>
      </section>

      <footer className="border-t border-white/[0.08] px-6 py-7 text-center">
        <p className="text-xs text-[#6b5f8f]">
          BajoPerfil · Locaciones gaming en New York City
        </p>
      </footer>
    </div>
  );
}
