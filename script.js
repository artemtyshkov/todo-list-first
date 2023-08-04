const popupButton = document.querySelector('.popup-button');
const cancelButton = document.querySelector('.cancel-button');
const addButton = document.querySelector('.add-button');
const popup = document.querySelector('.popup');
const ul = document.querySelector('ul');
const li = document.querySelectorAll('.li-item');
const input = document.querySelector('input');
const xmark = document.querySelectorAll('.fa-xmark');
const list = document.querySelector('.list');

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

popupButton.addEventListener('click', () => {
    popup.classList.add('show');
    input.focus();
    ul.style.opacity = '0.5';
    popupButton.classList.add('hide');
    addButton.classList.remove('hide');
    cancelButton.classList.remove('hide');

    if (!popup.classList.contains('show')) {
        ul.style.opacity = '';
    }
});

function saveData(){
    addButton.addEventListener('click', () => {
        if (input.value.trim() === '') {
            firstStage();
        } else {
            addTask();
        }
    });
    
    input.addEventListener('keyup', (e) => {
        if (e.code === 'Enter') {
            addTask();
        }
    });
}
saveData();

cancelButton.addEventListener('click', () => {
    firstStage();
    input.value = '';
});

// ul.addEventListener('click', (e) => {
//     if (e.target.contains('li')) {
//         e.target.classList.toggle('complete');
//     }
// });

ul.addEventListener('click', (e) => {
    let target = e.target.closest('li');
    if (target){
        target.innerHTML = '';
    }
});

// functions

function firstStage() {
    popup.classList.remove('show');
    ul.style.opacity = '';
    popupButton.classList.remove('hide');
    addButton.classList.add('hide');
    cancelButton.classList.add('hide');
}

function addTask() {
        itemsArray.push(input.value);
        localStorage.setItem('items', JSON.stringify(itemsArray));
    
        let li = document.createElement('li');
        li.classList.add('li-item');
        li.innerHTML += `<div class="square"></div><i class="fa-solid fa-xmark"></i>${input.value}`;
    
        ul.append(li);
        input.value = '';
        firstStage();
}

// SMTH NEW

function displayItems() {

    for (let i = 0; i < itemsArray.length; i++) {
    
    let li = document.createElement('li');
    li.classList.add('li-item');
    li.innerHTML += `<div class="square"></div><i class="fa-solid fa-xmark"></i>${itemsArray[i]}`;

    ul.append(li);
    }
}
displayItems();