const socket = io.connect();

//*CHAT --Form Ingreso
const email = document.getElementById("email");
const name = document.getElementById("name");
const lastName = document.getElementById("lastName");
const mensaje = document.getElementById("mensaje");

//* Enviar mensaje y validación de campos vacíos
const formPublicarMensaje = document.getElementById("formPublicarMensaje");
formPublicarMensaje.addEventListener("submit", (e) => {
    e.preventDefault();
    const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.value) {
        email.focus();
        return (errorEmail.textContent = "Complete este campo");
    } else {
        if (!regEmail.test(email.value)) {
            email.value = "";
            email.focus();
            return (errorEmail.textContent = "Formato de Email no válido");
        } else {
            errorEmail.textContent = "";
        }
    }
    if (!name.value) {
        name.focus();
        return (errorName.textContent = "Complete este campo")
    } else {
        name.focus();
        errorName.textContent = "";
    }
    if (!lastName.value) {
        lastName.focus();
        return (errorLastName.textContent = "Complete este campo")
    } else {
        lastName.focus();
        errorLastName.textContent = "";
    }
    if (!mensaje.value){
        mensaje.focus();
        return (errorMsj.textContent = "Complete este campo")
    } else {
        mensaje.focus();
        errorMsj.textContent = "";
    }
    const message = {
        message: mensaje.value,
        id_user: email.value,
    };
    mensaje.value="";
    mensaje.focus();
    socket.emit("newMensaje", message)
})

  //*CHAT --Mostrar Mensajes
    const renderMessages = (mensajes) => {
    const html = mensajes
        .map((msj) => {
        return `
            <div class="historial">
                <b style="color:blue;">${msj.id_user}</b>
                [<span style="color:brown;">${msj.timestamp}</span>] :
                <i style="color:green;">${msj.message}</i>
            </div>`;
        })
        .join(" ");
        document.getElementById("mensajes").innerHTML = html;
};

    socket.on("mensajes", (data) => {
    renderMessages(data)
});


//* Filtrar mensajes del usuario
const getUser = async () => {
    try {
        const res = await fetch ("/chat/mailUsuario");
        const email = await res.json();
        getMessages(email)
    } catch (e) {
        throw new Error(`Error al buscar el mail del usuario: ${e}`)
    };
};

const filtroMensajes = document.getElementById("filtroMensajes");

const getMessages = async (email) => {
    try {
        const res = await fetch(`/chat/${email}`);
        const data = await res.json()
        data.forEach(msg => {
            const div = document.createElement("div");
            div.classList.add("misMensajes");
            div.innerHTML += `
                <p class="msj">${msg.message}</p>
                `
            filtroMensajes.appendChild(div);
        });
    } catch (e) {
        throw new Error(`Error al filtrar los mensajes: ${e}`)
    }
}

const btnFiltro = document.getElementById("btn-filtro");

btnFiltro.addEventListener("click", () => {
    getUser();
});
