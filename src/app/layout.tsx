import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Valoracion, venta e inversion inmobiliaria en el Aljarafe`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "inmobiliaria Aljarafe",
    "vender vivienda Sevilla",
    "valoracion inmobiliaria",
    "inversion inmobiliaria Sevilla",
    "inmobiliaria Castilleja de Guzman",
    "inmobiliaria Tomares",
    "inmobiliaria Mairena del Aljarafe",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Servicios e inversion inmobiliaria en el Aljarafe`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Servicios e inversion inmobiliaria en el Aljarafe`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#1E3327",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
