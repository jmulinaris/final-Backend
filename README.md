
# __Proyecto final de Backend__

Desarrollo de una API basada en las operaciones de CRUD de un ecommerce. 

En el archivo .env está la variable DATABASE para entorno de producción y desarrrollo. Por defecto está en el de producción (Mongo Atlas). 

Para trabajar en desarrollo (Mongo Local) se debe descomentar y dejar comentada la de producción.

Trabajando por defecto sobre el puerto 8080: http://localhost:8080 utilizamos los métodos GET, POST, PUT y DELETE para realizar las operaciones.

Se creó el front para facilitar las pruebas.

Railway -> 



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

Ejemplo: pizzas

![App Screenshot](https://i.postimg.cc/bvtN7tpb/Screenshot-at-Mar-03-14-55-09.png)


#### Save

```http
  POST /api/productos/
```
Recibe los datos del producto y devuelve el ID.

Producto de ejemplo: 

    { 
    "name": "Tallarines",
    "description": "Tallarines por 500g",
    "code": 103,
    "thumbnail": "https://i.postimg.cc/MHZpfHtq/tallarines.jpg",
    "price": 900,
    "stock": 15,
    "category": "pastas" 
    }

![App Screenshot](https://i.postimg.cc/vmb3jpRd/Screenshot-at-Mar-03-15-05-29.png)

#### Update By ID

```http
  PUT /api/productos/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID del producto|

Recibe los datos del producto a modificar y devuelve nombre y ID.

![App Screenshot](https://i.postimg.cc/W4fFckDw/Screenshot-at-Mar-03-15-15-21.png)

#### Delete By ID
```http
  DELETE /api/productos/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID del producto|

Se elimina el producto de la base de datos.

![App Screenshot](https://i.postimg.cc/QMBN5ntc/Screenshot-at-Mar-03-15-17-13.png)



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

![App Screenshot](https://i.postimg.cc/fRzZx7DW/Screenshot-at-Mar-03-16-13-41.png)


#### Get All

```http
  GET /api/carrito/:id/productos
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID del carrito|

Devuelve los productos incluidos en el carrito.

ID de ejemplo: 63ff4a773d50a7682dc0923a

![App Screenshot](https://i.postimg.cc/L5BSHtbY/Screenshot-at-Mar-03-14-52-21.png)

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

![App Screenshot](https://i.postimg.cc/Sx1sR1Cb/Screenshot-at-Mar-03-16-17-09.png)


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

### __Ordenes__
#### Get All

```http
  GET /ordenes
```

Devuelve las ordenes de compra.

#### Create order

```http
  POST /ordenes/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID del carrito|

Se genera la orden de compra con los productos del carrito.

### __Chat__
#### Get All

```http
  GET /chat
```

Devuelve los mensajes del chat.

#### Get by email

```http
  GET /chat/:email
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Mail del usuario|

Devuelve los mensajes del usuario según su email.

### __Variables de entorno__

```http
  GET /variables
```

Devuelve la información de las variables de entorno.

## __Front__

Se crean las vistas con ejs:
- **Registro:** Permite crear un usuario para iniciar sesión. 
![App Screenshot](https://i.postimg.cc/28DYBd63/Screenshot-at-Mar-02-16-25-47.png)

Una vez validada la contraseña aparece el botón "registrarse".

![App Screenshot](https://i.postimg.cc/mDP9Cfm3/Screenshot-at-Mar-02-16-29-10.png)

Cuando se registra un nuevo usuario se crea un carrito vacío y se envía un mail al administrador utilizando Nodemailer y Ethereal.

![App Screenshot](https://i.postimg.cc/3JYRHQ2L/Screenshot-at-Mar-02-16-30-28.png)

- **Inicio de sesión:** debe colocar el mail y contraseña. 

![App Screenshot](https://i.postimg.cc/G2MQXWc4/Screenshot-at-Mar-01-10-17-07.png)

- **Productos:** Página a la que es redirigido cuando inicia sesión, se muestran los productos y permite agregarlos al carrito. 

![App Screenshot](https://i.postimg.cc/s21sHbKH/Screenshot-at-Mar-03-17-42-34.png)


- **Carrito:** Se muestran los productos del carrito con sus respectivos precios, cantidades y suma del total.

![App Screenshot](https://i.postimg.cc/GtnDWKvW/Screenshot-at-Mar-03-14-06-11.png)


Al finalizar se crea una orden de compra y se envía un mail al usuario.

![App Screenshot](https://i.postimg.cc/tCKMJGpP/Screenshot-at-Mar-03-14-15-55.png)


- **Chat:** Permite al usuario enviar mensajes que serán visibles por todos y filtrar los mensajes propios.

![App Screenshot](https://i.postimg.cc/qMCYXv7g/Screenshot-at-Mar-03-14-07-17.png)

- **Mi Cuenta:** Muestra los datos del usuario (mail, nombre, dirección y celular).

![App Screenshot](https://i.postimg.cc/SRKGTDqm/Screenshot-at-Mar-03-14-11-27.png)
## __Run Locally__

Clonar el repo:

```bash
  git clone https://github.com/jmulinaris/final-Backend
```

Ir al directorio del proyecto:

```bash
  cd final-Backend
```

Instalar dependencias:

```bash
  npm install
```

Iniciar el servidor:

```bash
  node .
```


## __Environment Variables__

Para correr el proyecto, necesitarás agregar las siguientes variables al archivo .env:

`TIPO`

`DATABASE`

`SMTP_USER`

`SMTP_PASS`

`ADMIN_MAIL`


## __Tecnologías__

Teconologías utilizadas en el proyecto:
* [express]: Version 4.18.1
* [dotenv]:  Version 16.0.3
* [mongoose]: Version 6.7.0
* [connect-mongo]: Version 4.6.0
* [express-session]: Version 1.17.3
* [bcrypt]: Version 5.1.0
* [ejs]: Version 3.1.8
* [log4js]: Version 6.7.1
* [mongodb]: Version 4.11.0
* [nodemon]: Version 2.0.20
* [minimist]: Version 1.2.7
* [passport]: Version 0.6.0
* [passport-local]: Version 1.0.0
* [nodemailer]: Version 6.9.0
* [socket.io]: Version 4.6.1




## __Author__

- [@jmulinaris](https://github.com/jmulinaris)

