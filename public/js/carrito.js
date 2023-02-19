let cartId;
let userId;

const contenedorCarrito = document.getElementById("carrito-contenedor");

document.addEventListener("DOMContentLoaded", (e)=>{
    getUser();
});

//* Buscar el ID del usuario
const getUser = async () => {
    try {
        const res = await fetch ("/idUsuario");
        const data = await res.json();
        getCart(data);
    } catch (e) {
        console.log(e);
    };
};

//* Traer el ID del carrito
const getCart = async (user) => {
    try {
        const res = await fetch (`api/carrito/idCarrito/${user}`);
        const data = await res.json();
        cartId = data._id;
        userId = user;
        showCart();
    }  catch (e) {
        console.log(e);
    }
};

//* Mostrar el carrito
const showCart = async () => {
    try {
        const res = await fetch (`api/carrito/${cartId}/productos`);
        const products = await res.json();
        if (products.length === 0) {
            contenedorCarrito.innerHTML = `
            <p class="carrito-vacio">El carrito está vacío</p>
            `
        } else {
            products.forEach (product => {
                const div = document.createElement("div");
                div.classList.add("productoEnCarrito");
                div.innerHTML = `
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
                deleteProduct(product);
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
const deleteProduct = async (product) => {
    const id_prod = product._id;
    try {
        await fetch(`/api/carrito/${cartId}/productos/${id_prod}`, { method: "DELETE" });
        showCart();
    } catch (e) {
        console.log(e)
    }
};


//* Finalizar compra


