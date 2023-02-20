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
        console.log(`Error al buscar el ID del usuario: ${e}`)
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
        console.log(`Error al buscar el ID del carrito: ${e}`)
    }
};

//* Crear carrito nuevo
const createCart = async (user) => {
    try {
        await fetch(`/api/carrito/${user}`, { method: "POST" });
    } catch (e) {
        console.log(`Error al crear el carrito: ${e}`)
    }
};

//* Traer productos de la BD
const getData = async (category) => {
    try {
        if (category) {
            filterProducts(category);
        } else {
            const res = await fetch("/api/productos");
            const data = await res.json();
            showProducts(data);
        }
    } catch (e) {
        console.log(`Error al mostrar los productos: ${e}`)
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
        console.log(`Error al agregar producto al carrito: ${e}`)
    }
}

//* Filtrar productos por categoría
const filterProducts = async (category) => {
    try {
        const res = await fetch(`/api/productos/${category}`, { method: "POST" });
        const data = await res.json();
        showProducts(data);
    } catch (e) {
        console.log(`Error al filtrar productos: ${e}`)
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


