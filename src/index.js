const Rx = require('rx');

const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo-button');
const todosList = document.getElementById('todos-list');


const todoInputKeyUpObservable = Rx.Observable.fromEvent(todoInput, 'keyup')
  .filter(event => event.keyCode === 13)
  .pluck('target', 'value');

const addTodoButtonObservable = Rx.Observable.fromEvent(addTodoButton, 'click')
  .map(() => todoInput.value)

todoInputKeyUpObservable
  .merge(addTodoButtonObservable)
  .filter(value => value.trim() !== '')
  .scan((todos, value) => [...todos, value], [])
  .subscribe((todos) => {
    todosList.textContent = null;

    todos.map(todo => {
      const liNode = document.createElement('li');

      liNode.textContent = todo;
      todosList.appendChild(liNode);
    });

    todoInput.value = '';
  })
