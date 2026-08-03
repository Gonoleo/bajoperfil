import LocationsMap from './components/LocationsMap';

const CATEGORIES = [
  { label: "Arcades", color: "#ff2e88" },
  { label: "Tiendas Retro", color: "#2ee6d6" },
  { label: "Cartas y Mesa", color: "#f5a623" },
  { label: "LAN Centers", color: "#7d3c98" },
  { label: "Bares con Torneos", color: "#2d7a4f" },
  { label: "Comics Gaming", color: "#e91e8c" },
];

export default function HomePage() {
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

      <section style={{ padding: "56px 24px 32px", textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#2ee6d6",
            margin: "0 0 14px",
          }}
        >
          Directorio gaming en español
        </p>
        <h1
          style={{
            fontSize: "clamp(28px, 6vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 12px",
          }}
        >
          Locaciones gaming en NYC
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#9a8fc2",
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          Arcades, tiendas retro, LAN centers y más lugares gaming en toda la ciudad.
        </p>
      </section>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          padding: "0 24px 32px",
        }}
      >
        {CATEGORIES.map((cat) => (
          <span
            key={cat.label}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#f5f3ff",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "999px",
              padding: "6px 12px 6px 8px",
            }}
          >
            <span
              style={{
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: cat.color,
                flexShrink: 0,
              }}
            />
            {cat.label}
          </span>
        ))}
      </div>

      <section style={{ padding: "0 24px 64px" }}>
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            borderRadius: "16px",
            border: "1px solid rgba(255,46,136,0.35)",
            boxShadow: "0 0 0 1px rgba(46,230,214,0.08), 0 20px 60px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >
          <LocationsMap />
        </div>
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
