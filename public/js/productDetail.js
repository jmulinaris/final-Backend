const detalleProducto = document.getElementById("productDetail");

document.addEventListener("DOMContentLoaded", () => {
    showDetail();
})

//* Mostrar el detalle de cada producto
const showDetail = async (product) => {
    try {
        const res = await fetch(`/api/productos/${product._id}`);
        const data = await res.json();
        console.log(data)
    } catch (e) {
        throw new Error(`Error al mostrar el detalle: ${e}`)
    }
}

export default showDetail;