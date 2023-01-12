//* Traer productos de la BD
const fetchData = async () => {
    try {
        const res = await fetch("/api/productos");
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e)
    }
};

const contenedorProductos = document.getElementById("productos");

const showProducts = async (data) => {
    const productos = await fetchData(data);
    productos.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML += `
            <img src=${product.thumbnail}>
            <h5 class="product-name">${product.name}</h5>
            <p>${product.timestamp}</p>
            <p>${product.description}</p>
            <p>Código: ${product.code}</p>
            <p>Stock: ${product.stock}</p>
            <p>$${product.price}</p>
            <button class="boton-add" id=boton${product._id}>AGREGAR AL CARRITO</button>
            `
        contenedorProductos.appendChild(div);
        const boton = document.getElementById(`boton${product._id}`)
        boton.addEventListener("click", () => {
            //! Función agregar al carrito
            
            console.log("Se agrega al carrito")
        })
    });
};

document.addEventListener("DOMContentLoaded", () => {
    showProducts();
})
