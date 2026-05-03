import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acerca de",
  description: "BajoPerfil nació de una necesidad real: encontrar eventos gaming en Nueva York, pero en español. Conoce nuestra historia.",
};

export default function AcercaDe() {
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
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#1a0533" }}>BajoPerfil</span>
        </Link>
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center",
          padding: "8px 16px", borderRadius: "8px",
          border: "1px solid #e5e7eb", background: "#ffffff",
          fontSize: "13px", fontWeight: 600, color: "#374151",
          textDecoration: "none",
        }}>
          ← Volver
        </Link>
      </nav>

      {/* ── Header ── */}
      <div style={{ background: "#1a0533", padding: "48px 24px 40px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h1 style={{
            fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900,
            color: "#ffffff", margin: 0, letterSpacing: "-0.5px",
          }}>
            Acerca de BajoPerfil
          </h1>
        </div>
      </div>

      {/* ── Contenido ── */}
      <main style={{ maxWidth: "680px", margin: "0 auto", padding: "52px 24px 80px" }}>

        <p style={{ fontSize: "17px", color: "#111827", lineHeight: 1.85, margin: "0 0 28px", fontWeight: 500 }}>
          BajoPerfil nació de algo muy sencillo: querer buscar eventos gaming en Nueva York y no encontrar nada en español. Todo en inglés, todo disperso, todo en tres sitios diferentes. Decidimos resolver eso.
        </p>

        <p style={{ fontSize: "16px", color: "#374151", lineHeight: 1.85, margin: "0 0 28px" }}>
          Vivir en Nueva York significa moverse en inglés todo el día. Pero hay algo especial en encontrar tu idioma en el lugar menos esperado. El español no es solo comunicación — es familiaridad, es confianza, es sentirte menos extranjero en una ciudad que puede sentirse enorme.
        </p>

        <p style={{ fontSize: "16px", color: "#374151", lineHeight: 1.85, margin: "0 0 28px" }}>
          La propuesta de BajoPerfil es simple: todos los eventos gaming de NYC en un solo lugar, ordenados por fecha, con links oficiales, en español. Torneos, Comic Con, Pokemon, Esports — si pasa en Nueva York y tiene que ver con gaming, lo vas a encontrar aquí. Nueva York es un mar de culturas y eso lo hace aún más interesante. No hay un solo tipo de gamer acá.
        </p>

        <p style={{ fontSize: "16px", color: "#374151", lineHeight: 1.85, margin: "0 0 48px" }}>
          El futuro de BajoPerfil incluye noticias de la industria, una comunidad donde conectar con otros gamers, y expansión a otras ciudades — Miami, Los Ángeles, Chicago — donde también hay gente que quiere encontrar su espacio en su idioma. Por ahora, empezamos por casa.
        </p>

        <div style={{
          borderTop: "2px solid #f3f4f6", paddingTop: "32px",
          display: "flex", alignItems: "center", gap: "16px",
        }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "10px",
            background: "#1a0533", display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: "18px", fontWeight: 900, color: "#ffffff" }}>BP</span>
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827", margin: "0 0 2px" }}>BajoPerfil</p>
            <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>Eventos gaming en español · Nueva York</p>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={{ background: "#1a0533", padding: "36px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span style={{
            fontSize: "20px", fontWeight: 900, color: "#ffffff",
            background: "rgba(255,255,255,0.1)", borderRadius: "8px", padding: "4px 10px",
          }}>BP</span>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "12px 0 0" }}>
            BajoPerfil · Eventos gaming en New York City
          </p>
          <p style={{ margin: "10px 0 0", display: "flex", gap: "16px", justifyContent: "center" }}>
            <Link href="/acerca-de" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
              Acerca de
            </Link>
            <Link href="/politica-de-privacidad" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
              Política de Privacidad
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
