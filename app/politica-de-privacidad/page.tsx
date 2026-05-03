import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de BajoPerfil.gg. Información sobre recopilación de datos, cookies, Google Analytics y publicidad.",
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: "40px" }}>
    <h2 style={{
      fontSize: "18px", fontWeight: 700, color: "#111827",
      margin: "0 0 12px", paddingBottom: "8px",
      borderBottom: "2px solid #f3f4f6",
    }}>
      {title}
    </h2>
    <div style={{ fontSize: "15px", color: "#374151", lineHeight: 1.8 }}>
      {children}
    </div>
  </section>
);

export default function PoliticaPrivacidad() {
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
            color: "#ffffff", margin: "0 0 10px", letterSpacing: "-0.5px",
          }}>
            Política de Privacidad
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Última actualización: Mayo 2026
          </p>
        </div>
      </div>

      {/* ── Contenido ── */}
      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "48px 24px 80px" }}>

        <p style={{ fontSize: "15px", color: "#374151", lineHeight: 1.8, marginBottom: "40px" }}>
          En <strong>BajoPerfil.gg</strong> nos tomamos tu privacidad en serio. Esta política explica qué información recopilamos cuando visitas nuestro sitio, cómo la usamos y cuáles son tus derechos.
        </p>

        <Section title="1. Información que recopilamos">
          <p style={{ margin: "0 0 12px" }}>Recopilamos información de forma automática cuando visitas el sitio:</p>
          <ul style={{ margin: "0 0 12px", paddingLeft: "20px" }}>
            <li style={{ marginBottom: "8px" }}><strong>Datos de uso:</strong> páginas visitadas, tiempo de visita, eventos en los que haces clic, ciudad y país aproximados (sin precisión exacta).</li>
            <li style={{ marginBottom: "8px" }}><strong>Datos técnicos:</strong> tipo de navegador, sistema operativo, resolución de pantalla y dirección IP anonimizada.</li>
            <li style={{ marginBottom: "8px" }}><strong>Cookies:</strong> pequeños archivos de texto guardados en tu navegador para recordar preferencias y medir el tráfico.</li>
          </ul>
          <p style={{ margin: 0 }}>No recopilamos nombres, correos electrónicos ni ningún dato personal directamente, a menos que tú nos lo envíes voluntariamente.</p>
        </Section>

        <Section title="2. Cómo usamos la información">
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            <li style={{ marginBottom: "8px" }}>Entender cómo los usuarios interactúan con el sitio para mejorar el contenido.</li>
            <li style={{ marginBottom: "8px" }}>Medir el rendimiento de las páginas y detectar errores técnicos.</li>
            <li style={{ marginBottom: "8px" }}>Mostrar publicidad relevante a través de Google AdSense.</li>
            <li style={{ marginBottom: "8px" }}>Recordar preferencias de navegación durante tu visita.</li>
          </ul>
        </Section>

        <Section title="3. Cookies y tecnologías de seguimiento">
          <p style={{ margin: "0 0 12px" }}>Utilizamos los siguientes tipos de cookies:</p>
          <ul style={{ margin: "0 0 12px", paddingLeft: "20px" }}>
            <li style={{ marginBottom: "8px" }}><strong>Cookies esenciales:</strong> necesarias para el funcionamiento básico del sitio.</li>
            <li style={{ marginBottom: "8px" }}><strong>Cookies analíticas (Google Analytics):</strong> usadas para recopilar estadísticas de visitas de forma anónima. Google puede usar esta información según su propia política de privacidad.</li>
            <li style={{ marginBottom: "8px" }}><strong>Cookies publicitarias (Google AdSense):</strong> usadas para mostrar anuncios personalizados basados en tus intereses y visitas anteriores.</li>
          </ul>
          <p style={{ margin: 0 }}>Puedes desactivar las cookies desde la configuración de tu navegador. Ten en cuenta que algunas funciones del sitio pueden verse afectadas.</p>
        </Section>

        <Section title="4. Google AdSense y publicidad de terceros">
          <p style={{ margin: "0 0 12px" }}>
            BajoPerfil.gg utiliza <strong>Google AdSense</strong> para mostrar publicidad. Google y sus socios pueden usar cookies para mostrar anuncios basados en tus visitas anteriores a este y otros sitios web.
          </p>
          <p style={{ margin: "0 0 12px" }}>
            Los anunciantes de terceros tienen sus propias políticas de privacidad independientes. No tenemos acceso ni control sobre las cookies que usan.
          </p>
          <p style={{ margin: 0 }}>
            Puedes optar por no recibir publicidad personalizada de Google visitando{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: "#1a0533", fontWeight: 600 }}>
              google.com/settings/ads
            </a>.
          </p>
        </Section>

        <Section title="5. Derechos del usuario">
          <p style={{ margin: "0 0 12px" }}>Dependiendo de tu ubicación, puedes tener los siguientes derechos sobre tus datos:</p>
          <ul style={{ margin: "0 0 12px", paddingLeft: "20px" }}>
            <li style={{ marginBottom: "8px" }}><strong>Acceso:</strong> solicitar qué información tenemos sobre ti.</li>
            <li style={{ marginBottom: "8px" }}><strong>Eliminación:</strong> pedir que eliminemos cualquier dato personal asociado a ti.</li>
            <li style={{ marginBottom: "8px" }}><strong>Oposición:</strong> oponerte al uso de tus datos para publicidad personalizada.</li>
            <li style={{ marginBottom: "8px" }}><strong>Portabilidad:</strong> recibir tus datos en un formato legible.</li>
          </ul>
          <p style={{ margin: 0 }}>Para ejercer cualquiera de estos derechos, contáctanos por correo electrónico.</p>
        </Section>

        <Section title="6. Contacto">
          <p style={{ margin: "0 0 8px" }}>Si tienes preguntas sobre esta política de privacidad, puedes escribirnos a:</p>
          <a href="mailto:bajoperfil.net@gmail.com" style={{
            display: "inline-block",
            color: "#1a0533", fontWeight: 700, fontSize: "15px",
            textDecoration: "none", borderBottom: "2px solid #1a053333",
          }}>
            bajoperfil.net@gmail.com
          </a>
        </Section>

        <div style={{
          background: "#f9fafb", border: "1px solid #e5e7eb",
          borderRadius: "10px", padding: "20px 24px",
          fontSize: "13px", color: "#6b7280", lineHeight: 1.7,
        }}>
          Esta política puede actualizarse ocasionalmente. Te recomendamos revisarla periódicamente. El uso continuado del sitio tras cualquier cambio implica la aceptación de la nueva política.
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
            BajoPerfil.gg · Eventos gaming en New York City
          </p>
        </div>
      </footer>
    </div>
  );
}
