import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BajoPerfil - Eventos Gaming en Español",
    template: "%s | BajoPerfil",
  },
  description:
    "Encuentra los mejores eventos gaming en New York City. Torneos Pokemon, Comic Con, Esports y más. Eventos gaming en español.",
  keywords: [
    "eventos gaming NYC",
    "torneos pokemon nueva york",
    "comic con nueva york",
    "esports new york",
    "gaming events new york city",
    "eventos geek nueva york",
  ],
  openGraph: {
    type: "website",
    locale: "es_US",
    siteName: "BajoPerfil",
    title: "BajoPerfil - Eventos Gaming en Español",
    description:
      "Encuentra los mejores eventos gaming en New York City. Torneos Pokemon, Comic Con, Esports y más.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BajoPerfil - Eventos Gaming NYC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BajoPerfil - Eventos Gaming en Español",
    description:
      "Encuentra los mejores eventos gaming en New York City. Torneos Pokemon, Comic Con, Esports y más.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-83RTKXGVZH"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-83RTKXGVZH');
        `}
      </Script>
      {/* Google AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4101617521164083"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </html>
  );
}
