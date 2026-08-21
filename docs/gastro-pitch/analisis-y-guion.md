# El plato, no el restaurante

**Análisis de producto y guion de pitch deck para una red social gastronómica.**

Este documento tiene dos partes:

1. **Análisis crítico de la idea** y reordenación de la narrativa (lo que hay que cambiar antes de diseñar nada).
2. **Guion de la presentación**: 18 diapositivas con título, mensaje, contenido, propuesta visual y qué aparece en pantalla.

No hay cifras de mercado inventadas. Al final hay una lista de los datos que sí conviene conseguir y de dónde.

---

## Parte 1 — Análisis de producto

### El diagnóstico en una frase

La idea es buena y el problema es real, pero **la narrativa actual vende cuatro productos y ninguno queda claro**: red social + base de datos de cartas + IA + plataforma B2B. Quien escucha eso entiende "proyecto enorme, foco cero".

Hay una reordenación que lo arregla: **la unidad del producto no es el restaurante, es el plato con su precio.**

Ese cambio de eje resuelve varias cosas a la vez:

- Es lo único que **no tiene absolutamente nadie** (Google, TripAdvisor, TheFork e Instagram puntúan sitios, no platos).
- Es **lo que hace posible la IA**. Sin datos a nivel plato, "¿Qué pedimos?" es un truco de demo.
- Es **lo que un amigo realmente quiere saber**. Nadie pregunta "¿cuánto le pones a ese sitio?"; pregunta "¿qué pediste?".
- Es **el activo B2B**. Un restaurante no paga por reseñas; paga por saber qué platos se consultan, se guardan y se piden.

Titular de trabajo para todo el deck: **el mundo puntúa restaurantes; la gente recuerda platos.**

---

### Las once decisiones que cambian el pitch

#### 1. El plato es la unidad, no el restaurante

Todo el deck se ordena alrededor de esto. La ficha del restaurante deja de responder "¿está bien este sitio?" y pasa a responder **"¿qué pido aquí?"**. Es una diferencia de posicionamiento, no de funcionalidad.

#### 2. El ticket real es el gancho, y ahora mismo está enterrado

"Precio medio" y "€€" existen en todas partes y no significan nada. Lo que no existe en ningún sitio es:

> *4 personas · 137 € · esto es exactamente lo que pidieron.*

Es información con la que se toman decisiones y provoca una reacción emocional inmediata (los precios de restaurante son una ansiedad universal y nadie la ha resuelto). **Debe estar en la portada y en la diapositiva de insight**, no escondido en la de "experiencia social".

#### 3. Registrar una comida tiene que ser una foto, no un formulario

Este es el mayor riesgo de todo el producto y hay que atacarlo de frente.

La lista actual de campos a rellenar —restaurante, platos, precio de cada plato, precio total, número de personas, fotos, valoración por plato, comentarios, qué repetirías— es un formulario largo. **Nadie rellena un formulario largo después de cenar y con vino.** Si el registro no ocurre, el flywheel no arranca, no hay datos, y sin datos no hay IA ni negocio B2B.

**Propuesta: el registro empieza por una foto del ticket.**

1. Foto del ticket (y opcionalmente de la mesa).
2. La IA extrae restaurante, platos, precios por plato, total y —muy a menudo— el número de comensales.
3. El usuario solo hace una cosa: puntuar los platos con un toque y marcar cuáles repetiría.
4. Publicar.

Quince segundos. Y hay un efecto secundario enorme: **el ticket es la verdad sobre el precio**, mejor incluso que la carta, porque refleja lo que se cobró de verdad. La misma tecnología que digitaliza cartas digitaliza tickets. Es el mismo motor con el doble de valor.

Esto también reduce el alcance del MVP: menos pantallas de formulario, más cámara.

*Nota de privacidad, y conviene decirla en el deck porque da credibilidad:* el ticket se procesa para extraer platos y precios, no se publica tal cual, y nunca se guardan datos de pago.

#### 4. La tarjeta para compartir es el motor del producto, no un extra

Un Strava de la comida: haces la foto (del plato, de la mesa, de la gente) y la app la convierte en una tarjeta con el restaurante, cuántos erais, qué pedisteis y las estadísticas que quedan bien. Luego la publicas donde quieras.

