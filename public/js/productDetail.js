const detalleProducto = document.getElementById("productDetail");

document.addEventListener("DOMContentLoaded", () => {
    showDetail(product);
})

const id = product._id;


//* Mostrar el detalle de cada producto
const showDetail = async (id) => {
    try {
        const res = await fetch(`/api/productos/${id}`);
        const data = await res.json();
        console.log(data)
    } catch (e) {
        throw new Error(`Error al mostrar el detalle: ${e}`)
    }
}

export default showDetail;