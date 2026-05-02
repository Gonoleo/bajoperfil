"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type EventDetail = {
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
  precio?: string | null;
};

const CATEGORY_COLOR: Record<string, string> = {
  "Gaming":        "#6d28d9",
  "Pokemon":       "#d97706",
  "Comic Con":     "#7c3aed",
  "Esports":       "#059669",
  "Trading Cards": "#ea580c",
  "Nintendo":      "#dc2626",
};

export default function EventoDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const parsedId = isNaN(Number(id)) ? id : Number(id);
    supabase
      .from("Eventos")
      .select("id, nombre, fecha, hora, lugar, ciudad, categoria, descripcion, url, imagen_url")
      .eq("id", parsedId)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFound(true);
        } else {
          setEvent(data);
        }
        setLoading(false);
      });
  }, [id]);

  const catColor = event ? (CATEGORY_COLOR[event.categoria] ?? "#6d28d9") : "#6d28d9";

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#1a1a1a" }}>

      {/* ── Navbar ── */}
      <nav style={{
        background: "#ffffff", borderBottom: "1px solid #e5e7eb",
        padding: "0 24px", height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <span style={{
            fontSize: "20px", fontWeight: 900, color: "#ffffff",
            background: "#1a0533", borderRadius: "8px", padding: "4px 10px",
            letterSpacing: "-0.5px",
          }}>BP</span>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#1a0533" }}>BajoPerfil.gg</span>
        </Link>
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "8px 16px", borderRadius: "8px",
          border: "1px solid #e5e7eb", background: "#ffffff",
          fontSize: "13px", fontWeight: 600, color: "#374151",
          textDecoration: "none",
        }}>
          ← Volver
        </Link>
      </nav>

      {/* ── Loading ── */}
      {loading && (
        <div style={{ maxWidth: "800px", margin: "48px auto", padding: "0 24px" }}>
          <div className="animate-pulse" style={{ height: "360px", background: "#e5e7eb", borderRadius: "16px", marginBottom: "32px" }} />
          <div className="animate-pulse" style={{ height: "16px", background: "#e5e7eb", borderRadius: "4px", width: "30%", marginBottom: "16px" }} />
          <div className="animate-pulse" style={{ height: "36px", background: "#e5e7eb", borderRadius: "4px", width: "80%", marginBottom: "24px" }} />
          <div className="animate-pulse" style={{ height: "14px", background: "#e5e7eb", borderRadius: "4px", width: "50%", marginBottom: "12px" }} />
          <div className="animate-pulse" style={{ height: "14px", background: "#e5e7eb", borderRadius: "4px", width: "60%", marginBottom: "12px" }} />
        </div>
      )}

      {/* ── Not found ── */}
      {!loading && notFound && (
        <div style={{ maxWidth: "800px", margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
          <p style={{ fontSize: "48px", margin: "0 0 16px" }}>😕</p>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#111827", margin: "0 0 12px" }}>Evento no encontrado</h1>
          <p style={{ fontSize: "15px", color: "#6b7280", margin: "0 0 32px" }}>
            Este evento no existe o fue eliminado.
          </p>
          <Link href="/" style={{
            display: "inline-block", padding: "12px 28px",
            background: "#1a0533", color: "#ffffff",
            fontSize: "14px", fontWeight: 600,
            borderRadius: "8px", textDecoration: "none",
          }}>
            Ver todos los eventos
          </Link>
        </div>
      )}

      {/* ── Event detail ── */}
      {!loading && event && (
        <>
          {/* Hero image */}
          <div style={{ width: "100%", height: "360px", position: "relative", background: "#f3f4f6" }}>
            {event.imagen_url ? (
              <Image
                src={event.imagen_url}
                alt={event.nombre}
                fill
                style={{ objectFit: "cover" }}
                unoptimized
                priority
              />
            ) : (
              <div style={{
                width: "100%", height: "100%",
                background: `linear-gradient(135deg, ${catColor}33, ${catColor}66)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: "72px" }}>🎮</span>
              </div>
            )}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
            }} />
          </div>

          {/* Content */}
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px 64px" }}>

            {/* Category badge */}
            <span style={{
              display: "inline-block",
              background: catColor, color: "#ffffff",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em",
              padding: "4px 10px", borderRadius: "4px",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}>
              {event.categoria}
            </span>

            {/* Title */}
            <h1 style={{
              fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900,
              color: "#111827", lineHeight: 1.2,
              margin: "0 0 28px", letterSpacing: "-0.5px",
            }}>
              {event.nombre}
            </h1>

            {/* Meta info */}
            <div style={{
              display: "flex", flexDirection: "column", gap: "14px",
              padding: "24px", borderRadius: "12px",
              background: "#f9fafb", border: "1px solid #e5e7eb",
              marginBottom: "32px",
            }}>
              {/* Date & time */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "8px",
                  background: "#1a0533", display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Fecha</p>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "#111827", margin: 0 }}>
                    {event.fecha}
                    {event.hora && <span style={{ color: "#6b7280", fontWeight: 400 }}> · {event.hora}</span>}
                  </p>
                </div>
              </div>

              {/* Lugar */}
              {event.lugar && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "8px",
                    background: "#1a0533", display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Lugar</p>
                    <p style={{ fontSize: "15px", fontWeight: 600, color: "#111827", margin: 0 }}>
                      {event.lugar}
                    </p>
                    <p style={{ fontSize: "13px", color: "#6b7280", margin: "2px 0 0" }}>
                      New York City
                    </p>
                  </div>
                </div>
              )}

              {/* Price */}
              {event.precio && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "8px",
                    background: "#1a0533", display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Precio</p>
                    <p style={{ fontSize: "15px", fontWeight: 600, color: "#111827", margin: 0 }}>{event.precio}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {event.descripcion && (
              <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: "0 0 12px" }}>
                  Acerca del evento
                </h2>
                <p style={{
                  fontSize: "15px", color: "#374151",
                  lineHeight: 1.7, margin: 0,
                  whiteSpace: "pre-wrap",
                }}>
                  {event.descripcion}
                </p>
              </div>
            )}

            {/* CTA */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block", padding: "14px 32px",
                  background: "#1a0533", color: "#ffffff",
                  fontSize: "15px", fontWeight: 700,
                  borderRadius: "10px", textDecoration: "none",
                  flex: "1 1 auto", textAlign: "center",
                }}
              >
                Más información →
              </a>
              <Link href="/" style={{
                display: "inline-block", padding: "14px 24px",
                background: "#ffffff", color: "#374151",
                fontSize: "15px", fontWeight: 600,
                borderRadius: "10px", textDecoration: "none",
                border: "1px solid #e5e7eb",
                textAlign: "center",
              }}>
                ← Volver
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
