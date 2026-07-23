import type { LucideIcon } from "lucide-react";
import {
  LineChart,
  Home,
  Handshake,
  Hammer,
  TrendingUp,
  Search,
  ClipboardCheck,
  Building2,
} from "lucide-react";

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  href: string;
  points: string[];
};

/** Servicios principales de la empresa. */
export const services: Service[] = [
  {
    slug: "venta",
    icon: Home,
    title: "Venta de viviendas",
    summary:
      "Captacion, valoracion, preparacion, publicacion, visitas, negociacion y cierre. Acompanamiento integral hasta la firma.",
    href: "/vender",
    points: [
      "Estrategia de precio y comercializacion",
      "Presentacion profesional del inmueble",
      "Filtro de compradores y gestion de visitas",
      "Negociacion y defensa del precio",
    ],
  },
  {
    slug: "valoracion",
    icon: LineChart,
    title: "Valoracion inmobiliaria",
    summary:
      "Informe de valoracion comercial basado en comparables, micromercado y las caracteristicas reales de tu vivienda.",
    href: "/valoracion",
    points: [
      "Valor de mercado, precio de salida y precio probable de cierre",
      "Comparables del mismo barrio",
      "Analisis de demanda y tiempo de comercializacion",
      "Recomendacion sobre reformar o no antes de vender",
    ],
  },
  {
    slug: "inversores",
    icon: TrendingUp,
    title: "Asesoramiento a inversores",
    summary:
      "Busqueda y analisis de viviendas con potencial. Estudios de rentabilidad, alquiler, flips y gestion integral.",
    href: "/inversores",
    points: [
      "Analisis de rentabilidad y estudio de alquiler",
      "Estimacion de reforma y valor tras reforma",
      "Precio maximo de compra",
      "Estrategia de venta o alquiler",
    ],
  },
  {
    slug: "reformas",
    icon: Hammer,
    title: "Gestion de reformas",
    summary:
      "Coordinamos reformas para mejorar el valor de venta, preparar el alquiler o ejecutar flips y reposicionar activos.",
    href: "/reformas",
    points: [
      "Reforma ligera, home staging y redistribucion",
      "Mejora de cocinas y banos",
      "Gestion de presupuestos y coordinacion de obra",
      "Reforma integral",
    ],
  },
];

export type Differentiator = {
  icon: LucideIcon;
  title: string;
  text: string;
};

/** Ventajas competitivas frente a una agencia tradicional. */
export const differentiators: Differentiator[] = [
  {
    icon: Building2,
    title: "Liderado por un arquitecto y analista inmobiliario",
    text: "Cada vivienda se estudia tecnicamente, no solo se publica un anuncio.",
  },
  {
    icon: Search,
    title: "Analisis del micromercado del barrio",
    text: "Estudiamos el barrio concreto y comparamos con viviendas similares para fijar el precio.",
  },
  {
    icon: TrendingUp,
    title: "Vision financiera y de inversion",
    text: "Trabajamos con inversores y analizamos rentabilidad, no solo el precio de venta.",
  },
  {
    icon: Hammer,
    title: "Podemos coordinar la reforma",
    text: "Si mejora el resultado, coordinamos la reforma para maximizar el valor del inmueble.",
  },
  {
    icon: Handshake,
    title: "Relaciones a largo plazo",
    text: "Buscamos acompanarte mas alla de una operacion puntual, con transparencia.",
  },
  {
    icon: ClipboardCheck,
    title: "Especializados en el Aljarafe",
    text: "Conocimiento local real de los municipios donde trabajamos.",
  },
];
