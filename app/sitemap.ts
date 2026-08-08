import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.bajoperfil.net";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: baseUrl + "/acerca-de",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const { data } = await supabase
    .from("Locaciones")
    .select("nombre, fecha_agregado")
    .eq("activo", true);

  const locationPages: MetadataRoute.Sitemap = (data || []).map((loc) => ({
    url: baseUrl + "/locations/" + slugify(loc.nombre),
    lastModified: loc.fecha_agregado ? new Date(loc.fecha_agregado) : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...locationPages];
}