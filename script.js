const popupButton = document.querySelector('.popup-button');
const cancelButton = document.querySelector('.cancel-button');
const addButton = document.querySelector('.add-button');
const popup = document.querySelector('.popup');
const list = document.querySelector('ul');
const input = document.querySelector('input');
let liEl = document.querySelectorAll('.li-item');
let xmarkEl = document.querySelectorAll('.fa-xmark');
// const listWrapper = document.querySelector('.list-wrapper');

let todos = JSON.parse(localStorage.getItem('items')) || [];

displayTodos();
liEl = document.querySelectorAll('.li-item');
xmarkEl = document.querySelectorAll('.fa-xmark');

popupButton.addEventListener('click', () => {
    popup.classList.add('show');
    input.focus();
    list.style.opacity = '0.5';
    popupButton.classList.add('hide');
    addButton.classList.remove('hide');
    cancelButton.classList.remove('hide');

    if (!popup.classList.contains('show')) {
        list.style.opacity = '';
    }
});

function saveData(){
    addButton.addEventListener('click', () => {
        if (input.value.trim() === '') {
            alert('Todo is empty');
            input.focus();
        } else {
            addTask();
            displayTodos();
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

    xmarkEl.forEach(xmark => {
        xmark.addEventListener('click', e => {
            for (let i = 0; i < liEl.length; i++) {
                
            }
            
        });
    });

// delete todos from localStorage and save it (need to check last one)

xmarkEl.forEach(elem => {
    elem.addEventListener('click', (e) => {

        todos.filter(() => {
            //textContent
            if(e.textContent) {
                return e.textContent == '';
            }
        });

        elem.parentElement.remove();

    });
});

// functions

function firstStage() {
    popup.classList.remove('show');
    list.style.opacity = '';
    popupButton.classList.remove('hide');
    addButton.classList.add('hide');
    cancelButton.classList.add('hide');
}

function addTask() {
    todos.push(input.value);
    // localStorage.setItem('items', JSON.stringify(todos));
    
    // if (input.value.t) {
    //     alert();
    // }

    let li = document.createElement('li');
    li.classList.add('li-item');
    li.innerHTML += `<div class="square"></div><i class="fa-solid fa-xmark"></i>${input.value}`;
    list.append(li);
    input.value = '';
    firstStage();

    liEl = document.querySelectorAll('.li-item');
    xmarkEl = document.querySelectorAll('.fa-xmark');
}

function displayTodos() {
    for (let i = 0; i < todos.length; i++) {
    
        let li = document.createElement('li');
        li.classList.add('li-item');
        li.innerHTML += `<div class="square"></div><i class="fa-solid fa-xmark"></i>${todos[i]}`;

        list.append(li);
    }
}