Esto no es una funcionalidad más. **Es lo que resuelve el mayor riesgo del punto anterior.** Hasta ahora, la razón para registrar una comida era altruista: "mis amigos lo verán en la app" — lo cual no funciona el primer día, cuando no tienes amigos dentro. La tarjeta da una recompensa inmediata y egoísta: registras porque te llevas algo que te apetece enseñar. Es exactamente el mecanismo de Strava, y por eso Strava tiene datos y las demás apps de running no.

Y encima resuelve la distribución: **Instagram deja de ser un competidor y pasa a ser el reparto.** Millones de personas ya fotografían su comida y la publican sin ningún dato. Nosotros les damos la capa que falta, y cada publicación lleva nuestro nombre dentro. Es adquisición gratuita en el contexto perfecto.

Tres decisiones de diseño que hay que tomar bien, porque de ellas depende que funcione:

**a) Los datos salen del GPS y del ticket, no de la cara de la gente.**
La tentación es "la IA cuenta cuántos sois en la foto". No lo hagas. Detectar caras es tratamiento de datos biométricos y en Europa eso te mete en una categoría de riesgo que no quieres tocar en una v1, además de fallar la mitad de las veces. La versión fiable y aburrida es mejor: el restaurante lo sabe el móvil por geolocalización (estás allí), y el número de personas y los platos salen del ticket, que ya estás fotografiando. Reconocer el plato por visión sí es razonable como ayuda, no como fuente de verdad.

**b) Las medallas son de sitios, no de dinero.**
Es la adaptación no obvia. En Strava presumes de kilómetros y de ritmo, y eso es socialmente seguro. Presumir de cuánto te has gastado en una cena no lo es: según el número, quedas de pijo o de rata. Así que las estadísticas que se lucen tienen que ir de **descubrimiento y colección**, no de gasto: "restaurante nº 37 del año", "primera vez en Chamberí", "tercera visita, ya eres del barrio", "cinco semanas seguidas probando sitio nuevo". Eso convierte comer fuera en algo que se colecciona, que es exactamente el gancho de Strava.

**c) El precio, fuera de la app, es opcional.**
Dentro de la app el precio es el producto entero y va siempre. En la tarjeta que sale a Instagram, el usuario decide antes de publicar. Sin esa opción, mucha gente no compartirá nunca, y perderás el canal por no haber puesto un interruptor.

**d) La plantilla la pone el sitio, y ahí está el mejor argumento comercial del proyecto.**
Como la app sabe dónde estás, la tarjeta puede salir ya con la identidad del local. Sin ficha reclamada, una plantilla neutra con el nombre; con la ficha verificada, su logo, sus colores y sus marcos.

Esto convierte "reclama tu ficha" en una propuesta mucho más apetecible que "corrige tus datos": **un restaurante mete su marca en las stories de sus clientes, en el momento de máximo entusiasmo y sin pagar publicidad.** Probablemente sea lo primero por lo que un local pagaría, por encima de la gestión de la carta — es marketing, no administración. Conviene ponerlo el primero en la descripción de Pro.

Con una condición no negociable, que es justo donde fallan los ejemplos que circulan: **el logo va pequeño, siempre, y nunca es el elemento principal.** Si la tarjeta parece un anuncio del restaurante, el usuario no la publica, y entonces no le sirve a nadie — tampoco al restaurante. Lo que manda en la tarjeta es el momento del usuario y sus números; la marca del local es contexto.

*Detalle de ejecución que se nota:* los datos van en el tercio inferior, fuera de las zonas que Instagram tapa con su propia interfaz, y siempre sobre un degradado oscuro. Así la foto se ve y el texto se lee, sea cual sea la foto. Datos en mitad de la imagen, encima de las caras y sin degradado es el error más común.

Y la maquetación importa tanto como el dato: composición centrada, el nombre del local arriba, las cifras apiladas y grandes abajo —personas, total y precio por cabeza— y un sello redondo en la esquina que lleva dentro el nombre de la app y la medalla. Con dos cosas juntas: se lee bien y apetece publicarlo. Una tarjeta que solo cumple lo primero no se comparte, y una que solo cumple lo segundo no se entiende.

