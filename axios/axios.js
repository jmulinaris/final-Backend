import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

//**RUTA GET---- */
try {
    const get = await api.get("/api/productos")
    console.log(get.data); 
} catch (e) {
    console.log(e)
}

//**RUTA POST---- */
try {
    const post = await api.post("/api/productos", {
        name: "pimientos",
        description:"pimientos",
        price: 500,
        code: 103,
        thumbnail: "la foto",
        stock: 20
    });
    console.log(post.data);
} catch (e) {
    console.log(e)
}

//**RUTA PUT---- */
try {
    const put = await api.put("api/productos/63d7d1b1b85825b99e02eb71", {
        name: "pimientos rojos",
        description:"pimientos listos para cocinar",
        price: 500,
        code: 103,
        thumbnail: "la foto",
        stock: 20
    });
    console.log(put.data)
} catch (e) {
    console.log(e)
}

// //**RUTA DELETE---- */
try {
    const axiosDelete = await api.delete("/api/productos/63d7d1b1b85825b99e02eb71");
    console.log(axiosDelete.data)
} catch (e) {
    console.log(e)
}
