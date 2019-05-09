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
    setTimeout(() => {
      console.log('\nReading a user from database [waiting...]');
    }, 1000);
    setTimeout(() => {
      resolve({ id: id, githubUsername: 'Biprodas' });
      reject(new Error('Could not get the username :('));
    }, 5000);
  })
}

function getRepositories(username){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('\nGetting github repositories of ' + username + ' [waiting...]');
    }, 1000);
    setTimeout(() => {
      resolve(['Node masterclass', 'mastering react', 'MERN front to back']);
      reject(new Error('Could not get the repos :('));
    }, 5000);
  });
}

function getCommits(repo){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('\nGetting commits of ' + repo + ' [waiting...]');
    }, 1000);
    setTimeout(() => {
      resolve([{ commit_1: 'initial commit' }, {commit2: 'something changed'}]);
      reject(new Error('Could not get commits :('));
    }, 5000);
  })
}