#### 5. La app tiene que ser útil con cero amigos

Es el problema clásico de toda app social: el primer usuario abre un feed vacío y se va. Instagram lo resolvió con los filtros (útil solo), Strava con el GPS (útil solo).

Aquí la versión "single-player" ya existe dentro de la idea, solo hay que ascenderla: **"¿Qué pido?" en modo individual**. Estoy sentado, tengo la carta delante, no conozco a nadie en la app, y la app me dice qué pedir según mis gustos y mis restricciones. Funciona el día 1, con 0 amigos y 0 publicaciones.

Ordenar así el producto es además un argumento muy sólido en una reunión con inversores: **"la app aporta valor antes de tener red social"**.

#### 6. El modo grupo no es una funcionalidad: es el canal de adquisición

Para crear la cena de 8, hay que invitar a 7 personas. Cada cena en grupo es una invitación a siete instalaciones, en un contexto en el que la gente sí instala (están sentados, con hambre y decidiendo).

Es el bucle viral más barato del producto y ahora mismo aparece como una feature más. Debe aparecer **en la diapositiva de crecimiento**, con nombre propio.

#### 7. Las etiquetas de origen del dato son posicionamiento, no letra pequeña

La intuición sobre alérgenos es correcta y hay que convertirla en ventaja competitiva visible. Tres etiquetas, siempre a la vista, en cada dato:

- **Verificado por el restaurante**
- **Detectado por IA**
- **Aportado por la comunidad**

Regla del producto, y queda muy bien como frase de diapositiva: **"La IA propone. El restaurante confirma. Nunca al revés."** En alérgenos, la IA nunca filtra "esto es seguro para ti": marca, avisa y remite al restaurante.

Y aquí está el truco de negocio: **esa etiqueta es el motivo por el que un restaurante reclama su ficha gratis.** Ver "detectado por IA" sobre sus propios precios y alérgenos es un incentivo mucho más fuerte que cualquier email comercial. La honestidad sobre el dato es, literalmente, el canal de adquisición B2B.

#### 8. Las restricciones se declaran; los gustos se aprenden

El perfil gastronómico descrito (comidas favoritas, ingredientes que gustan, ingredientes que no, tipos de cocina, presupuesto, restricciones) es un cuestionario largo en el peor momento posible: el primer minuto de uso.

Dividirlo:

- **En el alta (30 segundos):** solo alergias y restricciones, porque son seguridad y no se pueden inferir. Más presupuesto habitual, que es un toque.
- **Después, en silencio:** los gustos se deducen de las valoraciones, de lo que repites y de lo que guardas. El perfil se rellena solo y esa es una buena historia que contar ("la app te conoce mejor cada vez que comes").

#### 9. Lanzar un barrio, no un país

Una app social geolocalizada no funciona con 10.000 usuarios repartidos por España; funciona con 500 en un barrio. Densidad local por encima de usuarios totales.

Además, hay que **sembrar la cobertura de cartas antes de abrir**: en la zona piloto, las cartas de los restaurantes principales tienen que estar ya digitalizadas el día del lanzamiento, para que "¿Qué pido?" funcione desde el primer momento. La comunidad amplía la cobertura; no se puede depender de ella para arrancarla.

#### 10. El foso no es la IA, y decirlo en voz alta suma credibilidad

Cualquiera puede llamar a un modelo. Lo que no se copia en un fin de semana:

- La **base de datos estructurada de platos con precios reales y valoraciones**, que crece con cada comida registrada y no existe en ningún otro sitio.
- La **densidad del grafo social local**: mis amigos no están en la app del competidor.
- Las **cartas verificadas** por los propios restaurantes, una vez reclamadas.

Reconocer que el modelo es una commodity y señalar dónde está el valor real es exactamente lo que un inversor con criterio quiere oír.

#### 11. Monetizar en escalera, y con una línea roja explícita

Enseñar cuatro vías de ingreso a la vez parece humo. Presentarlas como una secuencia con condiciones de activación parece un plan:

