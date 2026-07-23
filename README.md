# Web de servicios e inversion inmobiliaria — Sevilla y el Aljarafe

Sitio web para una empresa familiar de servicios e inversion inmobiliaria
con base en Castilleja de Guzman (Aljarafe, Sevilla). Esta pensada para
captar propietarios que quieran vender, generar solicitudes de valoracion,
atraer inversores y construir una red de colaboradores.

Mensaje principal: **"No solo vendemos viviendas. Analizamos como maximizar
su valor."**

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) para el diseno
- [react-hook-form](https://react-hook-form.com/) + [zod](https://zod.dev/) para formularios
- Blog en Markdown (`gray-matter` + `react-markdown`)
- SEO: metadatos, `sitemap.xml`, `robots.txt` y datos estructurados (JSON-LD)

## Puesta en marcha

```bash
npm install
npm run dev      # entorno de desarrollo en http://localhost:3000
npm run build    # compilacion de produccion
npm run start    # sirve la build de produccion
npm run lint     # linter
```

## Personalizacion rapida (IMPORTANTE)

Antes de publicar, revisa y completa estos puntos:

### 1. Datos de marca y contacto

Todo esta centralizado en **`src/data/site.ts`**. Cambia:

- `name` — nombre comercial definitivo (actualmente es un **marcador de
  posicion**: "Casa Aljarafe").
- `phone`, `phoneDisplay`, `whatsapp`, `email` — datos de contacto reales
  (ahora son marcadores de posicion).
- `url` — dominio de produccion (afecta a SEO, sitemap y metadatos).

El nombre y la region aparecen automaticamente en el logotipo, la cabecera,
el pie y los metadatos. El logotipo es un SVG generado por texto
(`src/components/ui/Logo.tsx`); sustituyelo por un logotipo propio cuando lo
tengais.

### 2. Textos legales

Las paginas `/aviso-legal`, `/privacidad` y `/cookies` son **plantillas
orientativas** con campos entre corchetes (`[Razon social]`, `[NIF/CIF]`,
etc.). Complétalas con los datos reales, revisalas con un profesional y
elimina el aviso `LegalNotice` de cada pagina.

### 3. Formularios y CRM

Todos los formularios envian los datos a la ruta **`/api/leads`**
(`src/app/api/leads/route.ts`). Por defecto, los leads se registran en el
log del servidor. Para conectarlos a tu CRM, hoja de calculo o email, define
la variable de entorno:

```
LEADS_WEBHOOK_URL=https://hooks.tu-crm.com/xxxx
```

(ver `.env.example`). El lead se reenvia como JSON con la forma
`{ type, data, meta }`.

### 4. Contenido de zonas y blog

- **Zonas**: `src/data/zonas.ts`. Cada municipio del Aljarafe tiene su
  contenido. Las descripciones son generales y **no incluyen precios**; anade
  datos de mercado propios cuando dispongas de ellos.
- **Blog**: articulos en Markdown en `src/content/blog/`. Para publicar uno
  nuevo, crea un `.md` con la cabecera (`title`, `description`, `date`,
  `category`).

## Estructura del proyecto

```
src/
  app/                 # Rutas (App Router)
    api/leads/         # Recepcion de formularios (preparada para CRM)
    zonas/[slug]/      # Paginas de SEO local por municipio
    blog/[slug]/       # Articulos del blog
    ...
  components/
    layout/            # Header, Footer, WhatsApp, cookies
    sections/          # Secciones reutilizables (hero, servicios, proceso...)
    forms/             # Formularios de captacion
    ui/                # Componentes de interfaz (Button, Section, etc.)
    seo/               # Datos estructurados JSON-LD
  content/blog/        # Articulos en Markdown
  data/                # Datos centralizados (site, servicios, zonas, proceso)
  lib/                 # Utilidades y lectura del blog
```

## Paginas incluidas

- **Inicio** — propuesta de valor, servicios, proceso, zonas y CTAs.
- **Vender** — como vendemos, proceso y formulario de captacion.
- **Valoracion** — metodo, FAQ y solicitud de valoracion gratuita.
- **Inversores** — servicios de inversion y formulario de perfil.
- **Colaboradores** — como colaborar y formulario de oportunidades.
- **Reformas** — enfoque y servicios de reforma.
- **Nosotros** — empresa familiar, equipo y vision a largo plazo.
- **Zonas** — indice + una pagina por municipio (SEO local).
- **Blog** — guias practicas.
- **Contacto** y paginas legales.

## Notas de contenido

Los textos son honestos y evitan promesas comerciales agresivas. **No se han
inventado** testimonios, cifras de ventas, premios ni experiencia. El espacio
de testimonios queda preparado para incorporar opiniones reales cuando
existan.

## Preparado para crecer

La arquitectura esta lista para incorporar, mas adelante:

- Catalogo de inmuebles y fichas de propiedad.
- Casos de exito / operaciones cerradas.
- Valoraciones automaticas o semiautomaticas.
- Integracion completa con un CRM.

## Despliegue

El proyecto es una app estandar de Next.js y puede desplegarse en cualquier
plataforma compatible (Vercel, Node, contenedor). Recuerda configurar las
variables de entorno en el proveedor.
