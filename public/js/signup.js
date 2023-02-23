//* Prefijos internacionales
const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

//* Validación de contraseñas
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const form = document.getElementById("form");
const error = document.getElementById("errorPassword");

const registro = document.getElementById("registrar")

password2.addEventListener ("mouseout", () => {
    if (password.value != password2.value) {
        error.innerHTML = "Las contraseñas no coinciden, reingrese"
        registro.classList.add("ocultar");
    } else {
        error.innerHTML = "Las contraseñas coinciden, puede registrarse"
        registro.classList.remove("ocultar");
    }
});


