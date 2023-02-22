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


