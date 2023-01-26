let cartId;

const contenedorProductos = document.getElementById("productos");

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    fetchUser();
})

//* Buscar el ID del usuario
const fetchUser = async () => {
    try {
        const res = await fetch ("/idUsuario");
        const data = await res.json();
        console.log("usuario", data)
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
        console.log("carrito", data);
        if (data._id === null) {
            fetchCreateCart();
            console.log("entro acá")
        } else {
            cartId = data._id;
        }
    }  catch (e) {
        console.log(e);
    }
};

//* Crear carrito nuevo
const fetchCreateCart = async (user) => {
    try {
        const res = await fetch(`/api/carrito/${user}`, { method: "POST" });
        const data = await res.json();
        cartId = data.newId;
        console.log("creo este carro", cartId);
    } catch (e) {
        console.log(e)
    }
};

//* Traer productos de la BD
const fetchData = async () => {
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
            <p id="${product._id}"></p>
            <img src=${product.thumbnail}>
            <h5 class="name">${product.name}</h5>
            <p class="date">${product.timestamp}</p>
            <p class="description">${product.description}</p>
            <p class="code">Código: ${product.code}</p>
            <p>Stock: ${product.stock}</p>
            <p class="price">$${product.price}</p>
            <button class="boton-add" id="boton${product._id}">Agregar al carrito</button>
            `
        contenedorProductos.appendChild(div);
        const boton = document.getElementById(`boton${product._id}`)
        boton.addEventListener("click", () => {
            //! Función agregar al carrito
            fetchAddProduct();
        })
    });
};

const productos = await fetchData(cartId);
//console.log(productos);

//* Agregar producto al carrito
const fetchAddProduct = async (prod) => {
    console.log("Se agrega el producto al carrito")
    try {
        const url = `api/carrito/${cartId}/productos`;
        console.log(cartId)
        const producto = {
            id: cartId,
            // id_prod: prod.querySelector(".boton-add").dataset.id,
            timestamp: prod.querySelector(".date").textContent,
            name: prod.querySelector(".name").textContent,
            description: prod.querySelector(".description").textContent,
            code: prod.querySelector(".code").textContent,
            price: prod.querySelector(".price").textContent,
        };
        await fetch (url, {
            method: "POST",
            body: JSON.stringify(producto),
            headers: {
                "Content-Type": "application/json",
            }
        })
    } catch (e) {
        console.log(e)
    }
}


