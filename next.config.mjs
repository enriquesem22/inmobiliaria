/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Preparado para servir imagenes de inmuebles desde un CDN o almacenamiento externo.
    // Anade aqui los dominios cuando se conecte el catalogo de propiedades.
    remotePatterns: [],
  },
  experimental: {
    // El CRM usa better-sqlite3 (modulo nativo): no debe empaquetarse.
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
};

export default nextConfig;
