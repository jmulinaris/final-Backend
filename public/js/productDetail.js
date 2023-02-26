// const detalleProducto = document.getElementById("productDetail");

// document.addEventListener("DOMContentLoaded", () => {
//     showDetail(data);
// })

// // const data = {
// //     "_id": "63bf05fef3ee9117273e89e2",
// //     "timestamp": "2023-01-11T18:54:54.136Z",
// //     "name": "Pizza de muzzarella",
// //     "description": "Pizza de muzzarella de 8 porciones",
// //     "code": 101,
// //     "thumbnail": "https://i.postimg.cc/WbQ52k5R/pizza-muzza.jpg",
// //     "price": 1500,
// //     "stock": 15,
// //     "__v": 0,
// //     "category": "pizzas"
// // }

// const showDetail = (data) => {
//     const div = document.createElement("div");
//     div.innerHTML += `
//     <a href="/productos/${data._id}"><img id="image${data._id}" src=${data.thumbnail}></a>
//     <h5 class="name">${data.name}</h5>
//     <p class="description">${data.description}</p>
//     <p>Stock: ${data.stock}</p>
//     <p class="price">$${data.price}</p>
//     <button class="boton-add" id="boton${data._id}">Agregar al carrito</button>
//     `
//     detalleProducto.appendChild(div);
// }

// export default showDetail;