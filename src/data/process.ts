export type ProcessStep = {
  number: string;
  title: string;
  text: string;
};

/** Proceso de venta paso a paso. */
export const sellingProcess: ProcessStep[] = [
  {
    number: "01",
    title: "Primera consulta",
    text: "Nos envias los datos de la vivienda a traves del formulario o por WhatsApp. Sin compromiso.",
  },
  {
    number: "02",
    title: "Visita y valoracion",
    text: "Inspeccionamos el inmueble y analizamos el mercado del barrio: comparables, demanda y estado.",
  },
  {
    number: "03",
    title: "Estrategia",
    text: "Definimos precio de salida, precio probable de cierre, reformas recomendadas, publico objetivo y plan de comercializacion.",
  },
  {
    number: "04",
    title: "Preparacion",
    text: "Fotografia profesional, planos, documentacion, anuncio y presentacion cuidada del inmueble.",
  },
  {
    number: "05",
    title: "Comercializacion",
    text: "Publicacion, base de compradores e inversores, gestion de visitas y seguimiento continuo.",
  },
  {
    number: "06",
    title: "Negociacion",
    text: "Gestion de ofertas y defensa del precio con criterio, sin prisas y con datos.",
  },
  {
    number: "07",
    title: "Cierre",
    text: "Coordinacion documental, arras, notaria y firma. Te acompanamos hasta el final.",
  },
];
