export default function renderTodos(todoList, todos) {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        todoList.innerHTML += `
            <li class="todo-list__item ${
                todo.checked ? "completed" : ""
            }" data-action="check" id="${index}">
                <div class="todo-list__item-square" data-action="check">${
                    todo.checked
                        ? `<i class="fa-solid fa-check" style="color: #fff;"></i>`
                        : ""
                }</div>
                <i class="fa-solid fa-xmark" data-action="delete"></i>
            ${todo.value}
            </li>
        `;
    });
}