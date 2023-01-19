let cartId;

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
        cartId = data;
        console.log(cartId);
        showCart(cartId);
        // if (data._id === null) {
        //     contenedorCarrito.innerHTML = `
            // <p class="carrito-vacio">El carrito está vacío</p>
            // `
        // } else {
        //     cartId = data;
        //     console.log(cartId);
        //     showCart(cartId);
        // }
    }  catch (e) {
        console.log(e);
    }
};

const contenedorCarrito = document.getElementById("carrito-contenedor");

//* Mostrar el carrito
const showCart = async () => {
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
                <p class="product-cart">${product.name}</p>
                <p class="product-cart">$${product.price}</p>
                <button class="boton-delete" id=eliminar${product._id}>Eliminar</button>
            `
            contenedorCarrito.appendChild(div);
            const boton = document.getElementById(`eliminar${product._id}`)
            const btnFinalizar = document.getElementById("btn-finalizar");
            btnFinalizar.innerHTML = `
            <button class="btn-finalizar">Finalizar compra</button>
            `
            boton.addEventListener("click", () => {
                deleteProduct();
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
const deleteProduct = async () => {
    try {
        const res = await fetch(`/api/carrito/${cartId}/productos/prod_id`, { method: "DELETE" })
        const data = res.json();
        console.log(data)
    } catch (e) {
        console.log(e)
    }
}


//* Finalizar compra


