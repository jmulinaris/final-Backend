//* Buscar el ID del usuario
const fetchUsuario = async () => {
    try {
        const res = await fetch ("/idUsuario");
        const data = await res.json();
        console.log(data);
    } catch (e) {
        console.log(e);
    }
};

// const fetchCart = async () => {
//     try {
//         const res = await fetch (`/:${id_user}`)
//         const data = await res.json();
//         console.log(data)
//     } catch(e) {
//         console.log(e)
//     }
// }
