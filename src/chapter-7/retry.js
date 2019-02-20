const request = require('request-promise');
const Rx = require('rx');

Rx.Observable.fromPromise(
  request('http://www.google.com')
).retry(3)
  .subscribe(
    (htmlPage) => console.log(htmlPage)
  );
