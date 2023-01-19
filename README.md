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

* **Tercer entrega:** Se crean formularios de registro y login, ya que el usuario debe autenticarse para acceder. Se crean las vistas de home, productos, carrito y mi cuenta utilizando ejs. El ecommerce queda funcional, enviando confirmación del pedido por WhatsApp al administrador y mensaje de texto al usuario.
Se utiliza la base de datos Mongo Atlas y se despliega el proyecto en la nube utilizando Railway.


## Tecnologías
***
Teconologías utilizadas en el proyecto
* [express]: Version 4.18.1
* [dotenv]:  Version 16.0.3
* [mongoose]: Version 6.7.0
* [firebase-admin]: Version 11.2.0
* [connect-mongo]: Version 4.6.0
* [dotenv]: Version 16.0.3
* [express-session]: Version 1.17.3
* [ejs]: Version 3.1.8
* [log4js]: Version 6.7.1
* [mongodb]: Version 4.11.0
* [multer]: Version 1.4.5-lts.1
* [passport]: Version 0.6.0
* [passport-local]: Version 1.0.0
* [nodemailer]: Version 6.9.0
* [twilio] Version 3.84.1

## Instalación
***
Pasos para clonar el repo:
```
$ git clone https://github.com/julimulinaris/final-backend
$ npm install
```