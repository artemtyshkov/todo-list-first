const popupButton = document.querySelector('.popup-button');
const cancelButton = document.querySelector('.cancel-button');
const addButton = document.querySelector('.add-button');
const popup = document.querySelector('.popup');
const ul = document.querySelector('ul');
const input = document.querySelector('input');

popupButton.addEventListener('click', () => {
    popup.classList.toggle('show');
    ul.style.opacity = '0.5';
    popupButton.classList.add('hide');
    addButton.classList.add('show');
    cancelButton.classList.add('show');



    if (!popup.classList.contains('show')) {
        ul.style.opacity = '';
    }
});

