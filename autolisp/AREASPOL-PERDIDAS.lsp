;;; ==========================================================================
;;; AREASPOL-PERDIDAS.lsp
;;; --------------------------------------------------------------------------
;;; Comando: AREASPOL-PERD
;;;
;;; Companion de AREASPOL.lsp. Trabaja sobre los MISMOS poligonos (polilineas
;;; cerradas) y usa EXACTAMENTE el mismo criterio de calculo y redondeo que
;;; AREASPOL:
;;;   - superficie real  : (vla-get-Area obj)            (metros cuadrados)
;;;   - redondeo          : BS-RedondearArea (tabla de tramos *BS-TABLA*)
;;;
;;; Para cada poligono compara la superficie real con la superficie que se
;;; considera tras el redondeo:
;;;       diferencia = superficie redondeada - superficie real
;;;
;;;   - Si el redondeo hace PERDER superficie (redondeada < real):
;;;        * pone el poligono en color ROJO
;;;        * inserta en el centro una etiqueta ROJA con los m2 perdidos.
;;;   - Si el redondeo hace GANAR superficie (redondeada > real):
;;;        * pone el poligono en color VERDE
;;;        * inserta en el centro una etiqueta VERDE con los m2 ganados.
;;;   - Si no hay diferencia apreciable: no cambia color ni anade etiqueta.
;;;
;;; La etiqueta muestra unicamente el valor (p.ej.  2,35 m2 ); el color (rojo
;;; o verde) indica si es perdida o ganancia. SOLO se modifica el color y se
;;; anade texto: NUNCA se toca la geometria de los poligonos.
;;;
;;; Al terminar dibuja una TABLA RESUMEN por tipo (tamano redondeado) con:
;;;       Tipo | N | Ganado(+) | Perdido(-) | Neto
;;; y una fila TOTAL. Ej.: en el tipo 8 -> Ganado +3,00 / Perdido -4,00 /
;;; Neto -1,00.
;;;
;;; Entorno: AutoCAD (Visual LISP / ActiveX), Model o Paper Space, igual que
;;; AREASPOL. Supone dibujo en METROS; ver la linea de MILIMETROS mas abajo.
;;;
;;; Este archivo es autonomo: si AREASPOL.lsp ya esta cargado, reutiliza sus
;;; funciones; si no, define aqui una COPIA EXACTA de la tabla y del redondeo
;;; para que el criterio sea identico.
;;; ==========================================================================

;;; --------------------------------------------------------------------------
;;; Redondeo compartido con AREASPOL.
;;;   Solo se define si AREASPOL.lsp no lo ha definido ya, de modo que el
;;;   criterio de redondeo sea SIEMPRE el mismo en ambos comandos.
;;; --------------------------------------------------------------------------
(if (null *BS-TABLA-DEFAULT*)
  (setq *BS-TABLA-DEFAULT*
    '((0.85  . 0.0)
      (1.25  . 1.0)
      (1.75  . 1.5)
      (2.25  . 2.0)
      (2.75  . 2.5)
      (3.25  . 3.0)
      (3.75  . 3.5)
      (4.40  . 4.0)
      (4.60  . 4.5)
      (5.40  . 5.0)
      (6.50  . 6.0)
      (7.50  . 7.0)
      (8.50  . 8.0)
      (9.50  . 9.0)
      (11.50 . 10.0)
      (13.50 . 12.0)
      (16.50 . 15.0)
      (19.50 . 18.0)
      (22.00 . 21.0)
      (1.0e9 . 25.0)
    )
  )
)

(if (null BS-GetTabla)
  (defun BS-GetTabla ()
    (if *BS-TABLA* *BS-TABLA* *BS-TABLA-DEFAULT*)
  )
)

(if (null BS-MaxPar)
  (defun BS-MaxPar (tab / m)
    (foreach par tab (if (or (null m) (> (car par) (car m))) (setq m par)))
    m
  )
)

