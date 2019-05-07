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
*/


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

// Async/await
