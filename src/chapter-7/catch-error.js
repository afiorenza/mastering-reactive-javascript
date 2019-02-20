const Rx = require('rx');

Rx.Observable.onErrorResumeNext(
  Rx.Observable.throw(new Error('An error occurred')),
  Rx.Observable.throw(new Error('An error occurred')),
  Rx.Observable.throw(new Error('An error occurred')),
  Rx.Observable.just('Hello')
).subscribe(
  (m) => console.log(m),
  (e) => console.log('Error found')
);

// Rx.Observable
//   .throw(new Error('An error occurred'))
//   .catch(Rx.Observable.just('Hello'))
//   .subscribe(
//     (data) => console.log(data),
//     () => console.log('1- ERROR'),
//     () => console.log('finished')
//   );

// let observer = Rx.Observer
//   .create(
//     (data) => console.log(data),
//     () => console.log('2- ERROR'),
//     () => console.log('finished')
//   );
// Rx.Observable
//   .throw(new Error('An error occurred'))
//   .subscribe(observer);
