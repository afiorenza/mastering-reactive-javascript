const Rx = require('rx');

// Rx.Observable
//     .interval(50)
//     .bufferWithCount(10)
//     .subscribe((arr) => console.log(arr));

// let subject = new Rx.Subject();
// let bufferedObservable = subject.bufferWithCount(2);

// bufferedObservable.subscribe(
//     (i) => console.log(i),
//     (err) => console.log('An error happened ' + err.message),
//     () => console.log('Finished')
// );

// subject.onNext(0);
// subject.onNext(1);
// subject.onNext(2);
// subject.onError(new Error(':('));
// subject.onNext(3);
// subject.onCompleted();

const randomNumbersObservable = Rx.Observable
    .interval(100)
    .take(10)
    .map((i) => Math.floor(Math.random() * 100));

randomNumbersObservable
    .bufferWithCount(5, 1)
    .map((arr) => {
        console.log(arr)
        var sum = arr.reduce((acc, b) => acc + b);
        return sum / arr.length;
    })
    .subscribe((i) => console.log('The average of the last five items is: ' + i));
