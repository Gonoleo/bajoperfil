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
  comic_gaming: "#e91e8c",
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

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f0b1a", color: "#9a8fc2", padding: "40px 24px" }}>
        Cargando...
      </div>
    );
  }

  if (notFound || !location) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f0b1a", color: "#f5f3ff", padding: "40px 24px", textAlign: "center" }}>
        <p>No encontramos esta locacion.</p>
        <a href="/" style={{ color: "#2ee6d6" }}>Volver al mapa</a>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f0b1a", color: "#f5f3ff" }}>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "20px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "13px",
              fontWeight: 700,
              color: "#0f0b1a",
              background: "#ff2e88",
              borderRadius: "6px",
              padding: "4px 9px",
              letterSpacing: "-0.02em",
            }}
          >
            BP
          </span>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#f5f3ff" }}>
            BajoPerfil
          </span>
        </a>
      </nav>

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "40px 24px" }}>
        {location.imagen_url && (
          <img
            src={location.imagen_url}
            alt={location.nombre}
            style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "16px", marginBottom: "24px" }}
          />
        )}

        <span
          style={{
            display: "inline-block",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#0f0b1a",
            background: CATEGORY_COLORS[location.categoria] || "#ff2e88",
            borderRadius: "6px",
            padding: "5px 10px",
            marginBottom: "14px",
          }}
        >
          {CATEGORY_LABELS[location.categoria] || location.categoria}
        </span>

        <h1 style={{ fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 800, margin: "0 0 12px" }}>
          {location.nombre}
        </h1>

        <p style={{ fontSize: "15px", color: "#9a8fc2", marginBottom: "24px" }}>
          {location.direccion}{location.barrio ? " - " + location.barrio : ""}
        </p>

        {location.descripcion && (
          <p style={{ fontSize: "15px", color: "#f5f3ff", lineHeight: 1.7, marginBottom: "28px" }}>
            {location.descripcion}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px", fontSize: "14px", color: "#9a8fc2" }}>
          {location.horario && <p style={{ margin: 0 }}><strong style={{ color: "#f5f3ff" }}>Horario:</strong> {location.horario}</p>}
          {location.telefono && <p style={{ margin: 0 }}><strong style={{ color: "#f5f3ff" }}>Telefono:</strong> {location.telefono}</p>}
          {location.sitio_web && (
            <p style={{ margin: 0 }}>
              <strong style={{ color: "#f5f3ff" }}>Sitio web:</strong>{" "}
              <a href={"https://" + location.sitio_web.replace(/^https?:\/\//, "")} target="_blank" rel="noopener noreferrer" style={{ color: "#2ee6d6" }}>
                {location.sitio_web}
              </a>
            </p>
          )}
        </div>

        <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(location.nombre + " " + location.direccion)} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontSize: "14px", fontWeight: 600, color: "#0f0b1a", background: "#2ee6d6", borderRadius: "8px", padding: "12px 20px", textDecoration: "none" }}>
          Ver reviews en Google Maps
        </a>

        <p style={{ marginTop: "32px" }}>
          <a href="/" style={{ fontSize: "13px", color: "#6b5f8f" }}>Volver al mapa</a>
        </p>
      </div>
    </div>
  );
}
