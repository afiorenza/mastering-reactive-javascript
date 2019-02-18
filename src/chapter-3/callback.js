const Rx = require('rx');

const asnycHelloWorld = (name, callback) => setTimeout(() => {
    return callback(null, `Hello ${name}`);
}, 1000);

// Old pattern
// asnycHelloWorld('agustin', (error, result) => {
//     console.log(error, result);
// });

const callbackObservable = Rx.Observable
    .fromCallback(asnycHelloWorld);

callbackObservable('world')
    .map(([error, result]) => result)
    .subscribe(console.log);
