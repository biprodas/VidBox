/*
const promise = new Promise((resolve, reject) => {
  // kick off some async work
  console.log('PEOMISE');
  // ...
  resolve('resolved :)');
  reject(new Error('rejected :('));
});

promise
  .then(res => console.log('Result', res))
  .catch(err => {
    console.log('waiting...');
    setTimeout(() => {
      console.log('Error:', err.message)
    }, 3000);
  });
  */

// Paallel Promises
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 1...');
    resolve('resolved op-1 :)');
    reject(new Error('op-1 rejected :('));
  }, 3000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 2...');
    resolve('resolved op-2 :)');
    reject(new Error('op-2 rejected :('));
  }, 2000);
});

Promise.all([p1, p2])
  .then(res => console.log(res))
  .then(err => console.log(err));