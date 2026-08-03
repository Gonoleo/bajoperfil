export default function AcercaDePage() {
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
      </nav>

      <section style={{ padding: "56px 24px", maxWidth: "640px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "clamp(26px, 5vw, 38px)",
            fontWeight: 800,
            marginBottom: "20px",
          }}
        >
          Acerca de BajoPerfil
        </h1>
        <p style={{ fontSize: "15px", color: "#9a8fc2", lineHeight: 1.7, marginBottom: "16px" }}>
          BajoPerfil es un directorio de locaciones gaming en New York City, pensado
          para la comunidad hispanohablante. Reunimos arcades, tiendas retro, tiendas
          de cartas y juegos de mesa, LAN centers, bares con torneos y más lugares
          donde vivir la cultura gaming en la ciudad.
        </p>
        <p style={{ fontSize: "15px", color: "#9a8fc2", lineHeight: 1.7 }}>
          Cada locación es verificada antes de publicarse, para asegurar información
          precisa y actualizada.
        </p>
      </section>

      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "28px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "12px", color: "#6b5f8f", margin: 0 }}>
          BajoPerfil · Locaciones gaming en New York City
        </p>
      </footer>
    </div>
  );
}
