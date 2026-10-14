;;; ------------------------------------------------------------------------
;;; DIVXL.lsp
;;;
;;; Comando DIVXL
;;;   Divide una LINEA en el maximo numero posible de tramos iguales cuya
;;;   longitud no sea inferior a la minima (1.2 por defecto) y dibuja una
;;;   XLINEA (linea auxiliar infinita) perpendicular a la linea original en
;;;   cada punto de division.
;;;
;;;   Numero de tramos   n = parte entera de (longitud / longitud minima)
;;;   Longitud de tramo    = longitud / n   (siempre >= longitud minima)
;;;   XLINEAs creadas      = n - 1          (solo en los puntos interiores)
;;;
;;;   Ejemplo: linea de 10 y minimo 1.2 -> 8 tramos de 1.25 -> 7 XLINEAs.
;;;
;;; Uso
;;;   1. Cargar con APPLOAD (o arrastrar el archivo a la ventana de dibujo).
;;;   2. Escribir DIVXL y designar la linea.
;;;      - Escribir L para cambiar la longitud minima de tramo.
;;;      - Se pueden designar varias lineas seguidas; INTRO para terminar.
;;;   Las XLINEAs se crean en la capa actual. Todo el comando se deshace
;;;   con un solo H (U).
;;; ------------------------------------------------------------------------

(vl-load-com)

;; Longitud minima de tramo por defecto (se recuerda durante la sesion)
(if (not *divxl-lmin*) (setq *divxl-lmin* 1.2))

;; Producto vectorial a x b
(defun divxl-cross (a b)
  (list (- (* (cadr a) (caddr b)) (* (caddr a) (cadr b)))
        (- (* (caddr a) (car b)) (* (car a) (caddr b)))
        (- (* (car a) (cadr b)) (* (cadr a) (car b)))))

;; Vector unitario (nil si el vector es nulo)
(defun divxl-unit (v / d)
  (setq d (distance '(0.0 0.0 0.0) v))
  (if (> d 1e-12) (mapcar '(lambda (x) (/ x d)) v)))

;; Divide la linea ENT en tramos de al menos LMIN y crea las XLINEAs.
;; Devuelve el numero de XLINEAs creadas.
(defun divxl-procesa (ent lmin / ed p1 p2 v len n perp i pt)
  (setq ed   (entget ent)
        p1   (cdr (assoc 10 ed))
        p2   (cdr (assoc 11 ed))
        v    (mapcar '- p2 p1)
        len  (distance p1 p2)
        ;; pequena tolerancia para que p.ej. 3.6 / 1.2 de 3 tramos y no 2
        n    (fix (+ (/ len lmin) 1e-8))
        ;; perpendicular a la linea dentro del plano del SCP actual
        perp (divxl-unit (divxl-cross (trans '(0.0 0.0 1.0) 1 0 t) v)))
  (cond
    ((< n 2)
     (princ (strcat "\nLa linea mide " (rtos len 2 3)
                    ": no se puede dividir en tramos de al menos "
                    (rtos lmin 2 3) "."))
     0)
    ((null perp)
     (princ "\nLa linea es perpendicular al plano del SCP actual.")
     0)
    (t
     (setq i 1)
     (while (< i n)
       (setq pt (mapcar '(lambda (a d) (+ a (* d (/ (float i) n)))) p1 v))
       (entmake (list '(0 . "XLINE")
                      '(100 . "AcDbEntity")
                      '(100 . "AcDbXline")
                      (cons 10 pt)
                      (cons 11 perp)))
       (setq i (1+ i)))
     (princ (strcat "\nLongitud " (rtos len 2 3)
                    " -> " (itoa n) " tramos de " (rtos (/ len n) 2 3)
                    ", " (itoa (1- n)) " XLINEAs creadas."))
     (1- n))))

(defun c:DIVXL (/ *error* doc sel ent lmin)
  (setq doc (vla-get-ActiveDocument (vlax-get-acad-object)))
  (defun *error* (msg)
    (vla-EndUndoMark doc)
    (if (not (wcmatch (strcase msg) "*CANCEL*,*QUIT*,*EXIT*"))
      (princ (strcat "\nError: " msg)))
    (princ))
  (vla-StartUndoMark doc)
  (princ (strcat "\nLongitud minima de tramo = " (rtos *divxl-lmin* 2 3)))
  (setq sel t)
  (while sel
    (setvar "ERRNO" 0)
    (initget "Longitud")
    (setq sel (entsel "\nDesigne linea a dividir o [Longitud] <salir>: "))
    (cond
      ;; cambiar la longitud minima
      ((= sel "Longitud")
       (initget 6)
       (if (setq lmin (getdist (strcat "\nLongitud minima de tramo <"
                                       (rtos *divxl-lmin* 2 3) ">: ")))
         (setq *divxl-lmin* lmin))
       (princ (strcat "\nLongitud minima de tramo = " (rtos *divxl-lmin* 2 3))))
      ;; clic en vacio: volver a preguntar; INTRO: salir
      ((null sel)
       (if (= (getvar "ERRNO") 7)
         (progn
           (princ "\nNo se ha designado ningun objeto.")
           (setq sel t))))
      ((/= (cdr (assoc 0 (entget (setq ent (car sel))))) "LINE")
       (princ "\nEl objeto designado no es una LINEA."))
      (t (divxl-procesa ent *divxl-lmin*))))
  (vla-EndUndoMark doc)
  (princ))

(princ "\nDIVXL cargado. Escriba DIVXL para dividir una linea con XLINEAs.")
(princ)
