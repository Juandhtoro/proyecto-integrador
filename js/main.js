const addButtons = document.querySelectorAll('.button--add');
const removeButtons = document.querySelectorAll('.button--remove');
const inputEmail = document.getElementById("id-email");
const inputCountry = document.getElementById("id-country");
const inputPhone = document.getElementById("id-phone");
const inputName = document.getElementById("id-name");
const inputSurname = document.getElementById("id-surname");
const inputComments = document.getElementById("id-comments");
const inputCheck = document.getElementById("input-check");
const buttonValidate = document.getElementById("id-validate");
const form = document.getElementById("myform");

const regexEmail = /^[a-z0-9._]+@[a-z0-9-]+.(com$|com.[a-z0-9]{2}$)/;
const regexNumber = /^[0-9]+$/;
const regexName = /^[a-zA-Z ]+$/;

addButtons.forEach((addButton) => {
    addButton.addEventListener('click', (addButtonClick))
});

function addButtonClick(e) {
    const button = e.target;
    const item = button.closest('.card__button__container');
    let itemQuantity = item.querySelector('.quantity');
    let itemQuantityNumber = parseInt(itemQuantity.textContent);

    itemQuantityNumber += 1;
    itemQuantity.textContent = itemQuantityNumber;
    console.log(itemQuantityNumber);
};

removeButtons.forEach((removeButton) => {
    removeButton.addEventListener('click', (removeButtonClick))
});

function removeButtonClick(e) {
    const button = e.target;
    const item = button.closest('.card__button__container');
    let itemQuantity = item.querySelector('.quantity');
    let itemQuantityNumber = parseInt(itemQuantity.textContent);

    if (itemQuantityNumber > 0) {
        itemQuantityNumber -= 1;
        itemQuantity.textContent = itemQuantityNumber;
    }
};

function validateEmail() {
    if (!inputEmail.value || !inputName.value || !inputSurname.value || !inputCountry.value || !inputPhone.value || !inputComments.value) {
        inputCheck.innerText = "Complete todos los campos";
    } else if (!regexEmail.test(inputEmail.value)) {
        inputCheck.innerText = "Ingrese un email válido";
    } else if (!regexNumber.test(inputPhone.value)) {
    inputCheck.innerText = "Ingrese un teléfono válido"; 
    } else {
        inputCheck.innerText = "Sus comentarios han sido registrados. Nuestro equipo se pondrá en contacto a la brevedad.";
        inputName.value = "";
        inputSurname.value = "";
        inputPhone.value = "";
        inputCountry.value = "";
        inputEmail.value = "";
    }
}

function validate() {
    validateEmail();
}

buttonValidate.onclick = validate;