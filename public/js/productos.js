let cartId;

const contenedorProductos = document.getElementById("productos");

document.addEventListener("DOMContentLoaded", () => {
    getData();
    getUser();
})

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
        if (data._id === null) {
            createCart(user);
        } else {
            cartId = data._id;
        }
    }  catch (e) {
        console.log(e);
    }
};

//* Crear carrito nuevo
const createCart = async (user) => {
    try {
        await fetch(`/api/carrito/${user}`, { method: "POST" });
    } catch (e) {
        console.log(e)
    }
};

//* Traer productos de la BD
const getData = async () => {
    try {
        const res = await fetch("/api/productos");
        const data = await res.json();
        showProducts(data)
    } catch (e) {
        console.log(e)
    }
};

//* Renderizar productos
const showProducts = async (data) => {
    data.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML += `
            <img src=${product.thumbnail}>
            <h5 class="name">${product.name}</h5>
            <p class="description">${product.description}</p>
            <p>Stock: ${product.stock}</p>
            <p class="price">$${product.price}</p>
            <button class="boton-add" id="boton${product._id}">Agregar al carrito</button>
            `
        contenedorProductos.appendChild(div);
        const boton = document.getElementById(`boton${product._id}`)
        boton.addEventListener("click", () => {
            addProduct(product);
        })
    });
};

//* Agregar producto al carrito
//! Falta sumar si hay duplicados
const addProduct = async (product) => {
    try {
        const url = `api/carrito/${cartId}/productos`;
        await fetch (url, {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json",
            }
        })
    } catch (e) {
        console.log(e)
    }
}

//* Filtrar productos por categoría
const filterProducts = async (category) => {
    try {
        const res = await fetch(`/api/productos/${category}`);
        const data = await res.json();
        showProducts(data);
    } catch (e) {
        console.log(e)
    }
}

const pizzas = document.getElementById("pizzas");
pizzas.addEventListener("click", () => {
    filterProducts("pizzas");
});

const pastas = document.getElementById("pastas");
pastas.addEventListener("click", () => {
    filterProducts("pastas");
});


