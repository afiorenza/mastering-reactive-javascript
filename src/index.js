const Rx = require('rx');

const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo-button');
const todosList = document.getElementById('todos-list');
const toggleAllButton = document.getElementById('done-all-button');

const todos = new Rx.BehaviorSubject([]);

const todoInputKeyUpObservable = Rx.Observable.fromEvent(todoInput, 'keyup')
  .filter(event => event.keyCode === 13)
  .pluck('target', 'value');

const addTodoButtonObservable = Rx.Observable.fromEvent(addTodoButton, 'click')
  .map(() => todoInput.value);

const toggleAllButtonObservable = Rx.Observable.fromEvent(toggleAllButton, 'click');

const toggleObservable = new Rx.Subject();

toggleObservable
  .subscribe(key => {
    todos.onNext([
      ...todos.value.slice(0, key),
      {
        ...todos.value[key],
        done: !todos.value[key].done
      },
      ...todos.value.slice(key + 1)
    ]);
  });

todoInputKeyUpObservable
  .merge(addTodoButtonObservable)
  .filter(value => value.trim() !== '')
  .subscribe(text => {
    todos.onNext([...todos.value, {
      done: false,
      text
    }]);

    todoInput.value = '';
  });

  toggleAllButtonObservable
    .subscribe(() => {
      todos.onNext(todos.value.map(todo => ({
        ...todo,
        done: true
      })));
    })

todos
  .subscribe((todos) => {
    todosList.textContent = null;

    todos.map(({ done, text }, key) => {
      const liNode = document.createElement('li');
      const checkboxNode = document.createElement('input');

      checkboxNode.type = 'checkbox';
      checkboxNode.checked = done;
      checkboxNode.onchange = () => toggleObservable.onNext(key);

      liNode.textContent = text;
      liNode.appendChild(checkboxNode);

      todosList.appendChild(liNode);
    });
  });
