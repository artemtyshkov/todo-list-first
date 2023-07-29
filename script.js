const popupButton = document.querySelector('.popup-button');
const cancelButton = document.querySelector('.cancel-button');
const addButton = document.querySelector('.add-button');
const popup = document.querySelector('.popup');
const ul = document.querySelector('ul');
const input = document.querySelector('input');

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

addButton.addEventListener('click', () => {
    if (input.value.trim() == '') {
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

cancelButton.addEventListener('click', () => {
    firstStage();
    input.value = '';
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
    let li = document.createElement('li');

    li.innerHTML += `<div class="square"></div>${input.value}`;

    ul.append(li);
    saveTask();
    input.value = '';
    firstStage();
}

function saveTask() {
    localStorage.setItem('task', `${input.value}`);
}

function getTasks() {
    localStorage.getItem('task');
}
getTasks();