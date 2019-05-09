/*
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


// Callbacks
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


// CALLBACK HELL
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


// Promises
const promise = new Promise((resolve, reject) => {
  // kick off some async work
  // ...
  //resolve('resolved :)');
  reject(new Error('rejected :('));
});

promise
  .then(res => console.log('Result', res))
  .catch(err => console.log('Error', err.message));



// Creating settled promise
//const promise = Promise.reject(new Error('Rejected :('));
const promise = Promise.reject('Rejected :(');
promise.catch(err => console.log(err));


// Parallel Promises
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

*/

// Async/await
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


function getUser(id){
  return new Promise((resolve, reject) => {
    // Kick off some async work
    console.log('\nReading a user from database [waiting...]');
    setTimeout(() => {
      resolve({ id: id, githubUsername: 'Biprodas' });
      reject(new Error('Could not get the username :('));
    }, 5000);
  })
}

function getRepositories(username){
  return new Promise((resolve, reject) => {
    console.log('\nGetting github repositories of ' + username + ' [waiting...]');
    setTimeout(() => {
      resolve(['Node masterclass', 'mastering react', 'MERN front to back']);
      reject(new Error('Could not get the repos :('));
    }, 5000);
  });
}

function getCommits(repo){
  return new Promise((resolve, reject) => {
    console.log('\nGetting commits of ' + repo + ' [waiting...]');
    setTimeout(() => {
      resolve([{ commit_1: 'initial commit' }, {commit2: 'something changed'}]);
      reject(new Error('Could not get commits :('));
    }, 5000);
  })
}
