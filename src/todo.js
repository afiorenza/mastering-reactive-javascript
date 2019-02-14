const { fromEvent } = require('rxjs');
const { filter, pluck, scan } = require('rxjs/operators');

const ENTER_KEY_CODE = 13;

const todoInput = document.getElementById('todo_input');
const todoList = document.getElementById('todo_list');

fromEvent(todoInput, 'keyup')
    .pipe(
        filter(e => e.keyCode === ENTER_KEY_CODE),
        pluck('target', 'value'),
        filter(value => value !== ''),
        scan((todos, value) => [...todos, value], [])
    )
    .subscribe(todos => {
        todoList.textContent = '';

        todos.map(value => {

            const liElement = document.createElement('li');

            liElement.textContent = value;

            todoList.appendChild(liElement);
        });

        todoInput.value = '';
    });
