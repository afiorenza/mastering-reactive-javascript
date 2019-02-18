const Rx = require('rx');

console.log('generate = ');
Rx.Observable
    .generate(
        0,
        i => i < 3,
        i => i + 1,
        i => i
    ).subscribe(console.log);

console.log('range = ');

Rx.Observable
    .range(0, 4)
    .subscribe(console.log);

console.log('interval =');

Rx.Observable
    .interval(1000)
    .take(2)
    .subscribe(console.log);

console.log('timer = ');
Rx.Observable
    .timer(1000, 500)
    .subscribe(console.log);
