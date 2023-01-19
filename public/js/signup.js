//* Prefijos internacionales
const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

//* Envío del formulario de SIGNUP
const form = document.querySelector("#form");
const preview = document.querySelector("#preview");
const file = document.querySelector("#myFile");
const name = document.querySelector("#name");

const renderImage = (formData) => {
    const file = formData.get("myFile");
    const myFile = URL.createObjectURL(file);
    preview.setAttribute = ("src", myFile);
};

file.addEventListener("change", () =>{
    const formData = new FormData(form);
    renderImage(formData);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    fetch("/signup", {
        method: "POST",
        body: formData
    });
    form.reset();
});

