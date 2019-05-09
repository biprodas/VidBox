# Asynchronous JavaScript

```js
console.log('Before');

setTimeout(() => {
  console.log('Reading a user from a database...');
}, 2000);

console.log('After');
```

## Async Pattern

```js
console.log('Before');

const user = getUser(1);
console.log(user); // undefined

console.log('After'); 


function getUser(id){
  setTimeout(() => {
    console.log('Reading a user from a database...');
    return { id: id, name: 'Biprodas' };
  }, 2000);
}
```

### Synchronous vs Asynchronous
```js
// Synchronous
console.log('Before');
const user = getUer();
const repos = getRepositories(user.githubUserName);
const commits = getCommits(repos[0]);
console.log('After');

// Asunchronous
console.log('Before);
const id = 1;
getUser(id, user => {
  getRepositories(user.githubUserName, repos => {
    getCommits(repo, commits => {
      // CALLBACK HELL
    });
  });
});
console.log('After');
```

- [ ] Callback
- [ ] Promises
- [ ] Async/await

### Callback

```js
console.log('Start');

getAuthor(1, author => {
  setTimeout(() => {
    console.log('author', author);
  }, 5000);
  getCourses(author, courses => {
    setTimeout(() => {
      console.log('Courses', courses);
    }, 5000);
  })
});

console.log('end');
console.log('but not the end'); 


function getAuthor(id, callback){
  setTimeout(() => {
    console.log('Reading a author from a database [waiting...]');
    callback({ id: id, name: 'Biprodas' });
  }, 1000);
}


function getCourses(author, callback){
  setTimeout(() => {
    console.log('Getting courses of author ' + author.name + ' [waiting...]');
    callback(['Node masterclass', 'mastering react', 'MERN front to back']);
  }, 7000);
}
```

### Callback hell


```js
console.log('Before');
const id = 1;
getUser(id, user => {
  getRepositories(user.githubUserName, repos => {
    getCommits(repos[0], commits => {
      // CALLBACK HELL
      displayCommits(commits);
      console.log('done');
    });
  });
});
console.log('After');


function getUser(id, callback){
  setTimeout(() => {
    console.log('Reading a user from database [waiting...]');
    callback({ id: 1, githubUserName: 'Biprodas' });
  }, 3000);
}

function getRepositories(username, callback){
  setTimeout(() => {
    console.log('Getting github repositories of ' + username + ' [waiting...]');
    callback(['Node masterclass', 'mastering react', 'MERN front to back']);
  }, 3000);
}

function getCommits(repo, callback){
  setTimeout(() => {
    console.log('Getting commits of a ' + repo + ' [waiting...]');
    callback([{ commit_1: 'initial commit' }, {commit2: 'something changed'}]);
  }, 3000);
}

function displayCommits(commits){
  console.log('commits ' + commits[0].commit_1);
}
```

### Promise

Holds the eventual result of an asynchronous operaion

`pending` -----(async operation)----> `resolved` / `rejected`

```js
const promise = new Promise((resolve, reject) => {
  // kick off some async work
  // ...
  resolve('resolved :)');
  reject(new Error('rejected :('));
});

promise
  .then(res => console.log('Result', res))
  .catch(err => console.log('Error', err));
```


### Replacing callbacks with promises

```js
function getUser(id){
  return new Promise((resolve, reject) => {
    // Kick off some async work
    console.log('Reading a user from database [waiting...]');
    setTimeout(() => {
      resolve({ id: id, githubUsername: 'Biprodas' });
      reject(new Error('Could not get the username :('));
    }, 5000);
  })
}

function getRepositories(username){
  return new Promise((resolve, reject) => {
    console.log('Getting github repositories of ' + username + ' [waiting...]');
    setTimeout(() => {
      resolve(['Node masterclass', 'mastering react', 'MERN front to back']);
      reject(new Error('Could not get the repos :('));
    }, 5000);
  });
}

function getCommits(repo){
  return new Promise((resolve, reject) => {
    console.log('Getting commits of ' + repo + ' [waiting...]');
    setTimeout(() => {
      resolve([{ commit_1: 'initial commit' }, {commit2: 'something changed'}]);
      reject(new Error('Could not get commits :('));
    }, 5000);
  })
}
```

### Consuming Promises

```js
console.log('After);
getUser(1)
  .then(user => getRepositories(user.githubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log(commits, 'done'))
  .catch(err => console.log('Error: ', err.message));
console.log('After);
```

### Creating Settled Promises
```js
const promise = Promise.reject(new Error('Rejected :('));
promise.then(res => console.log(res));
```

### Parallel Promises

```js
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
  ```

### Async/await

```js
console.log('Before');

async function displayCommits(){
  try{
    const user = await getUser(1);
    console.log('USER: ', user);
    const repos = await getRepositories(user.githubUsername);
    console.log('REPOS: ', repos);
    const commits = await getCommits(repos[0]);
    console.log('COMMITS: ', commits);
  }
  catch(err){
    console.log('Error: ', err.message);
  }
}

displayCommits();

console.log('After');
```


### Callbacks vs Promises vs Async/await

```js
// Callback-based approach
console.log('Before');
getUser(1, user => {
  getRepositories(user.githubUserName, repos => {
    getCommits(repos[0], commits => {
      console.log(commits, 'done');
    });
  });
});
console.log('After');

// Promise-based approach
console.log('After);
getUser(1)
  .then(user => getRepositories(user.githubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log(commits, 'done'))
  .catch(err => console.log('Error: ', err.message));
console.log('After);

// Async and Await approach
console.log('Before');
async function displayCommits(){
  const user = await getUser(1);
  const repos = await getRepositories(user.gothubUsername);
  const commits = await getCommits(repos[0]);
  console.log(commits);
}

displayCommits();

console.log('After');
```