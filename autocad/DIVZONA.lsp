;;; ==========================================================================
;;; DIVZONA.LSP  -  Divide una zona cerrada en rectangulos
;;; --------------------------------------------------------------------------
;;; Funciona como el comando CONTORNO (BOUNDARY): se designa un punto dentro
;;; de una zona cerrada, el comando calcula su contorno, toma el lado mas
;;; largo y divide la zona en franjas perpendiculares a ese lado.
;;;
;;; Cada rectangulo mide, sobre el lado mas largo, como minimo el ancho
;;; indicado (1.2 m por defecto) y se crea el mayor numero posible de
;;; rectangulos iguales:
;;;
;;;     n     = parte entera (lado mayor / ancho minimo)
;;;     ancho = lado mayor / n        (siempre >= ancho minimo)
;;;
;;; Ejemplo: lado mayor 6.50, minimo 1.20  ->  5 rectangulos de 1.30
;;;
;;; Uso:
;;;   1. CARGAAP (APPLOAD) y cargar este archivo.
;;;   2. Escribir DIVZONA.
;;;   3. Designar un punto interno de la zona (como en CONTORNO).
;;;      Opciones:  M = cambiar el ancho minimo
;;;                 S = seleccionar una polilinea cerrada ya dibujada
;;;   4. Se pueden designar varias zonas seguidas; INTRO para terminar.
;;;
;;; Unidades: el ancho minimo va en unidades de dibujo. Por defecto vale
;;; 1200 si INSUNITS = milimetros, 120 si = centimetros y 1.2 en otro caso.
;;;
;;; Los rectangulos se crean como polilineas cerradas en la capa actual y el
;;; contorno auxiliar se borra. Todo el comando se deshace de una vez.
;;; ==========================================================================

;;; --------------------------------------------------------------------------
;;; Geometria 2D (no toca el dibujo)
;;; --------------------------------------------------------------------------

(defun dz:2d (p) (list (car p) (cadr p)))
(defun dz:sub (a b) (list (- (car a) (car b)) (- (cadr a) (cadr b))))
(defun dz:dot (a b) (+ (* (car a) (car b)) (* (cadr a) (cadr b))))
(defun dz:cross (a b) (- (* (car a) (cadr b)) (* (cadr a) (car b))))
(defun dz:len (a) (sqrt (dz:dot a a)))

;; Lados (p q) de un poligono cerrado
(defun dz:lados (pts)
  (mapcar 'list pts (append (cdr pts) (list (car pts))))
)

;; Lista sin el elemento de posicion i
(defun dz:quitar (i lst / j res)
  (setq j -1)
  (foreach x lst
    (if (/= (setq j (1+ j)) i) (setq res (cons x res)))
  )
  (reverse res)
)

;; Quita vertices repetidos y vertices alineados. CONTORNO anade un vertice
;; donde otra linea toca un lado, y eso partiria el lado mayor en dos.
(defun dz:limpiar (pts tol / res n i a b seguir)
  (foreach p pts
    (if (or (null res) (> (distance (dz:2d p) (car res)) tol))
      (setq res (cons (dz:2d p) res))
    )
  )
  (setq res (reverse res))
  (while (and (> (length res) 2) (<= (distance (car res) (last res)) tol))
    (setq res (reverse (cdr (reverse res))))
  )
  (setq seguir T)
  (while (and seguir (> (length res) 3))
    (setq seguir nil
          n      (length res)
          i      0
    )
    (while (and (not seguir) (< i n))
      (setq a (dz:sub (nth i res) (nth (rem (+ i n -1) n) res))
            b (dz:sub (nth (rem (1+ i) n) res) (nth i res))
      )
      (if (<= (abs (dz:cross a b)) (* 1e-4 (dz:len a) (dz:len b)))
        (setq res    (dz:quitar i res)
              seguir T
        )
        (setq i (1+ i))
      )
    )
  )
  res
)

;; Area con signo (formula del lazo)
(defun dz:area (pts / a)
  (setq a 0.0)
  (foreach l (dz:lados pts)
    (setq a (+ a (dz:cross (car l) (cadr l))))
  )
  (/ a 2.0)
)

;; Diagonal de la caja que envuelve los puntos (escala de la zona)
(defun dz:diagonal (pts)
  (distance
    (list (apply 'min (mapcar 'car pts)) (apply 'min (mapcar 'cadr pts)))
    (list (apply 'max (mapcar 'car pts)) (apply 'max (mapcar 'cadr pts)))
  )
)

;; Lado mas largo: (p q)
(defun dz:lado-mayor (pts / dmax res d)
  (setq dmax -1.0)
  (foreach l (dz:lados pts)
    (if (> (setq d (distance (car l) (cadr l))) dmax)
      (setq dmax d
            res  l
      )
    )
  )
  res
)

