let cartId;
let userId;

const contenedorCarrito = document.getElementById("carrito-contenedor");

document.addEventListener("DOMContentLoaded", (e)=>{
    fetchUser();
});

//* Buscar el ID del usuario
const fetchUser = async () => {
    try {
        const res = await fetch ("/idUsuario");
        const data = await res.json();
        fetchCart(data);
    } catch (e) {
        console.log(e);
    };
};

//* Traer el ID del carrito
const fetchCart = async (user) => {
    try {
        const res = await fetch (`api/carrito/idCarrito/${user}`);
        const data = await res.json();
        cartId = data._id;
        userId = user;
        fetchShowCart();
    }  catch (e) {
        console.log(e);
    }
};

//* Mostrar el carrito
const fetchShowCart = async () => {
    try {
        const res = await fetch (`api/carrito/${cartId}/productos`);
        const products = await res.json();
        console.log(products);
        if (products.length === 0) {
            contenedorCarrito.innerHTML = `
            <p class="carrito-vacio">El carrito está vacío</p>
            `
        } else {
            products.forEach (product => {
                const div = document.createElement("div");
                div.classList.add("productoEnCarrito");
                div.innerHTML = `
                <p id="${product._id}"></p>
                <p class="product-cart">${product.name}</p>
                <p class="product-cart">$${product.price}</p>
                <button class="boton-delete" id="eliminar${product._id}">Eliminar</button>
            `
            contenedorCarrito.appendChild(div);
            const btnEliminar = document.getElementById(`eliminar${product._id}`)
            const btnFinalizar = document.getElementById("btn-finalizar");
            btnFinalizar.innerHTML = `
            <button class="btn-finalizar">Finalizar compra</button>
            `
            btnEliminar.addEventListener("click", () => {
                fetchDeleteProduct();
                console.log("Producto eliminado")
            })
            btnFinalizar.addEventListener("click", () => {
                console.log("Compra finalizada");
            })
            })
        }
    } catch (e) {
        console.log(e)
    };
};

//* Eliminar producto
//! da undefined para traer el id
const fetchDeleteProduct = async () => {
    const id_prod = document.getElementById(`${product._id}`)
    //const id_prod = prod.querySelector(".boton-delete").dataset.id;
    try {
        await fetch(`/api/carrito/${cartId}/productos/${id_prod}`, { method: "DELETE" })
        fetchShowCart();
    } catch (e) {
        console.log(e)
    }
}


//* Finalizar compra


