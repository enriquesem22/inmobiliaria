/**
 * CONFIGURACION CENTRAL DEL SITIO
 * -------------------------------------------------------------
 * Todos los datos de marca y contacto se definen aqui una sola vez.
 * Cambia estos valores para actualizar la web entera.
 *
 * IMPORTANTE (marcadores de posicion pendientes de confirmar):
 *  - `name`  -> nombre comercial definitivo de la empresa.
 *  - `phone`, `whatsapp`, `email` -> datos de contacto reales.
 *  - `address` -> direccion/portal exacto si se quiere mostrar.
 * Sustituyelos por los datos definitivos antes de publicar.
 */

export const site = {
  /** Nombre comercial. PLACEHOLDER: sustituir por el definitivo. */
  name: "Casa Aljarafe",
  /** Descriptor corto que acompana al nombre. */
  tagline: "Servicios e inversion inmobiliaria",
  /** Dominio de produccion (para SEO, sitemap y metadatos). */
  url: "https://www.casaaljarafe.es",
  /** Descripcion por defecto para metadatos SEO. */
  description:
    "Valoramos, mejoramos y vendemos tu vivienda con una estrategia personalizada en Sevilla y el Aljarafe. Valoracion gratuita, asesoramiento a propietarios e inversion inmobiliaria.",

  // --- Contacto (PLACEHOLDERS) ---
  /** Telefono en formato internacional para enlaces tel:. */
  phone: "+34600000000",
  /** Telefono formateado para mostrar. */
  phoneDisplay: "600 00 00 00",
  /** Numero de WhatsApp en formato internacional sin signos ni espacios. */
  whatsapp: "34600000000",
  email: "hola@casaaljarafe.es",

  // --- Ubicacion (base real proporcionada) ---
  base: "Castilleja de Guzman, Sevilla",
  address: "Castilleja de Guzman, Sevilla",
  region: "Aljarafe, Sevilla",

  // --- Redes (opcionales, anadir cuando existan) ---
  social: {
    instagram: "",
    linkedin: "",
    facebook: "",
  },
} as const;

/** Mensaje por defecto al abrir WhatsApp. */
export const whatsappDefaultMessage =
  "Hola, me gustaria informacion sobre la valoracion de mi vivienda.";

/** Construye un enlace wa.me con mensaje pre-rellenado. */
export function whatsappLink(message: string = whatsappDefaultMessage): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Navegacion principal de la cabecera. */
export const mainNav: { label: string; href: string }[] = [
  { label: "Vender", href: "/vender" },
  { label: "Valoracion", href: "/valoracion" },
  { label: "Inversores", href: "/inversores" },
  { label: "Reformas", href: "/reformas" },
  { label: "Zonas", href: "/zonas" },
  { label: "Colaboradores", href: "/colaboradores" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
];
