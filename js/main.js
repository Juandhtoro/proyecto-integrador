const addButtons = document.querySelectorAll('.button--add');
const removeButtons = document.querySelectorAll('.button--remove');

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