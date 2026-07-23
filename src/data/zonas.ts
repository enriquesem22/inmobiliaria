export type Zona = {
  slug: string;
  /** Nombre del municipio. */
  name: string;
  /** Frase corta que resume el caracter del municipio. */
  claim: string;
  /** Introduccion de la pagina (1-2 parrafos). */
  intro: string[];
  /** Caracteristicas del mercado / municipio. */
  highlights: string[];
  /** Tipos de vivienda predominantes. */
  housing: string;
  /** Conexiones y accesos. */
  connectivity: string;
  /** Perfil habitual de comprador/vendedor. */
  profile: string;
  /** Descripcion para metadatos SEO. */
  metaDescription: string;
  /** Marca la sede de la empresa. */
  base?: boolean;
};

/**
 * Municipios del Aljarafe donde trabaja la empresa.
 * El contenido describe caracteristicas generales y conocidas de cada
 * municipio. No incluye cifras de precios: se anadiran cuando se disponga
 * de datos propios verificados del micromercado.
 */
export const zonas: Zona[] = [
  {
    slug: "castilleja-de-guzman",
    name: "Castilleja de Guzman",
    base: true,
    claim: "Nuestra base, en el corazon del Aljarafe.",
    intro: [
      "Castilleja de Guzman es un municipio pequeno y tranquilo del Aljarafe, de caracter marcadamente residencial y rodeado de zonas verdes. Es aqui donde tenemos nuestra base, lo que nos permite conocer de primera mano su mercado y su dia a dia.",
      "Su cercania a Valencina de la Concepcion, Castilleja de la Cuesta y Santiponce, junto a un entorno cuidado y bien comunicado con Sevilla, lo hacen atractivo para familias que buscan calidad de vida sin alejarse de la capital.",
    ],
    highlights: [
      "Municipio residencial, tranquilo y con baja densidad",
      "Predominio de vivienda unifamiliar y adosada",
      "Entorno natural y cercania al yacimiento de Valencina",
      "Excelente conexion con Sevilla y el resto del Aljarafe",
    ],
    housing:
      "Predomina la vivienda unifamiliar aislada y adosada, con presencia tambien de urbanizaciones de calidad. Es una zona valorada por quienes buscan espacio, luz y tranquilidad.",
    connectivity:
      "Acceso rapido a Sevilla a traves de la A-49 y conexion con la SE-30. Proximidad a los principales servicios del Aljarafe norte.",
    profile:
      "Familias que buscan vivienda amplia en un entorno tranquilo, y propietarios de unifamiliares que quieren vender con una estrategia de precio bien ajustada.",
    metaDescription:
      "Inmobiliaria en Castilleja de Guzman. Valoracion, venta e inversion en vivienda con conocimiento local real. Solicita tu valoracion gratuita.",
  },
  {
    slug: "castilleja-de-la-cuesta",
    name: "Castilleja de la Cuesta",
    claim: "Historia, servicios y proximidad a Sevilla.",
    intro: [
      "Castilleja de la Cuesta es uno de los municipios con mas caracter y tradicion del Aljarafe, muy poblado y con una fuerte identidad propia. Combina cascos historicos, comercio de proximidad y una excelente conexion con Sevilla.",
      "Su densidad y variedad de vivienda generan un mercado dinamico, con demanda constante tanto de compradores para vivienda habitual como de inversores.",
    ],
    highlights: [
      "Municipio consolidado, con fuerte identidad y comercio local",
      "Amplia variedad de vivienda: pisos, casas y adosados",
      "Muy proximo a Sevilla capital",
      "Mercado activo con demanda estable",
    ],
    housing:
      "Conviven bloques de pisos en distintas epocas de construccion con vivienda tradicional en el casco y promociones mas recientes. Esta variedad permite estrategias de venta muy distintas segun el inmueble.",
    connectivity:
      "Conexion directa con Sevilla y el eje del Aljarafe. Buena red de transporte publico y accesos por la A-49.",
    profile:
      "Propietarios de vivienda consolidada, herederos y compradores que priorizan cercania a Sevilla y servicios a pie de calle.",
    metaDescription:
      "Inmobiliaria en Castilleja de la Cuesta. Valoracion profesional, venta e inversion inmobiliaria con analisis del micromercado. Valoracion gratuita.",
  },
  {
    slug: "gines",
    name: "Gines",
    claim: "Vida de barrio y servicios de calidad.",
    intro: [
      "Gines es un municipio residencial muy valorado por las familias, con buenos servicios, zonas verdes y una vida de barrio activa alrededor de su plaza. Es un lugar comodo para vivir y con demanda sostenida.",
      "Su tamano contenido y su buena dotacion de colegios, comercio y ocio lo convierten en una zona atractiva para vivienda habitual.",
    ],
    highlights: [
      "Municipio familiar con buenos servicios",
      "Vida de barrio y ambiente tranquilo",
      "Mezcla de adosados, unifamiliares y pisos",
      "Demanda estable de vivienda habitual",
    ],
    housing:
      "Predominan adosados y unifamiliares junto a bloques de pisos en zonas mas centricas. La calidad de vida y los servicios son un argumento de venta importante.",
    connectivity:
      "Bien conectado con Sevilla y con los municipios vecinos del Aljarafe a traves de la A-49 y la red de carreteras comarcales.",
    profile:
      "Familias que buscan estabilidad y servicios, y propietarios que quieren aprovechar la buena imagen de la zona para vender bien.",
    metaDescription:
      "Inmobiliaria en Gines. Valoracion, venta e inversion inmobiliaria con conocimiento local del Aljarafe. Solicita una valoracion gratuita.",
  },
  {
    slug: "bormujos",
    name: "Bormujos",
    claim: "Uno de los municipios mas dinamicos del Aljarafe.",
    intro: [
      "Bormujos es una de las zonas de mayor crecimiento del Aljarafe, con importantes areas comerciales, sanitarias y de servicios. Ha experimentado un notable desarrollo residencial en los ultimos anos.",
      "Su combinacion de vivienda nueva y consolidada, junto a una fuerte dotacion de equipamientos, lo convierte en un mercado especialmente activo.",
    ],
    highlights: [
      "Municipio en crecimiento, con gran actividad comercial",
      "Importante oferta de servicios y equipamientos",
      "Vivienda nueva y consolidada",
      "Mercado dinamico y con demanda alta",
    ],
    housing:
      "Amplia oferta de pisos, adosados y unifamiliares, con promociones recientes. El dinamismo del mercado permite estrategias de venta agiles.",
    connectivity:
      "Excelente conexion por la A-49 y proximidad a los grandes centros comerciales y sanitarios del Aljarafe.",
    profile:
      "Compradores de vivienda habitual, familias jovenes e inversores atraidos por la actividad de la zona.",
    metaDescription:
      "Inmobiliaria en Bormujos. Valoracion, venta e inversion en una de las zonas mas dinamicas del Aljarafe. Valoracion gratuita y sin compromiso.",
  },
  {
    slug: "mairena-del-aljarafe",
    name: "Mairena del Aljarafe",
    claim: "Conexion, servicios y mercado amplio.",
    intro: [
      "Mairena del Aljarafe es uno de los municipios mas poblados de la comarca, con una gran variedad de vivienda y una excelente conexion con Sevilla, incluido el Metro. Es un mercado amplio y con mucha actividad.",
      "La diversidad de barrios y tipologias hace especialmente util un analisis detallado del micromercado antes de fijar el precio.",
    ],
    highlights: [
      "Uno de los municipios mas grandes del Aljarafe",
      "Conexion con Sevilla mediante Metro (Linea 1)",
      "Gran variedad de barrios y tipologias de vivienda",
      "Mercado amplio y activo",
    ],
    housing:
      "Desde pisos en distintas zonas hasta adosados y unifamiliares. La heterogeneidad del municipio exige comparar cada vivienda con su entorno inmediato.",
    connectivity:
      "Conexion con Sevilla a traves del Metro (Linea 1) y de la A-49. Muy buena dotacion de transporte y servicios.",
    profile:
      "Un mercado muy variado: primeros compradores, familias, herederos e inversores que buscan alquiler o reforma.",
    metaDescription:
      "Inmobiliaria en Mairena del Aljarafe. Valoracion y venta con analisis del micromercado y conexion Metro con Sevilla. Valoracion gratuita.",
  },
  {
    slug: "san-juan-de-aznalfarache",
    name: "San Juan de Aznalfarache",
    claim: "A las puertas de Sevilla, junto al rio.",
    intro: [
      "San Juan de Aznalfarache se situa junto al rio y a las puertas de Sevilla, lo que le da una posicion estrategica y una demanda muy solida. Es una zona con recorrido y en evolucion.",
      "Su cercania a la capital, el Metro y las vistas de la cornisa lo hacen atractivo tanto para vivienda habitual como para inversion en alquiler.",
    ],
    highlights: [
      "Ubicacion privilegiada junto a Sevilla y el rio",
      "Conexion con Sevilla mediante Metro (Linea 1)",
      "Demanda solida de compra y alquiler",
      "Zona con potencial de reposicionamiento",
    ],
    housing:
      "Predominan los pisos, con oferta muy variada en estado y antiguedad. Es una zona donde una reforma bien planteada puede marcar una diferencia clara en el precio.",
    connectivity:
      "Conexion directa con Sevilla por Metro (Linea 1) y por carretera. Proximidad al rio y a los accesos principales.",
    profile:
      "Inversores interesados en alquiler y reforma, primeros compradores y propietarios que buscan aprovechar la cercania a Sevilla.",
    metaDescription:
      "Inmobiliaria en San Juan de Aznalfarache. Valoracion, venta e inversion junto a Sevilla, con conexion Metro. Solicita tu valoracion gratuita.",
  },
  {
    slug: "tomares",
    name: "Tomares",
    claim: "Calidad residencial y servicios de primer nivel.",
    intro: [
      "Tomares es uno de los municipios residenciales mas valorados del Aljarafe, con una excelente dotacion de servicios, comercio de calidad y zonas verdes. Su demanda es de las mas solidas de la comarca.",
      "La buena imagen de la zona y la calidad de su vivienda hacen que una presentacion y una estrategia de precio cuidadas tengan un impacto muy relevante.",
    ],
    highlights: [
      "Municipio residencial de alta calidad",
      "Excelentes servicios y comercio",
      "Vivienda unifamiliar, adosada y pisos de calidad",
      "Demanda muy solida",
    ],
    housing:
      "Amplia presencia de unifamiliares y adosados, junto a pisos en promociones cuidadas. La calidad del producto permite estrategias de venta orientadas al valor.",
    connectivity:
      "Muy bien conectado con Sevilla por la A-49 y la SE-30, con acceso rapido a los servicios del Aljarafe.",
    profile:
      "Familias que buscan calidad residencial y propietarios de vivienda de gama alta que quieren vender con estrategia.",
    metaDescription:
      "Inmobiliaria en Tomares. Valoracion y venta de vivienda de calidad en uno de los municipios mas valorados del Aljarafe. Valoracion gratuita.",
  },
  {
    slug: "gelves",
    name: "Gelves",
    claim: "Junto al rio, tranquilo y en crecimiento.",
    intro: [
      "Gelves se situa junto al Guadalquivir, con su puerto deportivo como sena de identidad. Es un municipio tranquilo, en crecimiento y cada vez mas demandado por quienes buscan un entorno agradable cerca de Sevilla.",
      "Su caracter residencial y su entorno fluvial lo hacen atractivo para vivienda habitual y para quienes valoran la calidad de vida.",
    ],
    highlights: [
      "Municipio junto al rio, con puerto deportivo",
      "Ambiente tranquilo y residencial",
      "Zona en crecimiento",
      "Cercania a Sevilla y al resto del Aljarafe",
    ],
    housing:
      "Predominan unifamiliares y adosados, con promociones mas recientes. El entorno y la tranquilidad son argumentos de venta destacados.",
    connectivity:
      "Buena conexion con Sevilla y con San Juan de Aznalfarache, con acceso al rio y a los servicios del Aljarafe.",
    profile:
      "Familias que buscan tranquilidad y entorno natural, y propietarios que quieren poner en valor la ubicacion junto al rio.",
    metaDescription:
      "Inmobiliaria en Gelves. Valoracion, venta e inversion junto al rio, en un municipio tranquilo y en crecimiento. Valoracion gratuita.",
  },
];

export function getZona(slug: string): Zona | undefined {
  return zonas.find((z) => z.slug === slug);
}

/** Ampliacion futura anunciada en la web (sin ofertar servicios aun no operativos). */
export const zonasFuturas = ["Sevilla capital", "Macarena"];
