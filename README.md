
# __Proyecto final de Backend__

Desarrollo de una API basada en las operaciones de CRUD de un ecommerce. 

En el archivo .env está la variable DATABASE para entorno de producción y desarrrollo. Por defecto está en el de producción (Mongo Atlas). 

Para trabajar en desarrollo (Mongo Local) se debe descomentar y dejar comentada la de producción.

Trabajando por defecto sobre el puerto 8080: http://localhost:8080 utilizamos los métodos GET, POST, PUT y DELETE para hacer modificaciones en la base de datos.

***FRONT***

Se crean las vistas con ejs:
- **Registro:** Permite crear un usuario para iniciar sesión. 
![App Screenshot](https://i.postimg.cc/28DYBd63/Screenshot-at-Mar-02-16-25-47.png)

Una vez validada la contraseña aparece el botón "registrarse".

![App Screenshot](https://i.postimg.cc/mDP9Cfm3/Screenshot-at-Mar-02-16-29-10.png)

Cuando se crea un nuevo usuario se envía un mail al administrador utilizando Nodemailer y Ethereal.

![App Screenshot](https://i.postimg.cc/3JYRHQ2L/Screenshot-at-Mar-02-16-30-28.png)


- **Inicio de sesión:** debe colocar el mail y contraseña. 

![App Screenshot](https://i.postimg.cc/G2MQXWc4/Screenshot-at-Mar-01-10-17-07.png)

- **Productos:** Página a la que es redirigido cuando inicia sesión, se muestran los productos y permite agregarlos al carrito. 

![App Screenshot](https://i.postimg.cc/8zyqr0vz/Screenshot-at-Mar-01-10-14-30.png)


- **Carrito:** Se muestran los productos del carrito con sus respectivos precios, cantidades y suma del total. Al finalizar se crea una orden de compra.
- **Chat:** Muestra mensajes y permite al usuario enviar mensajes que serán visibles por todos.
- **Mi Cuenta:** Muestra los datos del usuario (mail, nombre, dirección y celular).

## __API Reference__

### __Productos__
#### Get All

```http
  GET /api/productos
```
Devuelve todos los productos almacenados en la base de datos.

#### Get By ID

```http
  GET /api/productos/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID del producto|

Devuelve el producto con ese ID y en caso de no existir devuelve que no se encontró.

#### Get By Category

```http
  POST /api/productos/:category
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`      | `string` | **Required**. Categoría del producto|

Devuelve todos los productos que coincidan con la categoría.

#### Save

```http
  POST /api/productos/
```
Recibe los datos del producto y devuelve el ID.

![App Screenshot](https://i.postimg.cc/XNz5Pvnj/Screenshot-at-Feb-28-20-20-25.png)

#### Update By ID

```http
  PUT /api/productos/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID del producto|

Devuelve el nombre y ID del producto actualizado.

![App Screenshot](https://i.postimg.cc/Jhjt4bDx/Screenshot-at-Feb-28-20-41-00.png)

#### Delete By ID
```http
  DELETE /api/productos/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID del producto|

Se elimina el producto de la base de datos.

![App Screenshot](https://i.postimg.cc/NMSg6FHF/Screenshot-at-Feb-28-20-44-56.png)



### __Carritos__
#### Save

```http
  POST /api/carrito
```
Se crea un carrito para el usuario.

#### Delete by ID

```http
  DELETE /api/carrito/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID del carrito|

Se elimina el carrito con el ID informado.

#### Get All

```http
  GET /api/carrito/:id/productos
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID del carrito|

Devuelve los productos incluidos en el carrito.

#### Save products

```http
  POST /api/carrito/:id/productos
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID del carrito|

Se agregan productos al carrito con el ID informado.

#### Delete product by ID

```http
  DELETE /api/carrito/:id/productos/:id_prod
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID del carrito|
| `id_prod`      | `string` | **Required**. ID del producto|

Se elimina del carrito el producto con el ID informado.

#### Find user´s cart

```http
  GET /api/carrito/idCarrito/:id_user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_user`      | `string` | **Required**. ID del usuario|

Devuelve el carrito del usuario que está sin finalizar.

#### Update cart

```http
  PUT /api/carrito/:id_user
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_user`      | `string` | **Required**. ID del usuario|

Actualiza el estado del carrito a "finalizado" para crear la orden de compra.

## __Author__

- [@jmulinaris](https://github.com/jmulinaris)


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
* [twilio]: Version 3.84.1
* [chai]: Version 4.3.7
* [mocha]: Version 10.2.0
* [supertest]: Version 6.3.3
* [axios]: Version 1.2.6

## Instalación
***
Pasos para clonar el repo:
```
$ git clone https://github.com/julimulinaris/final-backend
$ npm install
```