import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Aquí se añaden los dominios desde los cuales se cargarán las imágenes.
    // 'placehold.co' es el dominio del marcador de posición que estábamos usando.
    // Si usas imágenes de otros sitios, debes añadirlos aquí también.
    domains: ["placehold.co"],
  },
};

export default nextConfig;