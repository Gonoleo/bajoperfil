"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
import { supabase } from "@/lib/supabase";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const centerNYC = {
  lat: 40.7128,
  lng: -74.006,
};

const libraries: "marker"[] = ["marker"];

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
  lat: number;
  lng: number;
  descripcion: string | null;
  imagen_url: string | null;
};

type Props = {
  categoryFilter: string | null;
  searchQuery: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function MapSkeleton() {
  return (
    <div className="h-[500px] w-full animate-pulse bg-gradient-to-br from-[#1a1330] to-[#0f0b1a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-[#ff2e88]/30 border-t-[#ff2e88] animate-spin" />
        <p className="text-xs text-[#6b5f8f] tracking-wide">Cargando mapa...</p>
      </div>
    </div>
  );
}

export default function LocationsMap({ categoryFilter, searchQuery }: Props) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selected, setSelected] = useState<Location | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  useEffect(() => {
    async function fetchLocations() {
      const { data, error } = await supabase
        .from("Locaciones")
        .select("*")
        .eq("activo", true);

      if (error) {
        console.error("Error loading locations:", error);
        return;
      }

      const valid = (data as Location[]).filter(
        (loc) => typeof loc.lat === "number" && typeof loc.lng === "number"
      );
      setLocations(valid);
    }
    fetchLocations();
  }, []);

  const filtered = locations.filter((loc) => {
    if (categoryFilter && loc.categoria !== categoryFilter) return false;
    if (searchQuery.trim().length >= 2 && !loc.nombre.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  useEffect(() => {
    if (!map || !isLoaded) return;

    markersRef.current.forEach((m) => (m.map = null));
    markersRef.current = [];

    filtered.forEach((loc, index) => {
      const pin = document.createElement("div");
      pin.style.width = "18px";
      pin.style.height = "18px";
      pin.style.borderRadius = "50%";
      pin.style.background = CATEGORY_COLORS[loc.categoria] || "#ff2e88";
      pin.style.border = "2px solid #0f0b1a";
      pin.style.boxShadow = "0 0 8px rgba(255,46,136,0.6)";
      pin.style.cursor = "pointer";
      pin.style.opacity = "0";
      pin.style.transform = "scale(0.5)";
      pin.style.transition = "opacity 0.35s ease, transform 0.35s ease";

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: loc.lat, lng: loc.lng },
        content: pin,
      });

      marker.addListener("click", () => setSelected(loc));
      markersRef.current.push(marker);

      setTimeout(() => {
        pin.style.opacity = "1";
        pin.style.transform = "scale(1)";
      }, index * 25);
    });

    return () => {
      markersRef.current.forEach((m) => (m.map = null));
      markersRef.current = [];
    };
  }, [map, filtered, isLoaded]);

  if (!isLoaded) return <MapSkeleton />;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={centerNYC}
      zoom={11}
      onLoad={(m) => setMap(m)}
      options={{
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || "",
        colorScheme: google.maps.ColorScheme.DARK,
      }}
    >
      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div className="w-[220px] overflow-hidden rounded-xl bg-[#0f0b1a]">
            {selected.imagen_url && (
              <img
                src={selected.imagen_url}
                alt={selected.nombre}
                className="h-[110px] w-full object-cover block"
              />
            )}
            <div className="p-3">
              <span
                className="mb-2 inline-block rounded px-[7px] py-[3px] text-[10px] font-bold uppercase tracking-wide text-[#0f0b1a]"
                style={{ background: CATEGORY_COLORS[selected.categoria] || "#ff2e88" }}
              >
                {CATEGORY_LABELS[selected.categoria] || selected.categoria}
              </span>
              <h3 className="mb-1 text-sm font-bold leading-tight text-[#f5f3ff]">
                {selected.nombre}
              </h3>
              <p className="mb-2.5 text-xs leading-snug text-[#9a8fc2]">
                {selected.direccion}
              </p>
              <a href={"/locations/" + slugify(selected.nombre)} className="mb-2 block rounded-md bg-[#ff2e88] py-2 text-center text-xs font-semibold text-[#f5f3ff] no-underline transition-opacity duration-150 hover:opacity-85">
                Ver mas en BajoPerfil
              </a>
              <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(selected.nombre + " " + selected.direccion)} target="_blank" rel="noopener noreferrer" className="block rounded-md bg-[#2ee6d6] py-2 text-center text-xs font-semibold text-[#0f0b1a] no-underline transition-opacity duration-150 hover:opacity-85">
                Ver reviews en Google Maps
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
