# Proyecto final BACKEND
**Julieta Mulinaris**
***

## Alcance
***
* **Primera entrega:** se crean las siguientes rutas:
1) Productos: listar todos los disponibles, filtrar por ID, incorporar nuevos productos, actualizar por ID y eliminar por ID.
2) Carrito: crear un carrito, vaciarlo y eliminarlo, listar los productos guardados, incorporar productos por su ID y eliminar por ID.
- Se crea una variable booleana administrador que según su valor permite o no alcanzar ciertas rutas.
- Se realiza persistencia de productos y carrito en el filesystem
- Se crea variable de entorno

* **Segunda entrega:** Se mantienen las rutas de productos y carritos utilizando distintas formas de persistencia de datos:
  1. Archivos (fs)
  2. Memoria (array)
  3. MongoDB Atlas
  4. Firebase


## Tecnologías
***
Teconologías utilizadas en el proyecto
* [express]: Version 4.18.1
* [dotenv]:  Version 16.0.3
* [mongoose]: Version 6.7.0
* [firebase-admin]: Version 11.2.0

## Instalación
***
Pasos para clonar el repo:
```
$ git clone https://github.com/julimulinaris/final-backend
$ npm install
```