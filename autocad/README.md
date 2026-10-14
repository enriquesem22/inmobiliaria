# DIVZONA — dividir una zona en rectángulos (AutoCAD)

Comando AutoLISP que funciona como **CONTORNO**: designas un punto dentro de
una zona cerrada y el comando:

1. Calcula el contorno de la zona.
2. Toma su **lado más largo** (aunque esté girado o aunque otra línea toque
   ese lado y lo parta en dos).
3. Divide la zona en franjas perpendiculares a ese lado: el **máximo número
   posible** de rectángulos iguales, todos con al menos el ancho mínimo
   (1,20 m por defecto) medido sobre el lado largo.

```
n     = parte entera (lado mayor / ancho mínimo)
ancho = lado mayor / n          → siempre ≥ ancho mínimo
```

| Lado mayor | Mínimo | Resultado                     |
|-----------:|-------:|-------------------------------|
| 6,50       | 1,20   | 5 rectángulos de 1,30         |
| 7,20       | 1,20   | 6 rectángulos de 1,20         |
| 10,00      | 1,20   | 8 rectángulos de 1,25         |
| 1,00       | 1,20   | no se divide (no cabe ninguno)|

## Cargar el comando

- Arrastra `DIVZONA.lsp` sobre el dibujo abierto, **o**
- Ejecuta `APPLOAD` (en AutoCAD en español: `CARGAAP`) y carga el archivo.

Para que se cargue siempre al abrir AutoCAD, añádelo en ese mismo cuadro al
**Startup Suite / Conjunto de inicio** (icono del maletín).

Sirve para AutoCAD completo y para AutoCAD LT 2024 o posterior (las versiones
LT anteriores no admiten LISP).

## Uso

```
Comando: DIVZONA
DIVZONA - ancho minimo actual: 1.2
Designe punto interno o [Minimo/Seleccionar] <Salir>:   ← clic dentro de la zona
Zona rectangular de 6.5 x 3 -> 5 rectangulos de 1.3 x 3 (minimo 1.2).
Designe punto interno o [Minimo/Seleccionar] <Salir>:   ← otra zona, o INTRO
```

- **Punto interno**: igual que en CONTORNO. Puedes encadenar varias zonas;
  `INTRO` termina.
- **M (Minimo)**: cambia el ancho mínimo. El valor se recuerda mientras el
  dibujo siga abierto.
- **S (Seleccionar)**: en lugar de un punto, divide una polilínea cerrada ya
  dibujada (esa polilínea no se borra).

Los rectángulos se crean como **polilíneas cerradas en la capa actual**. El
contorno auxiliar que genera el comando se borra. Todo lo que hace una
ejecución de DIVZONA se deshace de una vez con `Ctrl+Z`.

## Unidades

El ancho mínimo está en **unidades de dibujo**. Si el dibujo tiene
`INSUNITS` en milímetros, el valor por defecto es `1200`; en centímetros,
`120`; en cualquier otro caso, `1.2`. Si tus unidades no están bien
configuradas, cambia el mínimo con la opción **M**.

## Zonas que no son rectangulares

El comando está pensado para zonas rectangulares, pero también admite otras
formas:

- **Trapecios, formas en L con el lado largo abajo, etc.**: se dividen igual
  y cada franja se recorta al contorno. Las piezas de los extremos pueden no
  ser rectángulos; el comando avisa para que las revises.
- **Formas en las que una recta perpendicular al lado largo corta la zona en
  varios tramos** (por ejemplo, una U tumbada): no se dividen. Divide antes la
  zona en partes más sencillas.
- **Tramos curvos**: se tratan como rectos (el comando avisa).
- Si dentro de la zona hay **islas** (un pilar, por ejemplo), se ignoran.

Como en CONTORNO, la zona tiene que estar visible en pantalla y bien cerrada.
