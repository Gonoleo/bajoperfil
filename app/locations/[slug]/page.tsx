"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const CATEGORY_LABELS: Record<string, string> = {
  arcade: "Arcade",
  tienda_retro: "Tienda Retro",
  tcg_mesa: "Cartas y Mesa",
  lan_center: "LAN Center",
  bar_torneos: "Bar con Torneos",
  comic_gaming: "Comics Gaming",
};

const CATEGORY_COLORS: Record<string, string> = {
  arcade: "#ff2e88",
  tienda_retro: "#2ee6d6",
  tcg_mesa: "#f5a623",
  lan_center: "#7d3c98",
  bar_torneos: "#2d7a4f",
  comic_gaming: "#3d5afe",
};

type Location = {
  id: string;
  nombre: string;
  categoria: string;
  direccion: string;
  barrio: string | null;
  horario: string | null;
  telefono: string | null;
  sitio_web: string | null;
  instagram: string | null;
  descripcion: string | null;
  imagen_url: string | null;
  lat: number;
  lng: number;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function Header() {
  return (
    <nav className="sticky top-0 z-20 flex items-center gap-2.5 border-b border-white/[0.08] bg-[#0f0b1a]/70 px-6 py-5 backdrop-blur-md">
      <a href="/" className="flex items-center gap-2.5 no-underline">
        <span className="rounded-md bg-[#ff2e88] px-[9px] py-1 font-mono text-[13px] font-bold tracking-tight text-[#0f0b1a]">
          BP
        </span>
        <span className="text-sm font-semibold text-[#f5f3ff]">BajoPerfil</span>
      </a>
    </nav>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#0f0b1a] text-[#f5f3ff]">
      <Header />
      <div className="mx-auto max-w-[640px] animate-pulse px-6 py-10">
        <div className="mb-6 h-[280px] w-full rounded-2xl bg-gradient-to-br from-[#1a1330] to-[#0f0b1a]" />
        <div className="mb-4 h-6 w-24 rounded bg-white/10" />
        <div className="mb-3 h-9 w-2/3 rounded bg-white/10" />
        <div className="h-4 w-1/2 rounded bg-white/10" />
      </div>
    </div>
  );
}

export default function LocationPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchLocation() {
      const { data, error } = await supabase
        .from("Locaciones")
        .select("*")
        .eq("activo", true);

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const match = (data as Location[]).find(
        (loc) => slugify(loc.nombre) === slug
      );

      if (!match) {
        setNotFound(true);
      } else {
        setLocation(match);
      }
      setLoading(false);
    }
    fetchLocation();
  }, [slug]);

  if (loading) return <LoadingSkeleton />;

  if (notFound || !location) {
    return (
      <div className="min-h-screen bg-[#0f0b1a] text-[#f5f3ff]">
        <Header />
        <div className="mx-auto max-w-[480px] px-6 py-24 text-center">
          <p className="mb-4 text-lg font-semibold">No encontramos esta locacion.</p>
          <p className="mb-6 text-sm text-[#9a8fc2]">Puede que se haya movido o ya no este activa.</p>
          <a href="/" className="inline-block rounded-md bg-[#2ee6d6] px-5 py-2.5 text-sm font-semibold text-[#0f0b1a] no-underline transition-opacity hover:opacity-85">Volver al mapa</a>
        </div>
      </div>
    );
  }

  const catColor = CATEGORY_COLORS[location.categoria] || "#ff2e88";

  return (
    <div className="min-h-screen bg-[#0f0b1a] text-[#f5f3ff]">
      <Header />

      <div className="mx-auto max-w-[640px] px-6 py-10">
        {location.imagen_url && (
          <img src={location.imagen_url} alt={location.nombre} className="mb-6 h-[280px] w-full rounded-2xl object-cover" />
        )}

        <span className="mb-3.5 inline-block rounded-md px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#0f0b1a]" style={{ background: catColor }}>
          {CATEGORY_LABELS[location.categoria] || location.categoria}
        </span>

        <h1 className="mb-3 text-[clamp(26px,5vw,38px)] font-extrabold">
          {location.nombre}
        </h1>

        <p className="mb-6 text-[15px] text-[#9a8fc2]">
          {location.direccion}
          {location.barrio ? " - " + location.barrio : ""}
        </p>

        {location.descripcion && (
          <p className="mb-7 text-[15px] leading-relaxed text-[#f5f3ff]">
            {location.descripcion}
          </p>
        )}

        <div className="mb-7 flex flex-col gap-2.5 text-sm text-[#9a8fc2]">
          {location.horario && (
            <p className="m-0"><strong className="text-[#f5f3ff]">Horario:</strong> {location.horario}</p>
          )}
          {location.telefono && (
            <p className="m-0"><strong className="text-[#f5f3ff]">Telefono:</strong> {location.telefono}</p>
          )}
          {location.sitio_web && (
            <p className="m-0"><strong className="text-[#f5f3ff]">Sitio web:</strong> <a href={"https://" + location.sitio_web.replace(/^https?:\/\//, "")} target="_blank" rel="noopener noreferrer" className="text-[#2ee6d6]">{location.sitio_web}</a></p>
          )}
        </div>

        <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(location.nombre + " " + location.direccion)} target="_blank" rel="noopener noreferrer" className="inline-block rounded-lg bg-[#2ee6d6] px-5 py-3 text-sm font-semibold text-[#0f0b1a] no-underline transition-opacity hover:opacity-85">Ver reviews en Google Maps</a>

        <p className="mt-8"><a href="/" className="text-[13px] text-[#6b5f8f]">Volver al mapa</a></p>
      </div>
    </div>
  );
}