;; Redondeo: devuelve la etiqueta segun la tabla activa (el par con el menor
;; limite que cumpla  area <= limite).  Identico al de AREASPOL.
(if (null BS-RedondearArea)
  (defun BS-RedondearArea (area / best)
    (foreach par (BS-GetTabla)
      (if (<= area (car par))
        (if (or (null best) (< (car par) (car best)))
          (setq best par)
        )
      )
    )
    (if best (cdr best) (cdr (BS-MaxPar (BS-GetTabla))))
  )
)

;; Formato del tamano/tipo: entero sin decimal (8), medio con un decimal (4.5).
(if (null BS-FormatoArea)
  (defun BS-FormatoArea (area)
    (if (= area (fix area))
      (rtos area 2 0)
      (rtos area 2 1)
    )
  )
)

;;; --------------------------------------------------------------------------
;;; Utilidades de formato/numeros (propias de este comando).
;;; --------------------------------------------------------------------------

;; Redondea un valor (positivo o negativo) a 2 decimales, media hacia arriba.
(defun BS-Redondear2 (v)
  (if (< v 0.0)
    (- (/ (fix (+ 0.5 (* (- v) 100.0))) 100.0))
    (/ (fix (+ 0.5 (* v 100.0))) 100.0)
  )
)

;; Valor absoluto con 2 decimales y COMA como separador decimal. Ej: 2.35 -> "2,35"
(defun BS-FormatoPerdida (valor)
  (vl-string-subst "," "." (rtos (abs valor) 2 2))
)

;; Valor con signo explicito para la tabla:  +2,35  /  -4,00  /  0,00
(defun BS-FmtSigno (v)
  (cond
    ((> v 0.0) (strcat "+" (BS-FormatoPerdida v)))
    ((< v 0.0) (strcat "-" (BS-FormatoPerdida v)))
    (T         (BS-FormatoPerdida 0.0))
  )
)

