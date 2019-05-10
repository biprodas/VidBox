const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB..'))
  .catch(err => console.log('Could not connect to MongoDB :('));


const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});
const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors){
  const course = new Course({
    name,
    authors
  });
  const result = await course.save();
  console.log(result);
}

async function updateAuthor(courseId){
  //const course = await Course.findById(courseId);
  //course.author.name = "Biprodas Roy";
  //course.save();

  // Update directly
  const course = await Course.update({ _id: courseId }, {
    $set: {
      'author.name': 'John Smith'
    }
  });
  console.log(course);
}

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

async function listCourses(){
  const courses = await Course
    .find()
    .sort('name')
  console.log(courses);
}

/*
createCourse('Node masterclass', [
  new Author({ name: 'Mosh' }),
  new Author({ name: 'Biprodas' })
]);
*/
//updateAuthor('5cd5231b4e9dd50ec0eb92ef');

//addAuthor('5cd528d22b39dc105fe0222e', new Author({ name: "John" }));

//removeAuthor('5cd528d22b39dc105fe0222e', '5cd528fc20bb401073fee0c6');

listCourses();