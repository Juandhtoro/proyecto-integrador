const formButtons = document.querySelectorAll('.button--form');
const inputEmail = document.getElementById("id-email");
const inputCountry = document.getElementById("id-country");
const inputPhone = document.getElementById("id-phone");
const inputName = document.getElementById("id-name");
const inputSurname = document.getElementById("id-surname");
const inputComments = document.getElementById("id-comments");
const inputCheck = document.getElementById("input-check");
const buttonValidate = document.getElementById("id-validate");
const inputProductName = document.getElementById("id-product-name");
const inputSerie = document.getElementById("id-serie");
const inputProductType = document.getElementById("id-product-type");
const inputAmount = document.getElementById("id-amount");
const inputProductDescription = document.getElementById("id-product-description");
const inputCheckProduct = document.getElementById("input-check--product");
const buttonProduct = document.getElementById("id-button");
const regexEmail = /^[a-z0-9._]+@[a-z0-9-]+.(com$|com.[a-z0-9]{2}$)/;
const regexNumber = /^[0-9]+$/;
const regexName = /^[a-zA-Z ]+$/;

formButtons.forEach((addButton) => {
    addButton.addEventListener('click', (addButtonClick))
});

function addButtonClick(e) {
    let alertFormProduct = document.querySelector('.input-check--form--product');
    let inputText = document.getElementById('id-product-description');

    if (!inputProductName.value || !inputSerie.value || !inputProductType.value || !inputAmount.value || !inputProductDescription.value) {
        alertFormProduct.innerText = "Complete todos los campos";
    } else if (!regexNumber.test(inputAmount.value)) {
        alertFormProduct.innerText = "Ingrese una cantidad válida";
    } else {
        alertFormProduct.innerText = "El producto ha sido añadido.";
        inputProductName.value = "";
        inputSerie.value = "";
        inputProductType.value = "";
        inputAmount.value = "";
        inputProductDescription.value = "";
    }
};

formButtons.forEach((addButtonContact) => {
    addButtonContact.addEventListener('click', (addButtonClickContact))
});

function addButtonClickContact(e) {
    let alertFormContact = document.querySelector('.input-check--form--contact');

    if (!inputEmail.value || !inputName.value || !inputSurname.value || !inputCountry.value || !inputPhone.value || !inputComments.value) {
        alertFormContact.innerText = "Complete todos los campos";
    } else if (!regexEmail.test(inputEmail.value)) {
        alertFormContact.innerText = "Ingrese un email válido";
    } else if (!regexNumber.test(inputPhone.value)) {
        alertFormContact.innerText = "Ingrese un teléfono válido";
    } else {
        alertFormContact.innerText = "Sus comentarios han sido registrados. Nuestro equipo se pondrá en contacto a la brevedad.";
        inputName.value = "";
        inputSurname.value = "";
        inputPhone.value = "";
        inputCountry.value = "";
        inputEmail.value = "";
        inputComments.value = "";
    }
};