;; T si el poligono es un rectangulo (4 vertices y 4 angulos rectos)
(defun dz:rectangulo-p (pts / ok i a b)
  (if (= (length pts) 4)
    (progn
      (setq ok T
            i  0
      )
      (repeat 4
        (setq a (dz:sub (nth (rem (1+ i) 4) pts) (nth i pts))
              b (dz:sub (nth (rem (+ i 2) 4) pts) (nth (rem (1+ i) 4) pts))
        )
        (if (> (abs (dz:dot a b)) (* 1e-4 (dz:len a) (dz:len b)))
          (setq ok nil)
        )
        (setq i (1+ i))
      )
      ok
    )
  )
)

;; Coordenadas locales: eje u a lo largo del lado mayor, eje v perpendicular
(defun dz:local (p o ang / v)
  (setq v (dz:sub p o))
  (list (+ (* (car v) (cos ang)) (* (cadr v) (sin ang)))
        (- (* (cadr v) (cos ang)) (* (car v) (sin ang)))
  )
)

(defun dz:global (p o ang)
  (list (+ (car o) (* (car p) (cos ang)) (- (* (cadr p) (sin ang))))
        (+ (cadr o) (* (car p) (sin ang)) (* (cadr p) (cos ang)))
  )
)

;; Recorta un poligono (coordenadas locales) por la recta u = c y conserva la
;; parte en la que k * (u - c) >= 0  (k = 1 o k = -1). Sutherland-Hodgman.
(defun dz:recortar (pts c k / res p q fp fq)
  (foreach l (dz:lados pts)
    (setq p  (car l)
          q  (cadr l)
          fp (* k (- (car p) c))
          fq (* k (- (car q) c))
    )
    (if (>= fp 0.0)
      (setq res (cons p res))
    )
    (if (< (* fp fq) 0.0)
      (setq res (cons (list c (+ (cadr p) (* (/ fp (- fp fq)) (- (cadr q) (cadr p)))))
                      res
                )
      )
    )
  )
  (reverse res)
)

;; T si toda recta perpendicular al lado mayor corta la zona en un solo tramo
;; (asi cada franja es una unica pieza). Rectangulos, trapecios, formas en L
;; con el lado largo abajo, etc. cumplen; una U tumbada no.
(defun dz:monotona-p (loc tol / signos ant cambios du)
  (foreach l (dz:lados loc)
    (setq du (- (car (cadr l)) (car (car l))))
    (cond ((> du tol) (setq signos (cons 1 signos)))
          ((< du (- tol)) (setq signos (cons -1 signos)))
    )
  )
  (setq cambios 0
        ant     (last signos)
  )
  (foreach sg signos
    (if (/= sg ant) (setq cambios (1+ cambios)))
    (setq ant sg)
  )
  (<= cambios 2)
)

