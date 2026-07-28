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
;;; Para cada poligono:
;;;   1. Calcula la perdida de superficie provocada por el redondeo:
;;;         m2 perdidos = superficie real - superficie considerada tras redondeo
;;;   2. Si hay PERDIDA (valor positivo):
;;;         - pone el poligono en color ROJO (SOLO color; no toca la geometria)
;;;         - inserta una etiqueta en el centro con los m2 perdidos, en ROJO,
;;;           mostrando unicamente el valor (p.ej.  2,35 m2 ).
;;;   3. Si NO hay perdida: no cambia el color ni anade etiqueta.
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

;;; --------------------------------------------------------------------------
;;; Redondea un valor a 2 decimales (media hacia arriba).
;;; --------------------------------------------------------------------------
(defun BS-Redondear2 (v)
  (/ (fix (+ 0.5 (* v 100.0))) 100.0)
)

;;; --------------------------------------------------------------------------
;;; Formato del valor perdido: 2 decimales y COMA como separador decimal.
;;;   Ej.: 2.35 -> "2,35"
;;; --------------------------------------------------------------------------
(defun BS-FormatoPerdida (valor)
  (vl-string-subst "," "." (rtos valor 2 2))
)

;;; --------------------------------------------------------------------------
;;; Comando principal: marca las perdidas de superficie por redondeo.
;;; --------------------------------------------------------------------------
(defun c:AREASPOL-PERD
  (/ doc espacio altura ss i n-total n-rojos obj
     area-real vr perdida perdida2 minPt maxPt centro etiqueta texto)

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

  (setq i 0 n-rojos 0 n-total (sslength ss))
  (repeat n-total
    (setq obj (vlax-ename->vla-object (ssname ss i)))

    ;; Superficie real (mismas unidades que AREASPOL).
    (setq area-real (vla-get-Area obj))
    ;; --- Si el dibujo esta en MILIMETROS, descomenta la linea siguiente: ---
    ;; (setq area-real (/ (vla-get-Area obj) 1000000.0))

    ;; Superficie considerada tras el redondeo (mismo criterio que AREASPOL).
    (setq vr (BS-RedondearArea area-real))

    ;; m2 perdidos = superficie real - superficie considerada tras redondeo.
    (setq perdida  (- area-real vr))
    (setq perdida2 (BS-Redondear2 perdida))

    (if (> perdida2 0.0)            ; solo cuando el redondeo provoca PERDIDA
      (progn
        (setq n-rojos (1+ n-rojos))

        ;; 1) Poligono a ROJO (color 1). SOLO color: no se toca la geometria.
        (vl-catch-all-apply 'vla-put-Color (list obj 1))

        ;; 2) Centro aproximado (caja envolvente), igual que AREASPOL.
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

        ;; 3) Etiqueta: SOLO el valor + unidad, coma decimal y texto en ROJO.
        ;;    (chr 178) es el simbolo "2" en superindice de "m2". Si tu estilo
        ;;    de texto no lo dibuja, cambia (chr 178) por "2".
        (setq etiqueta (strcat (BS-FormatoPerdida perdida2) " m" (chr 178)))
        (setq texto (vla-AddText espacio etiqueta centro altura))
        (vla-put-Alignment texto 10)              ; acAlignmentMiddleCenter
        (vla-put-TextAlignmentPoint texto centro)
        (vla-put-Color texto 1)                   ; texto en ROJO
      )
    )

    (setq i (1+ i))
  )

  (princ (strcat "\nPoligonos analizados: " (itoa n-total)
                 "  |  con perdida por redondeo (en rojo): " (itoa n-rojos)))
  (princ)
)

(princ "\nComando AREASPOL-PERD cargado. Escribe AREASPOL-PERD para ejecutarlo.")
(princ "\n(Recomendado cargarlo junto a AREASPOL.lsp para compartir la config. de redondeos.)")
(princ)