1. **Gratis** — el restaurante reclama y verifica su ficha. Objetivo: datos correctos y relación establecida.
2. **Pro (suscripción)** — gestión de carta y precios, platos fuera de carta, especiales del día, promociones.
3. **Destacados patrocinados** — visibilidad en el buscador, siempre etiquetada.
4. **Analytics** — datos agregados: platos más consultados, más guardados, ticket medio de la zona, tendencias.

Y la línea roja, que conviene enunciar en la propia diapositiva: **la recomendación personalizada no se vende.** Lo patrocinado se etiqueta y va separado de lo orgánico. Si el usuario deja de fiarse de la recomendación, el activo entero se evapora — y con él, el negocio B2B que depende de él.

---

### Lo que hay que quitar o bajar de nivel

| Elemento | Qué hacer |
|---|---|
| Perfil gastronómico completo en el alta | Reducir a restricciones + presupuesto. Los gustos se aprenden. |
| Estadísticas del histórico personal (ciudades, cocinas, ticket medio…) | Buenísimo para retención, pero es un detalle dentro de la diapositiva social, no una sección. |
| "Cuatro elementos del producto" (social + datos + IA + B2B) | No abrir con esto. Abrir con dos momentos: **antes** (dónde vamos) y **dentro** (qué pedimos). Los cuatro elementos son la arquitectura interna, no el pitch. |
| Lista larga de campos al registrar | Foto del ticket + puntuación. Lo demás, opcional. |
| Modo grupo como feature | Reposicionarlo como motor de crecimiento. |

---

### La narrativa, reescrita

**La historia en seis frases:**

1. Cada semana se repiten dos preguntas: *¿dónde vamos?* y *¿qué pedimos?*
2. Ninguna app responde ninguna de las dos: te dan un 4,2 de gente que no conoces y fotos sin precio.
3. Lo que sí resuelve la duda es lo que pidió tu amigo, cuánto pagó y si lo repetiría.
4. Así que construimos la red donde se registra lo que se come, con platos, precios y valoraciones plato a plato.
5. Con esos datos, la IA lee la carta, conoce las alergias y los gustos de la mesa, y propone el pedido completo con el coste por persona.
6. Cada comida registrada mejora la base de datos de platos y precios que no tiene nadie — y es la razón por la que los restaurantes acaban queriendo estar dentro.

**El pitch de 30 segundos:**

> Cuando quedas a comer hay dos preguntas: dónde vamos y qué pedimos. Google te da un 4,2 y ochocientas reseñas de desconocidos. Instagram te da fotos sin precio. Nosotros te enseñamos lo que pidieron tus amigos, cuánto pagaron y qué repetirían. Y cuando ya estás sentado, la IA lee la carta, conoce las alergias y los gustos de toda la mesa y propone el pedido entero con el precio por persona. Cada comida registrada construye una base de datos de platos y precios reales que hoy no existe.

**Tagline (la que ya estaba en la idea es la mejor):**

- **Dónde comen tus amigos. Y qué pedir cuando llegues.** ← recomendada
- El mundo puntúa restaurantes. Nosotros, platos.
- Nunca más "pide tú, que yo no sé".
- La carta, resuelta.

---

## Parte 2 — Estructura de la presentación

18 diapositivas. Reglas de estilo para todas:

- **Una idea por diapositiva.** Si hay dos, son dos diapositivas.
- **Titulares de 9 palabras como máximo**, escritos como afirmación, no como etiqueta ("El mundo puntúa restaurantes" en lugar de "Insight de mercado").
- **Nada de párrafos.** Frases sueltas de una línea.
- **Un solo elemento visual dominante** por diapositiva.
- Legible desde el fondo de una sala: cuerpo mínimo equivalente a 24 pt.

---

### 1 · Portada

- **Título:** [Nombre] — *Dónde comen tus amigos. Y qué pedir cuando llegues.*
- **Mensaje principal:** en una frase se entiende el producto entero.
- **Contenido:** nombre, tagline, una línea de categoría ("Red social gastronómica con recomendación por IA"), ciudad piloto y fecha.
- **Propuesta visual:** pantalla a sangre, fondo oscuro. A la derecha, un único mockup de móvil con una publicación real del feed (con su ticket y sus precios). Sin collage, sin logos de terceros.
- **En pantalla:** máximo nueve palabras y un móvil.