;; Fusion de celdas / ancho de columna protegidos (por si AREASPOL no esta).
(if (null BS-Merge)
  (defun BS-Merge (tabla r1 r2 c1 c2)
    (vl-catch-all-apply 'vla-MergeCells (list tabla r1 r2 c1 c2))
  )
)
(if (null BS-SetCW)
  (defun BS-SetCW (tabla i w)
    (vl-catch-all-apply 'vla-SetColumnWidth (list tabla i w))
  )
)

;;; --------------------------------------------------------------------------
;;; Acumulador por tipo (tamano redondeado).
;;;   acc = lista de entradas (tipo cnt ganado perdido)
;;;     ganado  >= 0  (suma de diferencias positivas)
;;;     perdido <= 0  (suma de diferencias negativas)
;;; --------------------------------------------------------------------------
(defun BS-AccAdd (acc tipo dcnt dgan dper / cur)
  (setq cur (cdr (assoc tipo acc)))
  (if cur
    (subst
      (cons tipo (list (+ (car cur)   dcnt)
                       (+ (cadr cur)  dgan)
                       (+ (caddr cur) dper)))
      (assoc tipo acc)
      acc
    )
    (cons (cons tipo (list dcnt dgan dper)) acc)
  )
)

;;; --------------------------------------------------------------------------
;;; Dibuja la tabla resumen de ganancias/perdidas por tipo.
;;;   datos = lista ordenada de (tipo cnt ganado perdido)
;;; --------------------------------------------------------------------------
(defun BS-DibujarTablaDif (espacio datos altura
                           / pt nfilas tabla r e tipo cnt gan per net
                             tCnt tGan tPer)
  (setq pt (getpoint "\nIndica el punto de insercion de la tabla resumen: "))
  (if (null pt)
    (princ "\nNo se indico punto: no se dibujo la tabla resumen.")
    (progn
      (setq nfilas (+ (length datos) 3))   ; titulo + cabecera + datos + TOTAL
      (setq tabla
        (vla-AddTable espacio (vlax-3d-point pt) nfilas 5
                      (* altura 2.0) (* altura 8.0)))
      (vl-catch-all-apply 'vla-SetTextHeight (list tabla 7 altura))

      ;; Anchos de columna
      (BS-SetCW tabla 0 (* altura 7.0))    ; Tipo
      (BS-SetCW tabla 1 (* altura 5.0))    ; N
      (BS-SetCW tabla 2 (* altura 8.0))    ; Ganado +
      (BS-SetCW tabla 3 (* altura 8.0))    ; Perdido -
      (BS-SetCW tabla 4 (* altura 8.0))    ; Neto

      ;; Titulo
      (BS-Merge tabla 0 0 0 4)
      (vla-SetText tabla 0 0 "GANANCIAS / PERDIDAS POR REDONDEO (m2)")

      ;; Cabecera
      (vla-SetText tabla 1 0 "Tipo")
      (vla-SetText tabla 1 1 "N")
      (vla-SetText tabla 1 2 "Ganado +")
      (vla-SetText tabla 1 3 "Perdido -")
      (vla-SetText tabla 1 4 "Neto")

      ;; Filas de datos
      (setq r 2 tCnt 0 tGan 0.0 tPer 0.0)
      (foreach e datos
        (setq tipo (car e)
              cnt  (cadr e)
              gan  (caddr e)
              per  (cadddr e)
              net  (+ gan per))
        (vla-SetText tabla r 0 (BS-FormatoArea tipo))
        (vla-SetText tabla r 1 (itoa cnt))
        (vla-SetText tabla r 2 (BS-FmtSigno gan))
        (vla-SetText tabla r 3 (BS-FmtSigno per))
        (vla-SetText tabla r 4 (BS-FmtSigno net))
        (setq tCnt (+ tCnt cnt)
              tGan (+ tGan gan)
              tPer (+ tPer per))
        (setq r (1+ r)))

      ;; Fila TOTAL
      (vla-SetText tabla r 0 "TOTAL")
      (vla-SetText tabla r 1 (itoa tCnt))
      (vla-SetText tabla r 2 (BS-FmtSigno tGan))
      (vla-SetText tabla r 3 (BS-FmtSigno tPer))
      (vla-SetText tabla r 4 (BS-FmtSigno (+ tGan tPer)))

      (princ (strcat "\nTabla resumen creada. Neto total: "
                     (BS-FmtSigno (+ tGan tPer)) " m2."))
    )
  )
)

;;; --------------------------------------------------------------------------
;;; Comando principal: marca ganancias (verde) y perdidas (rojo) por redondeo
;;; y genera la tabla resumen por tipo.
;;; --------------------------------------------------------------------------
(defun c:AREASPOL-PERD
  (/ doc espacio altura ss i n-total obj
     area-real vr delta delta2 col mag
     minPt maxPt centro etiqueta texto
     acc n-rojos n-verdes)

  (vl-load-com)

  (setq doc (vla-get-ActiveDocument (vlax-get-acad-object)))
  (setq espacio
    (if (= 1 (getvar "CVPORT"))
      (vla-get-PaperSpace doc)
      (vla-get-ModelSpace doc)
    )
  )

  ;; Mismo criterio de redondeo que AREASPOL.
  ;;   Si AREASPOL.lsp esta cargado, se ofrece Estandar/Editar/Ultimo (igual que
  ;;   el comando original). Si no, se usa la tabla estandar por defecto.
  (if BS-ElegirRedondeos
    (BS-ElegirRedondeos)
    (progn
      (if (null *BS-TABLA*) (setq *BS-TABLA* *BS-TABLA-DEFAULT*))
      (princ "\nUsando los redondeos estandar.")
    )
  )

  ;; Altura del texto de las etiquetas (igual que AREASPOL).
  (setq altura (getdist "\nIndica la altura del texto de las etiquetas <0.25>: "))
  (if (null altura) (setq altura 0.25))

  ;; Seleccion de polilineas cerradas: LOS MISMOS poligonos que AREASPOL.
  (princ "\nSelecciona las polilineas cerradas a analizar: ")
  (setq ss (ssget (list '(0 . "LWPOLYLINE") '(-4 . "&") '(70 . 1))))
  (if (null ss)
    (progn (princ "\nNada seleccionado. Comando cancelado.") (exit))
  )

  (setq i 0 acc nil n-rojos 0 n-verdes 0 n-total (sslength ss))
  (repeat n-total
    (setq obj (vlax-ename->vla-object (ssname ss i)))

    ;; Superficie real (mismas unidades que AREASPOL).
    (setq area-real (vla-get-Area obj))
    ;; --- Si el dibujo esta en MILIMETROS, descomenta la linea siguiente: ---
    ;; (setq area-real (/ (vla-get-Area obj) 1000000.0))

    ;; Superficie considerada tras el redondeo (mismo criterio que AREASPOL).
    (setq vr (BS-RedondearArea area-real))

    ;; diferencia = superficie redondeada - superficie real
    ;;   > 0  -> el redondeo GANA superficie (verde)
    ;;   < 0  -> el redondeo PIERDE superficie (rojo)
    (setq delta  (- vr area-real))
    (setq delta2 (BS-Redondear2 delta))

    ;; Acumular para la tabla por tipo.
    (setq acc
      (BS-AccAdd acc vr 1
        (if (> delta2 0.0) delta2 0.0)      ; ganado (positivo)
        (if (< delta2 0.0) delta2 0.0)))    ; perdido (negativo)

    ;; Decidir color/etiqueta segun el signo de la diferencia.
    (cond
      ((> delta2 0.0) (setq col 3 mag delta2       n-verdes (1+ n-verdes)))  ; verde
      ((< delta2 0.0) (setq col 1 mag (- delta2)   n-rojos  (1+ n-rojos)))   ; rojo
      (T              (setq col nil))
    )

    (if col
      (progn
        ;; Color del poligono (SOLO color: no se toca la geometria).
        (vl-catch-all-apply 'vla-put-Color (list obj col))

        ;; Centro aproximado (caja envolvente), igual que AREASPOL.
        (vla-GetBoundingBox obj 'minPt 'maxPt)
        (setq minPt (vlax-safearray->list minPt))
        (setq maxPt (vlax-safearray->list maxPt))
        (setq centro
          (vlax-3d-point
            (list
              (/ (+ (car minPt) (car maxPt)) 2.0)
              (/ (+ (cadr minPt) (cadr maxPt)) 2.0)
              0.0
            )
          )
        )

        ;; Etiqueta: SOLO el valor + unidad, coma decimal, en el mismo color.
        ;;   (chr 178) es el "2" en superindice de "m2". Si tu estilo de texto
        ;;   no lo dibuja, cambia (chr 178) por "2".
        (setq etiqueta (strcat (BS-FormatoPerdida mag) " m" (chr 178)))
        (setq texto (vla-AddText espacio etiqueta centro altura))
        (vla-put-Alignment texto 10)              ; acAlignmentMiddleCenter
        (vla-put-TextAlignmentPoint texto centro)
        (vla-put-Color texto col)
      )
    )

    (setq i (1+ i))
  )

  (princ (strcat "\nPoligonos analizados: " (itoa n-total)
                 "  |  ganan (verde): " (itoa n-verdes)
                 "  |  pierden (rojo): " (itoa n-rojos)))

  ;; Tabla resumen por tipo (ordenada por tamano ascendente).
  (BS-DibujarTablaDif espacio
    (vl-sort acc '(lambda (a b) (< (car a) (car b))))
    altura)

  (princ)
)

(princ "\nComando AREASPOL-PERD cargado. Escribe AREASPOL-PERD para ejecutarlo.")
(princ "\n(Recomendado cargarlo junto a AREASPOL.lsp para compartir la config. de redondeos.)")
(princ)
