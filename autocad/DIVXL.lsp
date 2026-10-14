;;; ------------------------------------------------------------------------
;;; DIVXL.lsp
;;;
;;; Comando DIVXL
;;;   Divide una LINEA en tramos iguales de longitud no inferior a la minima
;;;   (1.2 por defecto) y dibuja una XLINEA (linea auxiliar infinita)
;;;   perpendicular a la linea original en cada punto de division.
;;;
;;;   Empieza mostrando una vista previa con el maximo numero de tramos
;;;     n maximo = parte entera de (longitud / longitud minima)
;;;   y con el teclado se va viendo como quedaria con un tramo menos, dos
;;;   menos, etc., hasta elegir la division definitiva:
;;;
;;;     -                      un tramo menos
;;;     +                      un tramo mas
;;;     Intro, Espacio o clic  aceptar (las XLINEAs quedan definitivas)
;;;     Esc                    cancelar (se borra la vista previa)
;;;
;;;   Al llegar a 2 tramos, "-" vuelve al maximo (y "+" al reves), asi que
;;;   se pueden recorrer todas las opciones pulsando siempre la misma tecla.
;;;
;;;   Nota: AutoCAD no pasa las flechas del teclado a los programas LISP,
;;;   por eso se usan + y - (las del teclado numerico estan junto a las
;;;   flechas).
;;;
;;;   Ejemplo: linea de 10 y minimo 1.2 -> empieza en 8 tramos de 1.25
;;;   (7 XLINEAs); con "-" pasa a 7 tramos de 1.429, 6 de 1.667, ...
;;;
;;; Uso
;;;   1. Cargar con APPLOAD (o arrastrar el archivo a la ventana de dibujo).
;;;   2. Escribir DIVXL y designar la linea.
;;;      - Escribir L para cambiar la longitud minima de tramo.
;;;      - Se pueden designar varias lineas seguidas; INTRO para terminar.
;;;   La vista previa se dibuja en rojo; al aceptar, las XLINEAs pasan a
;;;   color PorCapa en la capa actual. Todo el comando se deshace con un
;;;   solo H (U).
;;; ------------------------------------------------------------------------

(vl-load-com)

;; Longitud minima de tramo por defecto (se recuerda durante la sesion)
(if (not *divxl-lmin*) (setq *divxl-lmin* 1.2))

;; Color de la vista previa (1 = rojo)
(setq *divxl-color-previa* 1)

;; XLINEAs de la vista previa en curso
(setq *divxl-previa* nil)

;; Producto vectorial a x b
(defun divxl-cross (a b)
  (list (- (* (cadr a) (caddr b)) (* (caddr a) (cadr b)))
        (- (* (caddr a) (car b)) (* (car a) (caddr b)))
        (- (* (car a) (cadr b)) (* (cadr a) (car b)))))