### 2 · Problema

- **Título:** Dos preguntas que se repiten cada semana
- **Mensaje principal:** el problema no es encontrar restaurante; es decidir entre varias personas sin saber lo que vas a pagar.
- **Contenido:** tres bloques de una línea cada uno — *¿Dónde vamos?* (cientos de opciones, ninguna de confianza) · *¿Qué pedimos?* (8 personas, 3 restricciones, 60 platos) · *¿Cuánto va a costar?* ("€€").
- **Propuesta visual:** en el centro, la imagen más reconocible que existe: un grupo de WhatsApp con cuarenta mensajes y ninguna decisión ("me da igual", "donde queráis", "yo no como gluten"). Las tres preguntas alrededor, en grande.
- **En pantalla:** tres preguntas enormes + el chat. Ni una frase más.

### 3 · Insight

- **Título:** El mundo puntúa restaurantes. La gente recuerda platos.
- **Mensaje principal:** la unidad de información útil es el plato con su precio, y hoy no está en ninguna base de datos.
- **Contenido:** comparación directa entre lo que existe y lo que falta.
- **Propuesta visual:** pantalla partida. Izquierda, apagada, en gris: una ficha genérica, *4,2 ★ · 1.240 reseñas · €€*. Derecha, a color: la tarjeta de un plato — *Steak tartar · 18 € · 9/10 · "lo volvería a pedir" — Carlos*.
- **En pantalla:** el titular y las dos tarjetas. El contraste hace todo el trabajo.

### 4 · Concepto

- **Título:** Dos momentos, una app
- **Mensaje principal:** el producto es simple aunque por dentro tenga cuatro capas.
- **Contenido:** **ANTES** → el feed de tus amigos: dónde comieron, qué pidieron y cuánto pagaron. **DENTRO** → ya estás sentado: la carta digital y la IA te dicen qué pedir.
- **Propuesta visual:** dos columnas simétricas, cada una con su mockup y un icono grande. Una línea horizontal que las une, con el rótulo "la misma app".
- **En pantalla:** dos palabras (ANTES / DENTRO), dos pantallas, una frase.

### 5 · Cómo funciona

- **Título:** Registrar una comida son quince segundos
- **Mensaje principal:** la fricción es el enemigo del producto, así que el registro es una foto.
- **Contenido:** cuatro pasos — foto del ticket → la IA extrae platos, precios y total → puntúas con un toque → se publica y la ficha del restaurante mejora.
- **Propuesta visual:** flujo horizontal de cuatro pasos. El elemento central es la metamorfosis: el ticket de papel fotografiado convirtiéndose en tarjetas de plato con su precio y su nota. Si la presentación es en vivo, esto se anima.
- **En pantalla:** cuatro iconos, cuatro palabras, y la transformación ticket → datos.
- *Añadir en pequeño, abajo:* "El ticket se procesa para extraer platos y precios. No se publica, y no guardamos datos de pago."

### 6 · Un Strava de la comida

- **Título:** Un Strava de la comida
- **Mensaje principal:** la recompensa por registrar la cena no está dentro de la app; es la tarjeta que te apetece publicar.
- **Contenido:** haces la foto, la app le pone el restaurante (por GPS), las personas y los platos (del ticket) y una medalla de descubrimiento. Tres reglas: los datos vienen del móvil y del ticket, las medallas son de sitios y no de dinero, y el precio fuera de la app lo enseñas si quieres.
- **Propuesta visual:** la tarjeta vertical formato *story* a la izquierda, con la foto y los datos sobreimpresos como en Strava. A la derecha, las tres reglas y una fila de medallas de ejemplo.
- **En pantalla:** la tarjeta, cuatro medallas y una frase: *"Instagram deja de ser el competidor y pasa a ser el reparto."*

### 7 · La plantilla del sitio

