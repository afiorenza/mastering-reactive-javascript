const { fromEvent, merge } = require('rxjs');
const { mapTo, scan, delay } = require('rxjs/operators');

const addButton = document.getElementById('add_button');
const substractButton = document.getElementById('substract_button');
const counterNode = document.getElementById('counter');

const addButtonClick = fromEvent(addButton, 'click')
    .pipe(
        delay(500),
        mapTo(+1)
    );
const substractButtonClick = fromEvent(substractButton, 'click')
    .pipe(
        mapTo(-1)
    );

merge(
    addButtonClick,
    substractButtonClick
)
    .pipe(
        scan((accumulator, value) => accumulator + value, 0)
    )
    .subscribe(value => counterNode.textContent = value);
