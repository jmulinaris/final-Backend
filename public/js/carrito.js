const contenedorCarrito = document.getElementById("carrito-contenedor");

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
        if (data._id === null) {
            console.log("No hay carrito")
            //! Función crear carrito
        } else {
            cartId = data;
            console.log(cartId);
            showCart(cartId);
        }
    }  catch (e) {
        console.log(e);
    }
};

//* Mostrar el carrito
const showCart = async (cartId) => {
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
                <button class="boton-delete" id=eliminar${product._id}>ELIMINAR</button>
            `
            contenedorCarrito.appendChild(div);
            })
        }
    } catch (e) {
        console.log(e)
    };
};


