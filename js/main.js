// const tituloDeArticulo1 = document.querySelector(".card__button__container button:first-of-type");
// const Add = document.querySelector(".card__container button:first-of-type");
// const Delete = document.querySelector(".card__container button:last-of-type");
const elemento = document.getElementById('value');
const elemento1 = document.getElementById('value01');
const elemento2 = document.getElementById('value02');
const elemento3 = document.getElementById('value03');
const elemento4 = document.getElementById('value04');
const elemento5 = document.getElementById('value05');
const elemento6 = document.getElementById('value06');
const elemento7 = document.getElementById('value07');
const elemento8 = document.getElementById('value08');
const elemento9 = document.getElementById('value09');
const elemento10 = document.getElementById('value10');
const elemento11 = document.getElementById('value11');

let value = 0;
let value1 = 0;
let value2 = 0;
let value3 = 0;
let value4 = 0;
let value5 = 0;
let value6 = 0;
let value7 = 0;
let value8 = 0;
let value9 = 0;
let value10 = 0;
let value11 = 0;
let value12 = 0;


function add(v) {
    switch (v) {
        case '1':
            elemento.placeholder = ++value;
            break;
        case '2':
            elemento1.placeholder = ++value1;
            break;
        case '3':
            elemento2.placeholder = ++value2;
            break;
        case '4':
            elemento3.placeholder = ++value3;
            break;
        case '5':
            elemento4.placeholder = ++value4;
            break;
        case '6':
            elemento5.placeholder = ++value5;
            break;
        case '7':
            elemento6.placeholder = ++value6;
            break;
        case '8':
            elemento7.placeholder = ++value7;
            break;
        case '9':
            elemento8.placeholder = ++value8;
            break;
        case '10':
            elemento9.placeholder = ++value9;
            break;
        case '11':
            elemento10.placeholder = ++value10;
            break;
        case '12':
            elemento11.placeholder = ++value11;
            break;
    }
}

function quit(v) {
    switch (v) {
        case '1':
            elemento.placeholder = --value;
            break;
        case '2':
            elemento1.placeholder = --value1;
            break;
        case '3':
            elemento2.placeholder = --value2;
            break;
        case '4':
            elemento3.placeholder = --value3;
            break;
        case '5':
            elemento4.placeholder = --value4;
            break;
        case '6':
            elemento5.placeholder = --value5;
            break;
        case '7':
            elemento6.placeholder = --value6;
            break;
        case '8':
            elemento7.placeholder = --value7;
            break;
        case '9':
            elemento8.placeholder = --value8;
            break;
        case '10':
            elemento9.placeholder = --value9;
            break;
        case '11':
            elemento10.placeholder = --value10;
            break;
        case '12':
            elemento11.placeholder = --value11;
            break;
    }
}

// function add_elememt() {
//     var num1 = 4;
//     num1++;
//     return num1;
// }

// function delete_element() {
//     console.log(elemento);
//     elemento.placeholder = + elemento + 1;
// }

// Add.onclick = add_elememt;
// Delete.onclick = delete_element;
