'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { supabase } from '@/lib/supabase';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const centerNYC = {
  lat: 40.7128,
  lng: -74.006,
};

const CATEGORY_LABELS = {
  arcade: 'Arcade',
  tienda_retro: 'Tienda Retro',
  tcg_mesa: 'Cartas y Mesa',
  lan_center: 'LAN Center',
  bar_torneos: 'Bar con Torneos',
  comic_gaming: 'Comics Gaming',
};

const CATEGORY_COLORS = {
  arcade: '#ff2e88',
  tienda_retro: '#2ee6d6',
  tcg_mesa: '#f5a623',
  lan_center: '#7d3c98',
  bar_torneos: '#2d7a4f',
  comic_gaming: '#e91e8c',
};

export default function LocationsMap({ categoryFilter, searchQuery }) {
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  useEffect(() => {
    async function fetchLocations() {
      const { data, error } = await supabase
        .from('Locaciones')
        .select('*')
        .eq('activo', true);

      if (error) {
        console.error('Error loading locations:', error);
        return;
      }

      const valid = data.filter(
        (loc) => typeof loc.lat === 'number' && typeof loc.lng === 'number'
      );
      setLocations(valid);
    }
    fetchLocations();
  }, []);

  const filtered = locations.filter((loc) => {
    if (categoryFilter && loc.categoria !== categoryFilter) return false;
    if (searchQuery && searchQuery.trim().length >= 2 && !loc.nombre.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  if (!isLoaded) return <p style={{ padding: '24px', color: '#9a8fc2' }}>Cargando mapa...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={centerNYC} zoom={11}>
      {filtered.map((loc) => (
        <Marker
          key={loc.id}
          position={{ lat: loc.lat, lng: loc.lng }}
          onClick={() => setSelected(loc)}
        />
      ))}

      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div style={{ width: '220px', background: '#0f0b1a', borderRadius: '10px', overflow: 'hidden' }}>
            {selected.imagen_url && (
              <img
                src={selected.imagen_url}
                alt={selected.nombre}
                style={{ width: '100%', height: '110px', objectFit: 'cover', display: 'block' }}
              />
            )}
            <div style={{ padding: '12px' }}>
              <span style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#0f0b1a', background: CATEGORY_COLORS[selected.categoria] || '#ff2e88', borderRadius: '4px', padding: '3px 7px', marginBottom: '8px' }}>
                {CATEGORY_LABELS[selected.categoria] || selected.categoria}
              </span>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#f5f3ff', margin: '0 0 4px', lineHeight: 1.3 }}>
                {selected.nombre}
              </h3>
              <p style={{ fontSize: '12px', color: '#9a8fc2', margin: '0 0 10px', lineHeight: 1.4 }}>
                {selected.direccion}
              </p>
              <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(selected.nombre + " " + selected.direccion)} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#0f0b1a', background: '#2ee6d6', borderRadius: '6px', padding: '8px 0', textDecoration: 'none' }}>
                Ver reviews en Google Maps
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}