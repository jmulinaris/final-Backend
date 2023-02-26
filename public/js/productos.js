let cartId;

const contenedorProductos = document.getElementById("productos");
const productosFiltrados = document.getElementById("productosFiltrados")

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
        throw new Error(`Error al buscar el ID del usuario: ${e}`)
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
        throw new Error(`Error al buscar el ID del carrito: ${e}`)
    }
};

//* Crear carrito nuevo
const createCart = async () => {
    try {
        await fetch(`/api/carrito`, { method: "POST" });
    } catch (e) {
        throw new Error(`Error al crear el carrito: ${e}`)
    }
};

//* Traer productos de la BD
const getData = async () => {
    try {
        const res = await fetch("/api/productos");
        const data = await res.json();
        showProducts(data);
    } catch (e) {
        throw new Error(`Error al mostrar los productos: ${e}`)
    }
};

//* Renderizar productos
export const showProducts = async (data) => {
    data.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML += `
            <a href="/productos/${product._id}"><img id="image${product._id}" src=${product.thumbnail}></a>
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
        });
        //! Ver detalle del producto
        const img = document.getElementById(`image${product._id}`)
        img.addEventListener("click", () => {
            getProdById(product);
        })
    });
};

//* Agregar producto al carrito
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
        throw new Error(`Error al agregar producto al carrito: ${e}`)
    }
}

//* Buscar producto por su ID
const getProdById = async (product) => {
    const id = product._id;
    try {
        const res = await fetch(`/api/productos/${id}`);
        const data = await res.json();
        console.log(data)
    } catch (e) {
        throw new Error(`Error al buscar por ID: ${e}`)
    }
}

//* Filtrar productos por categoría
const filterProducts = async (category) => {
    try {
        const res = await fetch(`/api/productos/${category}`, { method: "POST" });
        const data = await res.json();
        contenedorProductos.remove();
        showFilterProducts(data);
    } catch (e) {
        throw new Error(`Error al filtrar productos: ${e}`)
    }
}

const showFilterProducts = async (data) => {
    data.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML += `
            <a href="/productos/${product._id}"><img id="image${product._id}" src=${product.thumbnail}></a>
            <h5 class="name">${product.name}</h5>
            <p class="description">${product.description}</p>
            <p>Stock: ${product.stock}</p>
            <p class="price">$${product.price}</p>
            <button class="boton-add" id="boton${product._id}">Agregar al carrito</button>
            `
        productosFiltrados.appendChild(div);
        const boton = document.getElementById(`boton${product._id}`)
        boton.addEventListener("click", () => {
            addProduct(product);
        });
        //! Ver detalle del producto
        const img = document.getElementById(`image${product._id}`)
        img.addEventListener("click", () => {
            getProdById(product);
        })
    });
}

const pizzas = document.getElementById("pizzas");
pizzas.addEventListener("click", () => {
    filterProducts("pizzas");
});

const pastas = document.getElementById("pastas");
pastas.addEventListener("click", () => {
    filterProducts("pastas");
});


