import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import EventoDetail from "./EventoDetail";

type Props = {
  params: Promise<{ id: string }>;
};

async function getEvento(id: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const parsedId = isNaN(Number(id)) ? id : Number(id);
  const { data } = await supabase
    .from("Eventos")
    .select("id, nombre, descripcion, imagen_url, categoria, fecha, lugar")
    .eq("id", parsedId)
    .single();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await getEvento(id);

  if (!event) {
    return {
      title: "Evento no encontrado",
      description: "Este evento no existe o fue eliminado.",
    };
  }

  const description =
    event.descripcion ??
    `Evento de ${event.categoria} en New York City · ${event.fecha}${event.lugar ? ` · ${event.lugar}` : ""}. Encuentra toda la información en BajoPerfil.`;

  return {
    title: event.nombre,
    description,
    openGraph: {
      title: event.nombre,
      description,
      type: "website",
      locale: "es_US",
      siteName: "BajoPerfil",
      images: event.imagen_url
        ? [{ url: event.imagen_url, width: 800, height: 600, alt: event.nombre }]
        : [{ url: "/og-image.png", width: 1200, height: 630, alt: "BajoPerfil" }],
    },
    twitter: {
      card: "summary_large_image",
      title: event.nombre,
      description,
      images: event.imagen_url ? [event.imagen_url] : ["/og-image.png"],
    },
  };
}

export default function Page({ params }: Props) {
  return <EventoDetail params={params} />;
}
