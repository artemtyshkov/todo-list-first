import renderTodos from "./renderTodos.js";

const newTaskButton = document.querySelector(".main-content__buttons_new");
const cancelButton = document.querySelector(".main-content__buttons_cancel");
const addButton = document.querySelector(".main-content__buttons_add");
const todoList = document.querySelector(".todo-list");
const input = document.querySelector(".main-content__input");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

renderTodos(todoList, todos);

newTaskButton.addEventListener("click", () => {
    input.classList.add("show");
    input.focus();
    todoList.style.opacity = "0.5";
    newTaskButton.classList.add("hide");
    addButton.classList.remove("hide");
    cancelButton.classList.remove("hide");

    if (!input.classList.contains("show")) {
        todoList.style.opacity = "";
    }
});

addButton.addEventListener("click", () => {
    saveTodo(todos, input);
    renderTodos(todoList, todos);
    localStorage.setItem("todos", JSON.stringify(todos));
});

input.addEventListener("keyup", (e) => {
    if (e.code === "Enter" && input.value === "") {
        alert("Todo is empty");
        input.focus();
    } else if (e.code === "Enter") {
        saveTodo(todos, input);
        renderTodos(todoList, todos);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
});

cancelButton.addEventListener("click", () => {
    firstStage();
    input.value = "";
});

todoList.addEventListener("click", (e) => {
    const target = e.target;

    if (
        !target.classList.contains("todo-list__item") &&
        target.className !== "todo-list__item-square" &&
        !target.classList.contains("fa-check") &&
        !target.classList.contains("fa-xmark")
    )
        return;

    const todoId = Number(target.parentElement.id) || Number(target.id);

    const action = target.dataset.action;

    if (action === "check") {
        checkTodo(todoId);
    }

    if (action === "delete") {
        deleteTodo(todoId);
    }
});

function firstStage() {
    input.classList.remove("show");
    todoList.style.opacity = "";
    newTaskButton.classList.remove("hide");
    addButton.classList.add("hide");
    cancelButton.classList.add("hide");
}

function checkTodo(todoId) {
    todos = todos.map((todo, index) => ({
        ...todo,
        checked: index === todoId ? !todo.checked : todo.checked,
    }));

    renderTodos(todoList, todos);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(todoId) {
    todos = todos.filter((todo, index) => index !== todoId);
    renderTodos(todoList, todos);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function saveTodo(todos, input) {
    const isDuplicate = todos.some((todo) => todo.value === input.value);

    if (input.value === "") {
        alert("Todo is empty");
        input.focus();
    } else if (isDuplicate) {
        alert("Todo already exists");
    } else {
        const todo = {
            value: input.value,
            checked: false,
        };

        todos.push(todo);
        input.value = "";
        firstStage();
    }
}
