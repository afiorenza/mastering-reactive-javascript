const Rx = require('rx');
const _ = require('lodash');

const todosDataSource = new Rx.Subject()

module.exports = {
  add: text => {
    todosDataSource
      .onNext({
        deleted: false,
        done: false,
        id: _.uniqueId(),
        text
      });
  },

  remove: id => {
    console.log('--- id ', id);

    todosDataSource
      .map(todo => {
        console.log('hola')
        return todo
      });
  },

  get: () => {
    return todosDataSource;
  }
};
