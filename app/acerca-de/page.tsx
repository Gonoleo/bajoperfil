export default function AcercaDePage() {
  return (
    <div className="min-h-screen bg-[#0f0b1a] text-[#f5f3ff]">
      <nav className="flex items-center gap-2.5 border-b border-white/[0.08] px-6 py-5">
        <span className="rounded-md bg-[#ff2e88] px-[9px] py-1 font-mono text-[13px] font-bold tracking-tight text-[#0f0b1a]">
          BP
        </span>
        <span className="text-sm font-semibold text-[#f5f3ff]">BajoPerfil</span>
      </nav>

      <section className="mx-auto max-w-[640px] px-6 py-14">
        <h1 className="mb-5 text-[clamp(26px,5vw,38px)] font-extrabold">
          Acerca de BajoPerfil
        </h1>
        <p className="mb-4 text-[15px] leading-relaxed text-[#9a8fc2]">
          BajoPerfil es un directorio de locaciones gaming en New York City, pensado
          para la comunidad hispanohablante. Reunimos arcades, tiendas retro, tiendas
          de cartas y juegos de mesa, LAN centers, bares con torneos y mas lugares
          donde vivir la cultura gaming en la ciudad.
        </p>
        <p className="text-[15px] leading-relaxed text-[#9a8fc2]">
          Cada locacion es verificada antes de publicarse, para asegurar informacion
          precisa y actualizada.
        </p>
      </section>

      <footer className="border-t border-white/[0.08] px-6 py-7 text-center">
        <p className="text-xs text-[#6b5f8f]">
          BajoPerfil - Locaciones gaming en New York City
        </p>
      </footer>
    </div>
  );
}
