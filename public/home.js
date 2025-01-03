document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('input');
    const ul = document.querySelector('ul');

    // Load saved todos from localStorage
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => addTodoToList(todo.text, todo.done));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            addTodoToList(text);
            saveTodoToStorage(text);
            input.value = '';
        }
    });

    function addTodoToList(text, done = false) {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const span = document.createElement('span');
        span.textContent = text;
        span.className = 'task';
        if (done) span.style.textDecoration = 'line-through';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';

        editButton.addEventListener('click', () => {
            const newText = prompt('Edit your to-do:', text);
            if (newText) {
                span.textContent = newText;
                updateTodoInStorage(text, newText);
            }
        });

        deleteButton.addEventListener('click', () => {
            li.remove();
            deleteTodoFromStorage(text);
        });

        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        ul.appendChild(li);
    }

    function saveTodoToStorage(text) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ text, done: false });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function updateTodoInStorage(oldText, newText) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const todo = todos.find(todo => todo.text === oldText);
        if (todo) todo.text = newText;
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function deleteTodoFromStorage(text) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const updatedTodos = todos.filter(todo => todo.text !== text);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
});
