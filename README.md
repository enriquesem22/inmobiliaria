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
- **CRM propio** con base de datos SQLite ([better-sqlite3](https://github.com/WiseLibs/better-sqlite3)) y panel en `/admin`
- Blog en Markdown (`gray-matter` + `react-markdown`)
- SEO: metadatos, `sitemap.xml`, `robots.txt` y datos estructurados (JSON-LD)

El sitio esta organizado en dos grupos de rutas: `(site)` para la web
publica (con cabecera, pie y WhatsApp) y `(admin)` para el panel del CRM
(con su propio layout, sin la cabecera comercial).

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

- `name` — nombre comercial (actualmente **"Sem²a"**, provisional).
- `contactPerson` — persona de contacto (actualmente "Pepe Serrano Maestro").
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

### 3. CRM y formularios

Todos los formularios envian los datos a la ruta **`/api/leads`**
(`src/app/api/leads/route.ts`), que **guarda cada lead en el CRM** (base de
datos SQLite) y lo deja disponible en el panel de administracion.

**Panel de administracion:** `/admin`

- Protegido con contrasena. Define la variable de entorno **`ADMIN_PASSWORD`**
  para habilitarlo (sin ella nadie puede entrar). Ver `.env.example`.
- Lista de leads con buscador y filtros por tipo y por estado.
- Ficha de cada lead con todos los datos, botones de contacto (telefono,
  WhatsApp, email) y gestion de **estado** (nuevo, contactado, en proceso,
  ganado, perdido) y **notas internas**.
- Exportacion a **CSV** de los leads (respetando los filtros activos).

**Base de datos:** por defecto SQLite en `data/crm.db` (fuera de git;
configurable con `CRM_DATABASE_PATH`). Requiere un disco persistente. La
capa de datos esta en `src/lib/crm.ts` y `src/lib/db.ts`, pensada para poder
cambiar a Postgres/Turso si se despliega en serverless.

**Reenvio externo (opcional):** ademas de guardarse en el CRM, cada lead
puede reenviarse a un webhook externo (otro CRM, Make/Zapier, etc.) definiendo:

```
LEADS_WEBHOOK_URL=https://hooks.tu-crm.com/xxxx
```

El lead se envia como JSON con la forma `{ type, data, meta }`.

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
    (site)/            # Web publica (layout con cabecera, pie, WhatsApp)
      zonas/[slug]/    # Paginas de SEO local por municipio
      blog/[slug]/     # Articulos del blog
      ...
    (admin)/           # Panel del CRM (layout propio)
      admin/           # /admin, /admin/login, /admin/leads/[id], /admin/export
      actions.ts       # Server actions (login, logout, actualizar lead)
    api/leads/         # Recepcion de formularios (guarda en el CRM)
    layout.tsx         # Layout raiz (fuentes, metadatos globales)
  components/
    layout/            # Header, Footer, WhatsApp, cookies
    sections/          # Secciones reutilizables (hero, servicios, proceso...)
    forms/             # Formularios de captacion
    ui/                # Componentes de interfaz (Button, Section, etc.)
    seo/               # Datos estructurados JSON-LD
  content/blog/        # Articulos en Markdown
  data/                # Datos centralizados (site, servicios, zonas, proceso)
  lib/                 # Utilidades, blog, y CRM (db.ts, crm.ts, auth.ts)
data/                  # Base de datos SQLite del CRM (generada, fuera de git)
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
plataforma compatible. Recuerda configurar las variables de entorno
(`ADMIN_PASSWORD`, y opcionalmente `LEADS_WEBHOOK_URL`, `CRM_DATABASE_PATH`).

> **Importante:** el CRM usa SQLite, que necesita un **disco persistente**
> (VPS, servidor propio o contenedor con volumen). En plataformas serverless
> sin disco persistente (p. ej. Vercel) los datos del CRM no se conservarian;
> en ese caso, sustituye la capa de `src/lib/db.ts` por una base de datos
> gestionada (Postgres, Turso, etc.), manteniendo la interfaz de
> `src/lib/crm.ts`.
