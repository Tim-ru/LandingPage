const name = document.getElementById('name');
const focus = document.getElementById('focus');
const todoInput = document.querySelector('.todoInput');
const todoButton = document.querySelector('.todoButton');
const todoList = document.querySelector('.todo-list');

todoButton.addEventListener('click', addTodo);
        

function clock() {
    let hour = document.getElementById("hour");
    let minute = document.getElementById("minute");
    let second = document.getElementById("second");
    let day = document.getElementById("day");
    let month = document.getElementById("month");
    let year = document.getElementById("year");

    hour.innerHTML = addZero(new Date().getHours());
    minute.innerHTML = addZero(new Date().getMinutes());
    second.innerHTML = addZero(new Date().getSeconds());
    day.innerHTML = addZero(new Date().getDate());
    month.innerHTML = addZero(new Date().getMonth() + 1);
    year.innerHTML = addZero(new Date().getFullYear());

    setTimeout(clock, 1000);
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = "[Enter Name]";
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure Enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = "[Enter Focus]";
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
function setFocus(e) {
    if (e.type === 'keypress') {
        // Make sure Enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

// Todo list
function addTodo() {
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todoItem');
    todoDiv.appendChild(newTodo);
    // Add todo to local storage
    saveLocalTodos(todoInput.value);
    // Check mark button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<span class="material-icons">done</span>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    // Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<span class="material-icons">delete</span>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = ""
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

clock();
getName();
getFocus();

