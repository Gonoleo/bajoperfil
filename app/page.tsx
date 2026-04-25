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

async function getDeals(): Promise<Deal[]> {
  const res = await fetch(
    "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=12"
  );
  return res.json();
}

function ratingColor(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("overwhelmingly positive") || t.includes("very positive") || t.includes("positive")) {
    return "#4ade80";
  }
  if (t.includes("mixed") || t.includes("mostly positive")) {
    return "#facc15";
  }
  return "#f87171";
}

const STORE_NAMES: Record<string, string> = {
  "1": "Steam",
  "2": "GamersGate",
  "3": "GreenManGaming",
  "7": "GOG",
  "8": "Origin",
  "11": "Humble",
  "13": "Uplay",
  "15": "Fanatical",
  "25": "Epic",
};

export default async function Page() {
  const deals = await getDeals();

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#85B7EB" }}>

      {/* Navbar */}
      <nav style={{
        borderBottom: "1px solid rgba(133,183,235,0.12)",
        padding: "0 24px",
        height: "52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 10,
        backdropFilter: "blur(8px)",
        background: "rgba(10,10,10,0.85)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{
            fontSize: "18px",
            fontWeight: 900,
            color: "#85B7EB",
            background: "rgba(133,183,235,0.1)",
            border: "1px solid rgba(133,183,235,0.25)",
            borderRadius: "8px",
            padding: "3px 10px",
            letterSpacing: "-0.5px",
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

      {/* Hero compacto */}
      <section style={{ padding: "40px 24px 32px", textAlign: "center" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(133,183,235,0.35)", marginBottom: "12px" }}>
          Steam · Ofertas en tiempo real
        </p>
        <h1 style={{ fontSize: "40px", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-1px", marginBottom: "10px" }}>
          <span style={{ color: "#fff" }}>Juegos baratos. </span>
          <span style={{ color: "#85B7EB" }}>Sin excusas.</span>
        </h1>
        <p style={{ fontSize: "14px", color: "rgba(133,183,235,0.45)", maxWidth: "320px", margin: "0 auto" }}>
          Las mejores ofertas de Steam. Todos bajo $20 USD.
        </p>
      </section>

      {/* Grid de deals */}
      <main style={{ padding: "0 24px 48px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* Cabecera sección */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(133,183,235,0.35)" }}>
            Destacadas
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(133,183,235,0.08)" }} />
          <span style={{ fontSize: "11px", color: "rgba(133,183,235,0.25)" }}>{deals.length} juegos</span>
        </div>

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
                  background: "#0d1520",
                  border: "1px solid #1a2a3a",
                  borderRadius: "14px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 0.2s",
                }}
              >
                {/* Imagen */}
                <div style={{ position: "relative", height: "140px", overflow: "hidden", flexShrink: 0 }}>
                  <Image
                    src={deal.thumb}
                    alt={deal.title}
                    width={460}
                    height={215}
                    style={{ width: "100%", height: "140px", objectFit: "cover", display: "block" }}
                    unoptimized
                  />

                  {/* Badge descuento — izquierda */}
                  {savings > 0 && (
                    <span style={{
                      position: "absolute", top: "10px", left: "10px",
                      background: "#4ade80", color: "#0a0a0a",
                      fontSize: "11px", fontWeight: 800,
                      padding: "3px 8px", borderRadius: "6px",
                      letterSpacing: "0.02em",
                    }}>
                      -{savings}%
                    </span>
                  )}

                  {/* Badge tienda — derecha */}
                  <span style={{
                    position: "absolute", top: "10px", right: "10px",
                    background: "#1a2a3a", color: "#85B7EB",
                    fontSize: "10px", fontWeight: 600,
                    padding: "3px 8px", borderRadius: "6px",
                    border: "1px solid #2a4060",
                  }}>
                    {storeName}
                  </span>
                </div>

                {/* Contenido */}
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>

                  {/* Título */}
                  <h3
                    className="group-hover:text-[#85B7EB] transition-colors"
                    style={{
                      fontSize: "14px", fontWeight: 600, color: "#e2eaf4",
                      lineHeight: 1.4, margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {deal.title}
                  </h3>

                  {/* Rating */}
                  {hasRating && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{
                        width: "6px", height: "6px", borderRadius: "50%",
                        background: ratingColor(deal.steamRatingText), flexShrink: 0,
                      }} />
                      <span style={{ fontSize: "12px", color: ratingColor(deal.steamRatingText), fontWeight: 500 }}>
                        {deal.steamRatingText}
                        {ratingPct && <span style={{ opacity: 0.7 }}> · {ratingPct}%</span>}
                      </span>
                    </div>
                  )}

                  <div style={{ flex: 1 }} />

                  {/* Precios */}
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

                  {/* Botón */}
                  <a
                    href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-[#1a3550] hover:border-[#85B7EB]/40"
                    style={{
                      display: "block", textAlign: "center",
                      padding: "9px 0",
                      background: "#0f2235", border: "1px solid #2a4060",
                      borderRadius: "8px",
                      fontSize: "13px", fontWeight: 600, color: "#85B7EB",
                      textDecoration: "none",
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
      </main>

      <footer style={{ borderTop: "1px solid rgba(133,183,235,0.07)", padding: "20px 24px", textAlign: "center" }}>
        <p style={{ fontSize: "11px", color: "rgba(133,183,235,0.18)", margin: 0 }}>
          BajoPerfil.gg · Precios vía CheapShark API
        </p>
      </footer>
    </div>
  );
}
