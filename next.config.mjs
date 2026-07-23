/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Preparado para servir imagenes de inmuebles desde un CDN o almacenamiento externo.
    // Anade aqui los dominios cuando se conecte el catalogo de propiedades.
    remotePatterns: [],
  },
};

export default nextConfig;