;; Vector unitario (nil si el vector es nulo)
(defun divxl-unit (v / d)
  (setq d (distance '(0.0 0.0 0.0) v))
  (if (> d 1e-12) (mapcar '(lambda (x) (/ x d)) v)))

;; Crea las N-1 XLINEAs de color COL que dividen en N tramos el segmento
;; que parte de P1 con vector V. Devuelve la lista de entidades creadas.
(defun divxl-crea (p1 v perp n col / i lst)
  (setq i 1)
  (while (< i n)
    (entmake (list '(0 . "XLINE")
                   '(100 . "AcDbEntity")
                   (cons 62 col)
                   '(100 . "AcDbXline")
                   (cons 10 (mapcar '(lambda (a d) (+ a (* d (/ (float i) n))))
                                    p1 v))
                   (cons 11 perp)))
    (setq lst (cons (entlast) lst)
          i   (1+ i)))
  lst)

;; Borra la vista previa en curso
(defun divxl-borra ()
  (foreach e *divxl-previa* (if (entget e) (entdel e)))
  (setq *divxl-previa* nil))

;; Sustituye la vista previa por la division en N tramos
(defun divxl-muestra (p1 v perp n nmax len)
  (divxl-borra)
  (setq *divxl-previa* (divxl-crea p1 v perp n *divxl-color-previa*))
  (princ (strcat "\n  " (itoa n) " tramos de " (rtos (/ len n) 2 3)
                 " (" (itoa (1- n)) " XLINEAs)"
                 (if (= n nmax) "  <maximo>" ""))))

;; Vista previa interactiva sobre la linea ENT con tramos de al menos LMIN.
;; Deja dibujadas las XLINEAs de la division que se acepte.
(defun divxl-elige (ent lmin / ed p1 v len nmax n perp ayuda gr k c fin)
  (setq ed    (entget ent)
        p1    (cdr (assoc 10 ed))
        v     (mapcar '- (cdr (assoc 11 ed)) p1)
        len   (distance '(0.0 0.0 0.0) v)
        ;; pequena tolerancia para que p.ej. 3.6 / 1.2 de 3 tramos y no 2
        nmax  (fix (+ (/ len lmin) 1e-8))
        ;; perpendicular a la linea dentro del plano del SCP actual
        perp  (divxl-unit (divxl-cross (trans '(0.0 0.0 1.0) 1 0 t) v))
        ayuda (strcat "\n[-] un tramo menos  [+] un tramo mas"
                      "  [Intro/Espacio/clic] aceptar  [Esc] cancelar"))
  (cond
    ((< nmax 2)
     (princ (strcat "\nLa linea mide " (rtos len 2 3)
                    ": no se puede dividir en tramos de al menos "
                    (rtos lmin 2 3) ".")))
    ((null perp)
     (princ "\nLa linea es perpendicular al plano del SCP actual."))
    (t
     (princ (strcat "\nLongitud de la linea: " (rtos len 2 3) ayuda))
     (setq n nmax)
     (divxl-muestra p1 v perp n nmax len)
     (while (not fin)
       (setq gr (grread nil 2)
             k  (car gr)
             c  (cadr gr))
       (cond
         ;; - : un tramo menos (desde 2 vuelve al maximo)
         ((and (= k 2) (member c '(45 95)))
          (setq n (if (> n 2) (1- n) nmax))
          (divxl-muestra p1 v perp n nmax len))
         ;; + : un tramo mas (desde el maximo vuelve a 2)
         ((and (= k 2) (member c '(43 61)))
          (setq n (if (< n nmax) (1+ n) 2))
          (divxl-muestra p1 v perp n nmax len))
         ;; Esc: cancelar (el gestor de errores borra la vista previa)
         ((and (= k 2) (= c 27))
          (exit))
         ;; Intro, Espacio o clic: la vista previa pasa a definitiva
         ((or (and (= k 2) (member c '(13 32))) (member k '(3 11 25)))
          (foreach e *divxl-previa*
            (setq ed (entget e))
            (entmod (subst '(62 . 256) (assoc 62 ed) ed)))
          (setq *divxl-previa* nil
                fin            t)
          (princ (strcat "\nAceptado: " (itoa n) " tramos de "
                         (rtos (/ len n) 2 3) ", "
                         (itoa (1- n)) " XLINEAs creadas.")))
         ;; otra tecla: recordar las opciones
         ((= k 2)
          (princ ayuda)))))))

(defun c:DIVXL (/ *error* doc sel ent lmin)
  (setq doc (vla-get-ActiveDocument (vlax-get-acad-object)))
  (defun *error* (msg)
    (divxl-borra)
    (vla-EndUndoMark doc)
    (if (not (wcmatch (strcase msg)
                      "*CANCEL*,*QUIT*,*EXIT*,*SALIR*,*ABANDON*"))
      (princ (strcat "\nError: " msg)))
    (princ))
  (setq *divxl-previa* nil)
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
      (t (divxl-elige ent *divxl-lmin*))))
  (vla-EndUndoMark doc)
  (princ))

(princ "\nDIVXL cargado. Escriba DIVXL para dividir una linea con XLINEAs.")
(princ)
