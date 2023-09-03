const popupButton = document.querySelector('.popup-button');
const cancelButton = document.querySelector('.cancel-button');
const addButton = document.querySelector('.add-button');
const popup = document.querySelector('.popup');
const list = document.querySelector('ul');
const input = document.querySelector('input');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

renderTodos();

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

addButton.addEventListener('click', () => {
    saveTodo();
    renderTodos();
    localStorage.setItem('todos', JSON.stringify(todos));
});

input.addEventListener('keyup', (e) => {
    if (e.code === 'Enter' && input.value === '') {
        alert('Todo is empty');
        input.focus();
    } else if (e.code === 'Enter') {
        saveTodo();
        renderTodos();
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});

cancelButton.addEventListener('click', () => {
    firstStage();
    input.value = '';
});

list.addEventListener('click', (e) => {
    const target = e.target;

    if (!target.classList.contains('li-item') && 
        target.className !== 'square' && 
        !target.classList.contains('fa-solid')) {return;}

    const todoId = Number(target.parentElement.id) || Number(target.id);

    const action = target.dataset.action;
    console.log(action);
    if (action === 'check') {
        checkTodo(todoId);
    }

    if (action === 'delete') {
        deleteTodo(todoId);
    }
});

function firstStage() {
    popup.classList.remove('show');
    list.style.opacity = '';
    popupButton.classList.remove('hide');
    addButton.classList.add('hide');
    cancelButton.classList.add('hide');
}

function saveTodo() {
    const isDuplicate = todos.some((todo) => todo.value === input.value);

    if (input.value === '') {
        alert('Todo is empty');
        input.focus();
    } else if (isDuplicate) {
        alert('Todo already exists');
    } else {
        const todo = {
            value: input.value,
            checked: false
        };
    
        todos.push(todo);
        input.value = '';
        firstStage();
    }
}

function renderTodos() {
    list.innerHTML = '';
    todos.forEach((todo, index) => {
        list.innerHTML += `
            <li class="li-item ${todo.checked ? "completed" : ""}" data-action="check" id="${index}">
                <div class="square" data-action="check">${todo.checked ? `<i class="fa-solid fa-check" style="color: #ffffff;"></i>` : ""}</div>
                <i class="fa-solid fa-xmark" data-action="delete"></i>
            ${todo.value}
            </li>
        `;
    });
}

function checkTodo(todoId) {
    todos = todos.map((todo, index) => ({
            ...todo,
            checked: index === todoId ? !todo.checked : todo.checked,
    }));

    renderTodos();
    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodo(todoId) {
    todos = todos.filter((todo, index) => index !== todoId);
    renderTodos();
    localStorage.setItem('todos', JSON.stringify(todos));
}