- **Título:** Cada sitio tiene la suya
- **Mensaje principal:** estás allí, así que la app ya sabe dónde: la tarjeta sale con la identidad del local puesta.
- **Contenido:** lo del local cambia (logo, nombre, colores); lo nuestro no cambia nunca (estructura de datos, medallas, firma). Sin reclamar la ficha, plantilla neutra con el nombre; con la ficha verificada, su marca. Y el logo siempre pequeño.
- **Propuesta visual:** el mismo formato de tarjeta en tres locales distintos, uno al lado del otro — un chiringuito de playa, una taberna oscura, una terraza de noche. Se ve de un vistazo que es el mismo sistema.
- **En pantalla:** tres tarjetas y una frase: *"un restaurante mete su marca en las stories de sus clientes, en el momento de máximo entusiasmo y sin pagar publicidad."*

### 8 · Experiencia social

- **Título:** El feed que sí te dice algo
- **Mensaje principal:** una cena de un amigo vale más que mil reseñas de desconocidos.
- **Contenido:** la publicación completa de Carlos con su desglose (steak tartar 18 € · 9/10, croquetas 10 € · 8/10, vino 24 € — total 52 € para 2). Alrededor, las acciones: guardar plato, guardar restaurante, añadir a lista. En una esquina, el histórico personal (restaurantes visitados, ticket medio, cocinas favoritas).
- **Propuesta visual:** el mockup del post, grande y centrado, con tres llamadas señalando las acciones. El total, en el tamaño de tipografía más grande de la diapositiva.
- **En pantalla:** una publicación real, legible desde el fondo de la sala.

### 9 · Ficha de restaurante

- **Título:** De "4,2 estrellas" a "pide esto"
- **Mensaje principal:** la ficha responde qué pedir, no si el sitio está bien.
- **Contenido:** carta con precios · platos mejor valorados · **qué pidieron tus amigos** · compatibles con tus restricciones · ticket medio real, no un rango de símbolos de euro.
- **Propuesta visual:** un mockup de la ficha con tres bandas resaltadas y anotadas: "Tus amigos pidieron", "Compatible contigo", "Top platos".
- **En pantalla:** una pantalla con tres anotaciones. La banda de "tus amigos" es la que va destacada en color.

### 10 · IA "¿Qué pedimos?"

- **Título:** Ocho personas. Tres restricciones. Pedido resuelto.
- **Mensaje principal:** es el momento en el que la gente instala la app.
- **Contenido:** entra la carta completa + los perfiles de los ocho + alergias + presupuesto. Sale el pedido: entrantes para compartir, platos principales que cuadran con cada restricción, cantidades recomendadas, coste total y **coste por persona**. Mención en una línea: también funciona para uno solo.
- **Propuesta visual:** izquierda, ocho avatares con sus etiquetas visibles (sin gluten, vegetariano, alergia a frutos secos, presupuesto 25 €). Flecha. Derecha, la propuesta de pedido presentada como un ticket previo, con el total y el "≈ 27 € / persona" resaltados.
- **En pantalla:** entrada → salida. Los ocho avatares y el ticket propuesto. Es la diapositiva que hay que poder demostrar en vivo.

### 11 · Cartas digitales y confianza

- **Título:** La IA propone. El restaurante confirma.
- **Mensaje principal:** resolvemos la cobertura de cartas sin depender de los restaurantes, y somos transparentes sobre el origen de cada dato.
- **Contenido:** foto de la carta → la IA detecta categorías, platos, ingredientes, precios y posibles alérgenos → carta digital estructurada. Y las tres etiquetas de origen, siempre visibles.
- **Propuesta visual:** arriba, la fotografía de una carta descomponiéndose en bloques estructurados. Abajo, tres etiquetas con tres colores distintos: **Verificado por el restaurante** / **Detectado por IA** / **Aportado por la comunidad**.
- **En pantalla:** las tres etiquetas y una frase: *"En alergias, una inferencia nunca se presenta como una garantía."* Esta diapositiva vende madurez; no hay que esconderla.

### 12 · Un vistazo a la app

- **Título:** Así se vería
- **Mensaje principal:** el concepto ya tiene forma de producto.
- **Contenido:** cinco pantallas — el feed, la ficha de un restaurante, la propuesta de la IA para la mesa, el buscador con filtros de restricciones y el perfil con las estadísticas del año.
- **Propuesta visual:** los cinco móviles en fila, con su rótulo debajo. Sin flechas ni explicación: es una galería, no un flujo.
- **En pantalla:** cinco pantallas y sus nombres. Todo lo que se ve sale de comidas registradas, y conviene decirlo.