;; Divide la zona. Devuelve
;;   (estado n ancho largo fondo rectangular piezas)
;; estado: "OK", "PEQUENA", "COMPLEJA", "DEMASIADAS" o "INVALIDA".
;; Las piezas vienen en las mismas coordenadas que pts.
(defun dz:dividir (pts dmin / tol lado o ang loc vs umin umax largo fondo
                   rect n ancho k u0 u1 pieza piezas)
  (setq tol (* 1e-6 (dz:diagonal pts))
        pts (dz:limpiar pts tol)
  )
  (if (or (< (length pts) 3) (<= (abs (dz:area pts)) (* tol tol)))
    (list "INVALIDA" 0 nil 0.0 0.0 nil nil)
    (progn
      (setq lado  (dz:lado-mayor pts)
            o     (car lado)
            ang   (angle (car lado) (cadr lado))
            loc   (mapcar '(lambda (p) (dz:local p o ang)) pts)
            vs    (mapcar 'cadr loc)
            umin  (apply 'min (mapcar 'car loc))
            umax  (apply 'max (mapcar 'car loc))
            largo (- umax umin)
            fondo (- (apply 'max vs) (apply 'min vs))
            rect  (dz:rectangulo-p pts)
      )
      (cond
        ((not (dz:monotona-p loc tol))
         (list "COMPLEJA" 0 nil largo fondo rect nil)
        )
        ((> (/ largo dmin) 10000.0)
         (list "DEMASIADAS" 0 nil largo fondo rect nil)
        )
        ((< (setq n (fix (+ (/ largo dmin) 1e-6))) 1)
         (list "PEQUENA" 0 nil largo fondo rect nil)
        )
        (T
         (setq ancho (/ largo n)
               k     0
         )
         (repeat n
           (setq u0    (+ umin (* k ancho))
                 u1    (if (= k (1- n)) umax (+ umin (* (1+ k) ancho)))
                 pieza (dz:limpiar (dz:recortar (dz:recortar loc u0 1) u1 -1) tol)
           )
           (if (and (>= (length pieza) 3) (> (abs (dz:area pieza)) (* tol tol)))
             (setq piezas (cons (mapcar '(lambda (p) (dz:global p o ang)) pieza)
                                piezas
                          )
             )
           )
           (setq k (1+ k))
         )
         (list "OK" n ancho largo fondo rect (reverse piezas))
        )
      )
    )
  )
)

;;; --------------------------------------------------------------------------
;;; Dibujo
;;; --------------------------------------------------------------------------

;; Numero sin ceros sobrantes: 1.300 -> "1.3", 1200.000 -> "1200"
(defun dz:num (x / s)
  (setq s (rtos x 2 3))
  (if (wcmatch s "*`.*")
    (progn
      (while (= (substr s (strlen s)) "0")
        (setq s (substr s 1 (1- (strlen s))))
      )
      (if (= (substr s (strlen s)) ".")
        (setq s (substr s 1 (1- (strlen s))))
      )
    )
  )
  s
)

(defun dz:minimo-defecto ()
  (cond (*divzona-min*)
        ((= (getvar "INSUNITS") 4) 1200.0)
        ((= (getvar "INSUNITS") 5) 120.0)
        (T 1.2)
  )
)

(defun dz:deshacer (opcion)
  (if (= 1 (logand 1 (getvar "UNDOCTL")))
    (if command-s
      (command-s "_.UNDO" opcion)
      (command "_.UNDO" opcion)
    )
  )
)

;; Vertices de una polilinea 2D:
;;   (vertices hay-arcos elevacion normal cerrada)
(defun dz:vertices (ent / ed e ev pts arcos elev)
  (setq ed (entget ent))
  (cond
    ((= (cdr (assoc 0 ed)) "LWPOLYLINE")
     (foreach x ed
       (cond ((= (car x) 10) (setq pts (cons (dz:2d (cdr x)) pts)))
             ((and (= (car x) 42) (/= (cdr x) 0.0)) (setq arcos T))
       )
     )
     (setq elev (cond ((cdr (assoc 38 ed))) (0.0)))
    )
    ((= (cdr (assoc 0 ed)) "POLYLINE")
     (setq e (entnext ent))
     (while (and e (= (cdr (assoc 0 (setq ev (entget e)))) "VERTEX"))
       (setq pts (cons (dz:2d (cdr (assoc 10 ev))) pts))
       (if (and (assoc 42 ev) (/= (cdr (assoc 42 ev)) 0.0))
         (setq arcos T)
       )
       (setq e (entnext e))
     )
     (setq elev (caddr (cdr (assoc 10 ed))))
    )
  )
  (setq pts (reverse pts))
  (list pts
        arcos
        elev
        (cond ((cdr (assoc 210 ed))) ('(0.0 0.0 1.0)))
        (or (= 1 (logand 1 (cond ((cdr (assoc 70 ed))) (0))))
            (and (> (length pts) 2) (equal (car pts) (last pts) 1e-8))
        )
  )
)

;; Ejecuta CONTORNO en el punto y devuelve la polilinea exterior creada.
;; Las islas interiores que CONTORNO pueda generar se borran.
(defun dz:contorno (pt / ultimo e nuevas mejor amax a)
  (setq ultimo (entlast))
  (command "_.-BOUNDARY" "_non" pt "")
  (while (> (getvar "CMDACTIVE") 0) (command ""))
  (setq e (if ultimo (entnext ultimo) (entnext)))
  (while e
    (if (not (member (cdr (assoc 0 (entget e))) '("VERTEX" "SEQEND")))
      (setq nuevas (cons e nuevas))
    )
    (setq e (entnext e))
  )
  (setq amax -1.0)
  (foreach x nuevas
    (if (and (member (cdr (assoc 0 (entget x))) '("LWPOLYLINE" "POLYLINE"))
             (> (setq a (abs (dz:area (car (dz:vertices x))))) amax)
        )
      (setq amax  a
            mejor x
      )
    )
  )
  (foreach x nuevas
    (if (not (eq x mejor)) (entdel x))
  )
  mejor
)

(defun dz:crear-pieza (pts elev nrm)
  (entmake
    (append
      (list '(0 . "LWPOLYLINE")
            '(100 . "AcDbEntity")
            (cons 8 (getvar "CLAYER"))
            '(100 . "AcDbPolyline")
            (cons 90 (length pts))
            '(70 . 1)
            (cons 38 elev)
      )
      (mapcar '(lambda (p) (cons 10 p)) pts)
      (list (cons 210 nrm))
    )
  )
)

;; Divide la polilinea ent. Si borrar es T (contorno auxiliar) se borra al final.
(defun dz:procesar (ent borrar dmin / ed info res)
  (setq ed (entget ent))
  (cond
    ((not (or (= (cdr (assoc 0 ed)) "LWPOLYLINE")
              (and (= (cdr (assoc 0 ed)) "POLYLINE")
                   (= 0 (logand 88 (cdr (assoc 70 ed))))
              )
          )
     )
     (princ "\nEl objeto no es una polilinea 2D.")
    )
    ((not (nth 4 (setq info (dz:vertices ent))))
     (princ "\nLa polilinea no esta cerrada.")
    )
    (T
     (if (cadr info)
       (princ "\nAviso: la zona tiene tramos curvos; se tratan como rectos.")
     )
     (setq res (dz:dividir (car info) dmin))
     (cond
       ((= (car res) "INVALIDA")
        (princ "\nLa zona no tiene area.")
       )
       ((= (car res) "COMPLEJA")
        (princ (strcat "\nForma demasiado compleja: una recta perpendicular al"
                       " lado mayor la corta en varios tramos."
                       " Divida la zona en partes mas sencillas."
               )
        )
       )
       ((= (car res) "DEMASIADAS")
        (princ (strcat "\nSaldrian mas de 10000 rectangulos (lado mayor "
                       (dz:num (nth 3 res)) ", minimo " (dz:num dmin)
                       "). Revise el ancho minimo y las unidades."
               )
        )
       )
       ((= (car res) "PEQUENA")
        (princ (strcat "\nEl lado mayor (" (dz:num (nth 3 res))
                       ") es menor que el ancho minimo (" (dz:num dmin)
                       "). No se divide."
               )
        )
       )
       (T
        (foreach p (nth 6 res)
          (dz:crear-pieza p (caddr info) (nth 3 info))
        )
        (if (nth 5 res)
          (princ (strcat "\nZona rectangular de " (dz:num (nth 3 res))
                         " x " (dz:num (nth 4 res)) " -> "
                         (itoa (nth 1 res)) " rectangulos de "
                         (dz:num (nth 2 res)) " x " (dz:num (nth 4 res))
                         " (minimo " (dz:num dmin) ")."
                 )
          )
          (princ (strcat "\nZona de " (dz:num (nth 3 res))
                         " (lado mayor) x " (dz:num (nth 4 res)) " -> "
                         (itoa (nth 1 res)) " piezas de " (dz:num (nth 2 res))
                         " de ancho (minimo " (dz:num dmin) ")."
                         "\nAviso: la zona no es rectangular, revise las piezas."
                 )
          )
        )
       )
     )
    )
  )
  (if borrar (entdel ent))
)

;;; --------------------------------------------------------------------------
;;; Comando
;;; --------------------------------------------------------------------------

(defun c:DIVZONA (/ *error* vars vals dmin opc d sel e seguir)
  (defun *error* (msg)
    (dz:deshacer "_End")
    (mapcar '(lambda (v x) (if x (setvar v x))) vars vals)
    (if (and msg (not (wcmatch (strcase msg) "*CANCEL*,*QUIT*,*EXIT*,*BREAK*")))
      (princ (strcat "\nError: " msg))
    )
    (princ)
  )
  (setq vars '("CMDECHO" "HPBOUND")
        vals (mapcar 'getvar vars)
  )
  (setvar "CMDECHO" 0)
  (if (getvar "HPBOUND") (setvar "HPBOUND" 1)) ; CONTORNO crea polilineas
  (dz:deshacer "_BEgin")
  (setq dmin   (dz:minimo-defecto)
        seguir T
  )
  (princ (strcat "\nDIVZONA - ancho minimo actual: " (dz:num dmin)))
  (while seguir
    (initget "Minimo Seleccionar")
    (setq opc (getpoint "\nDesigne punto interno o [Minimo/Seleccionar] <Salir>: "))
    (cond
      ((null opc) (setq seguir nil))
      ((listp opc)
       (if (setq e (dz:contorno opc))
         (dz:procesar e T dmin)
         (princ "\nNo se ha encontrado un contorno cerrado en ese punto.")
       )
      )
      ((= opc "Minimo")
       (initget 6)
       (if (setq d (getdist (strcat "\nAncho minimo de cada rectangulo <"
                                    (dz:num dmin) ">: "
                            )
                   )
           )
         (setq dmin          d
               *divzona-min* d
         )
       )
      )
      ((= opc "Seleccionar")
       (if (setq sel (entsel "\nSeleccione una polilinea cerrada: "))
         (dz:procesar (car sel) nil dmin)
       )
      )
    )
  )
  (dz:deshacer "_End")
  (mapcar '(lambda (v x) (if x (setvar v x))) vars vals)
  (princ)
)

(princ "\nDIVZONA cargado. Escriba DIVZONA para dividir una zona en rectangulos.")
(princ)
