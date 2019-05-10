const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB..'))
  .catch(err => console.log('Could not connect to MongoDB :('));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

async function createAuthor(name, bio, website){
  const author = new Author({
    name, 
    bio, 
    website
  });
  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author){
  const course = new Course({
    name,
    author
  });
  const result = await course.save();
  console.log(result);
}

async function listAuthor(){
  const author = await Author.find().sort('name');
  console.log(author);
}

async function listCourses(){
  const courses = await Course
    .find()
    .populate('author', 'name -_id')
    .sort('name')
    .select('name author');
  console.log(courses);
}

//createAuthor('Biprodas', 'I am biprodas roy', 'biprodas.me');
//createCourse('Node masterclass', '5cd5190597503509b8f5f108');

listCourses();