### 13 · Flywheel

- **Título:** Cada comida registrada mejora la siguiente
- **Mensaje principal:** el producto se vuelve mejor solo, y por eso el dato es el activo.
- **Contenido:** el círculo — registras una comida → platos y precios reales → mejor ficha de restaurante → más usuarios activos → más comidas registradas → la IA acierta más → vuelta a empezar. Y dos círculos más por fuera: cada tarjeta publicada en Instagram trae gente que no nos conocía, y cuando el volumen se hace visible el restaurante quiere gestionar su presencia — ahí aparece la monetización.
- **Propuesta visual:** un diagrama circular limpio con seis nodos y flechas de sentido. En el centro: "MÁS DATOS · MEJOR PRODUCTO". El anillo B2B, en un tono secundario por fuera.
- **En pantalla:** solo el titular y el diagrama. Cero texto de apoyo.

### 14 · Arranque

- **Título:** Útil el primer día, con cero amigos
- **Mensaje principal:** sabemos por qué mueren las apps sociales y el producto está diseñado en contra de eso.
- **Contenido:** tres decisiones — **(1)** "¿Qué pido?" funciona en solitario, sin red social; **(2)** lanzamos un barrio con las cartas ya sembradas, no un país entero; **(3)** cada cena en grupo invita a siete personas.
- **Propuesta visual:** a la izquierda, un mapa de la ciudad con una única mancha de densidad concentrada (frente a un mapa de puntos dispersos, tachado). A la derecha, el bucle de invitación: 1 organizador → 7 invitados.
- **En pantalla:** tres titulares cortos y el mapa. Esta es la diapositiva que responde a la primera objeción de cualquier inversor.

### 15 · MVP

- **Título:** Lo que construimos, y lo que no
- **Mensaje principal:** alcance disciplinado y una versión 1 que cabe en un equipo pequeño.
- **Contenido:**
  - **Fase 0 — útil sin red:** alta y perfil · restricciones y alergias · buscador y ficha de restaurante · carta digitalizada por foto · **"¿Qué pido?" individual**.
  - **Fase 1 — la capa social:** amigos y seguidores · feed · registro de comidas por foto de ticket · valoración por plato · **tarjeta para compartir fuera** · **"¿Qué pedimos?" en grupo**.
  - **Ahora no:** delivery · reservas · pagos · dividir la cuenta · fidelización · chat · stories · integración con TPV.
- **Propuesta visual:** tres columnas. Las dos primeras en positivo, con marca de verificación. La tercera en gris y tachada.
- **En pantalla:** listas cortas de palabras sueltas. La columna tachada es la que más confianza genera.

### 16 · Restaurantes y modelo de negocio

- **Título:** Primero la ficha. Después el cliente.
- **Mensaje principal:** los restaurantes entran gratis porque necesitan corregir sus propios datos, y ahí empieza el negocio.
- **Contenido:** la escalera de cuatro peldaños — Gratis (reclamar y verificar la ficha) → Pro (gestión de carta, precios, especiales, promociones) → Destacados patrocinados (siempre etiquetados) → Analytics (platos más consultados y guardados, ticket medio, tendencias).
- **Propuesta visual:** cuatro peldaños ascendentes, cada uno con un icono y tres palabras. Bajo la escalera, una franja con la línea roja escrita.
- **En pantalla:** los cuatro peldaños y la frase: **"La recomendación personalizada no se vende. Lo patrocinado se etiqueta."**

### 17 · Ventajas competitivas

