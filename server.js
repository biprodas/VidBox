const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());


const courses = [
  { id: 1, name: 'Node.js masterclass', author: 'Mosh'},
  { id: 2, name: 'Mastering React', author: 'Mosh'},
  { id: 3, name: 'MERN - front to back', author: 'Brad'},
  { id: 4, name: 'Git & github tutorial', author: 'Shaun'},
  { id: 5, name: 'SQL masterclass', author: 'Mosh'},
  { id: 6, name: 'Complete React with Redux', author: 'Shaun'},
  { id: 7, name: 'Node-drill with MongoDB and React-Redux', author: 'Biprodas'},
  { id: 8, name: 'MongoDB crash course', author: 'Brad'}
]

// Test api
app.get('/', (req, res) => {
  res.send('<h3>Hello Node..<h3>');
});

// get all the courses
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// create a new course
app.post('/api/courses', (req, res) => {
  // Validation
  const { error } = validateCourse(req.body);
  if(error) return res.status(404).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
    author: req.body.author
  };
  courses.push(course);
  res.send(course);
});

// get a course by id
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The course with the given ID wan not found');
  res.send(course);
});

// update course by id
app.put('/api/courses/:id', (req, res) => {
  // Look up the course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  // if not existing, return 404
  if(!course) return res.status(404).send('The course with the given ID wan not found');

  // Validation
  const { error } = validateCourse(req.body);
  //if invalid, return 400 - Bad request
  if(error) return res.status(404).send(error.details[0].message);

  // Update course
  course.name = req.body.name;
  course.author = req.body.author
  // Return the updated course
  res.send(course);
});

// delete a user by id
app.delete('/api/courses/:id', (req, res) => {
  // Look up the course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  // if not existing, return 404
  if(!course) return res.status(404).send('The course with the given ID wan not found');

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Return the deleted course
  res.send(course);
})

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
    author: Joi.string().min(3).required()
  }
  return Joi.validate(course, schema);
}

// Listening on port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));