- **Título:** Nadie compite en el momento "ya estoy sentado"
- **Mensaje principal:** las alternativas resuelven descubrimiento o reserva; ninguna resuelve la decisión dentro del restaurante.
- **Contenido:** tabla comparativa con Google Maps, TripAdvisor, TheFork, Instagram y nosotros, por filas: *opinión de quién · nivel de plato · precio real del ticket · restricciones y alergias · te dice qué pedir*.
- **Propuesta visual:** tabla sobria con marcas de verificación. Todas las columnas apagadas menos la nuestra, encendida. La fila "te dice qué pedir" queda vacía en todas menos en la última.
- *Ojo con la coherencia:* en la tabla Instagram aparece como alternativa, pero en la diapositiva 6 lo hemos llamado canal de distribución. No es contradictorio y conviene decirlo si alguien lo pregunta: como fuente de información para el que va a comer, Instagram no compite; como sitio donde la gente ya publica su comida, es nuestro reparto.
- **En pantalla:** la tabla y, debajo, una sola frase sobre el foso: *"El foso no es el modelo de IA. Es la base de datos de platos con precios y el grafo social local."*

### 18 · Visión y cierre

- **Título:** La capa de datos de lo que se come
- **Mensaje principal:** empezamos resolviendo la cena del sábado y acabamos siendo la referencia de platos y precios.
- **Contenido:** tres saltos — un barrio → las ciudades donde se sale a comer → la base de datos de referencia de platos, precios y gustos. Cierre con el tagline y con lo que se pide (socios, restaurantes piloto, inversión, según a quién se le enseñe).
- **Propuesta visual:** la frase de cierre a pantalla completa, tipografía enorme, casi sin nada más. Tres hitos discretos en la parte inferior y los datos de contacto.
- **En pantalla:** *Dónde comen tus amigos. Y qué pedir cuando llegues.* Y qué necesitas.

---

## Parte 3 — Anexos

### Diapositivas de reserva (no en el pase principal; para preguntas)

- **A · Riesgos y cómo los afrontamos.** Fricción del registro → foto del ticket. Arranque en frío → modo individual y lanzamiento por barrio. Exactitud de las cartas → etiquetas de origen y verificación del restaurante. Adopción por restaurantes → entrada gratuita para corregir datos. Responsabilidad en alérgenos → la IA nunca certifica.
- **B · Roadmap a 18 meses.** Fase 0, fase 1, apertura de segunda ciudad, panel de restaurante.
- **C · Métricas que vamos a mirar.** Comidas registradas por usuario activo al mes; % de comidas registradas con foto de ticket; **% de comidas que se comparten fuera de la app**; cobertura de cartas en la zona piloto; uso de "¿Qué pedimos?" por cena; invitados por grupo creado; fichas reclamadas por restaurantes.
- **D · Mercado.** Con datos reales, cuando los tengas (ver abajo).
- **E · Equipo y petición.**

### Cómo pasar de 18 a 12 diapositivas

Si el pase tiene que ser más corto: fusiona la 8 dentro de la 7, la 10 dentro de la 5 y la 6 dentro de la 7, y manda la 12 al anexo. Quedan 12 y la historia sigue en pie. La 6 (la tarjeta) es la última que conviene tocar: es el argumento de crecimiento.

### Datos que faltan y de dónde sacarlos

No inventes ninguna cifra. Estos son los cinco que sostienen el pitch, y todos son públicos o medibles:

1. **Gasto de los hogares en restauración** en España — INE, Encuesta de Presupuestos Familiares.
2. **Número de establecimientos de restauración** en el país y en la ciudad piloto — INE / DIRCE y el directorio del ayuntamiento.
3. **Tamaño y evolución del sector** — informes anuales de Hostelería de España.
4. **Cuántos de esos locales tienen carta digital estructurada** — esto lo puedes medir tú mismo con una muestra de 100 restaurantes de tu barrio. Es un dato propio, y un dato propio en un deck vale más que uno de un informe.
5. **Frecuencia de comidas en grupo y tamaño medio del grupo** — encuesta propia a 100–200 personas. Barato, rápido y directamente relevante para la funcionalidad estrella.

### Nota sobre el nombre

La portada necesita un nombre. Cuatro direcciones, por si sirven de punto de partida: algo alrededor de la **sobremesa** (muy español, cálido, difícil de registrar), algo alrededor del **ticket o la cuenta** (coherente con el posicionamiento de precio real), algo alrededor de **pedir** (directo al caso de uso) o un nombre corto y neutro que se pueda pronunciar en varios idiomas si la ambición es salir de España.
