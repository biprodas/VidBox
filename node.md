# Node cook-book

## Building RESTful APIs using Express
> **REST**: REprestational State Transfer  
> **API**: Application Programming Interface  
> **CRUD**: Create, Read, Update, Delete

### HTTP Methods: REST defines a set of conventions for creating HTTP services
  - `POST`: to create a resource
  - `PUT`: to update it
  - `GET`: to read it
  - `DELETE`: to delete it

### Examples
```bash
# Get all the users
GET /api/users
# get a user of id 1
GET /api/users/1
# update the user of id 1
PUT /api/users/1
# delete user of id 1
DELETE /api/user/1
# create a new user
POST /api/users
```

#### GET users
```bash
# Request
GET /api/users

# Response
[
  { id: 1, name: 'Biprodas'},
  { id: 2, name: 'Hiranmoy'},
]
```

#### GET a user
```bash
# Request
GET /api/users/1

# Response
{ id: 1, name: 'Biprodas'}
```

#### UPDATE a user
```bash
# Request
PUT /api/users/1

{ name: 'biprodasroy'}

# Response
{ id: 1, name: 'biprodasroy '}
```

#### DELETE a user
```bash
# Request
DELETE /api/users/1

# Response
```

#### CREATE a user
```bash
# Request
POST /api/users

{ name: 'biprodasroy'}

# Response
{ id: 1, name: 'Biprodas'},
```

> Express is a simple, minimalistic and lightweight framework for building web servers.
```bash
# Build a web server
const express = require('express');
const app = express();

# Creating a course
app.post('/api/courses', (req, res) => {
    # Create the course and return the course object
    resn.send(course);
});

# Getting all the courses
app.get('/api/courses', (req, res) => {
    # To read query string parameters (?sortBy=name)
    const sortBy = req.query.sortBy;
    # Return the courses
    res.send(courses);
});

# Getting a single course
app.get('/api/courses/:id', (req, res) => {
    const courseId = req.params.id;
    # Lookup the course
    # If not found, return 404
    res.status(404).send('Course not found.');
    # Else, return the course object
    res.send(course);
});

# Updating a course
app.put('/api/courses/:id', (req, res) => {
    # If course not found, return 404, otherwise update it
    # and return the updated object.
});

# Deleting a course
app.delete('/api/courses/:id', (req, res) => {
    # If course not found, return 404, otherwise delete it
    # and return the deleted object.
});

# Listen on port 3000
app.listen(3000, () => console.log('Listening on port 3000...'));

```
- We use Nodemon to watch for changes in files and automatically restart the node process.
- We can use environment variables to store various settings for an application. To read an environment variable, we use process.env.
```bash
# Reading the port from an environment variable
const port = process.env.PORT || 3000;
app.listen(port);
```

- You should never trust data sent by the client. Always validate! Use Joi package to perform input validation.


## Express: Advanced Topics

- [ ] Middleware
- [ ] Environment
- [ ] Configuration
- [ ] Debugging
- [ ] Templating Engine
- [ ] Database Integration
- [ ] Authentication

### Middleware function

A middleware function is a function that takes a request object and either terminates the request/response cycle or passes control to another middleware function.

#### Custom middleware
You can create custom middleware for cross-cutting concerns, such as logging, authentication, etc.
```bash
# Custom middleware (applied on all routes)
app.use(function(req, res, next)) {
  # ...
  next();
}

# Custom middleware (applied on routes starting with /api/admin)
app.use('/api/admin', function(req, res, next)) {
    # ...
    next();
}

```

#### Built in middleware

Express has a few built-in middleware functions:
- json(): to parse the body of requests with a JSON payload
- urlencoded(): to parse the body of requests with URL-encoded payload
- static(): to serve static files
- 
#### Third-party middleware

- helmet
- morgan 
and many more...

### Environments

We can detect the environment in which our Node application is running (development, production, etc) using process.env.NODE_ENV and app.get(‘env’).

```js
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);
```

### Configuration

The config package gives us an elegant way to store configuration settings for our applications.

### Debugging

- We can use the debug package to add debugging information to an application. Prefer this approach to console.log statements.
  
### Templating Engine

- [ ] Pug
- [ ] Mustache
- [ ] EJS

- To return HTML markup to the client, use a templating engine. There are various templating engines available out there. Pug, EJS and Mustache are the most popular ones.


## [Asynochoronous JavaScript](asyncJavaScript.md)


## Mongo DB
- MongoDB is an open-source document database. It stores data in flexible, JSONlike documents.  
- In relational databases we have tables and rows, in MongoDB we have collections and documents. A document can contain sub-documents.  
- We don’t have relationships between documents.  

### Mongo DB Connection
```bash
# Connecting to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Connection failed...'));
```

### Schema
> To store objects in MongoDB, we need to define a Mongoose schema first. The schema defines the shape of documents in MongoDB.

```bash
# Defining a Schema
const courseSchema = new mongoose.Schema({
    name: String,
    price: Number
});

# We can use a SchemaType object to provide additional details:
# Using a SchemaType object
const courseSchema = new mongoose.Schema({
    isPublished: { 
      type: Boolean,
      default: false 
    }
});

# Supported types are: `String`, `Number`, `Date`, `Buffer` (for storing binary data), `Boolean` and `ObjectID`.
```

### Model
> Once we have a schema, we need to compile it into a model. A model is like a class. It’s a blueprint for creating objects.

```bash
# Creating a model
const Course = mongoose.model('Course', courseSchema);
```

### CRUD Operations
```bash
# Saving a document
let course = new Course({ name: 'Node.js' });
course = await course.save();

# Querying documents
const courses = await Course
    .find({ author: 'Biprodas', isPublished: true })
    .skip(10)
    .limit(10)
    .sort({ name: 1, price: -1 })
    .select({ name: 1, price: 1 });

# Updating a document (query first)
const course = await Course.findById(id);
if (!course) return;
course.set({ name: 'Mastering Node.js' });
course.save();

# Updating a document (update first)
const result = await Course.update({ _id: id }, {
    $`set`: { name: '...' }
});

# Updating a document (update first) and return it
const result = await Course.findByIdAndUpdate({ _id: id }, {
    $`set`: { name: '...' }
}, { new: true });

# Removing a document
const result = await Course.deleteOne({ _id: id });
const result = await Course.deleteMany({ _id: id });
const course = await Course.findByIdAndRemove(id);
```


### Mongoose: Data Validation
When defining a schema, you can set the type of a property to a SchemaType object. You use this object to define the validation requirements for the given property.

```bash
# Adding validation
new mongoose.Schema({
    name: { 
      type: String, 
      required: true 
    }
})
```

- Validation logic is executed by Mongoose prior to saving a document to the database. You can also trigger it manually by calling the validate() method.
- Built-in validators:
  - Strings: minlength, maxlength, match, enum
  - Numbers: min, max
  - Dates: min, max
  - All types: required

```bash
# Custom validation
tags: [
    type: Array,
    validate: {
        validator: function(v) { return v && v.length > 0; },
        message: 'A course should have at least 1 tag.'
    }
]
```

- If you need to talk to a database or a remote service to perform the validation, you need to create an async validator:

```bash
validate: {
    isAsync: true
    validator: function(v, callback) {
        # Do the validation, when the result is ready, call the callback
        callback(isValid);
    }
}
```

- Other useful SchemaType properties:
  - Strings: lowercase, uppercase, trim
  - All types: get, set (to define a custom getter/setter)

```bash
price: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v)
}
```


### Mongoose: Modelling Relationships between Connected Data

- To model relationships between connected data, we can either reference a document or embed it in another document.
- When referencing a document, there is really no relationship between these two documents. So, it is possible to reference a non-existing document.
- Referencing documents (normalization) is a good approach when you want to enforce data consistency. Because there will be a single instance of an object in the database. But this approach has a negative impact on the performance of your queries because in MongoDB we cannot JOIN documents as we do in relational databases. So, to get a complete representation of a document with its related documents, we need to send multiple queries to the database.
- Embedding documents (denormalization) solves this issue. We can read a complete representation of a document with a single query. All the necessary data is embedded in one document and its children. But this also means we’ll have multiple copies of data in different places. While storage is not an issue these days, having multiple copies means changes made to the original document may not propagate to all copies. If the database server dies during an update, some documents will be inconsistent. For every business, for every
problem, you need to ask this question: “can we tolerate data being inconsistent for a short period of time?” If not, you’ll have to use references. But again, this means that your queries will be slower.

#### Normalization
```js
// Referencing a document
const courseSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
})
```
#### Denormalization

```js
// Referencing a document (Normalization) => CONSISTENCY
const courseSchema = new mongoose.Schema({
  author: {
    type: new mongoose.Schema({
      name: String,
      bio: String
    })
  }
})
```

#### Trade of between query performance vs consistency

- Embedded documents don’t have a save method. They can only be saved in the context of their parent.

```bash
# Updating an embedded document (Denormalization) =>   PERFORMANCE
const course = await Course.findById(courseId);
course.author.name = 'New Name';
course.save();
```

- We don’t have transactions in MongoDB. To implement transactions, we use a pattern called "Two Phase Commit". If you don’t want to manually implement this pattern, use the Fawn NPM package:

```bash
# Implementing transactions using Fawn
try {
  await new Fawn.Task()
    .save('rentals', newRental)
    .update('movies', { _id: movie._id }, { $`inc`: numberInStock: -1 })
    .run();
  }
catch(ex) {
  # At this point, all operations are automatically rolled back
}
```

- ObjectIDs are generated by MongoDB driver and are used to uniquely identify a document. They consist of 12 bytes:
- 4 bytes: timestamp
- 3 bytes: machine identifier
- 2 bytes: process identifier
- 3 byes: counter
- ObjectIDs are almost unique. In theory, there is a chance for two ObjectIDs to be
equal but the odds are very low (1/16,000,000) for most real-world applications.
```bash
# Validating ObjectIDs
mongoose.Types.ObjectID.isValid(id);
```
- To validate ObjectIDs using joi, use joi-objectid NPM package.


## Authentication and Authorization

**Register: ** `POST` /api/users
**Login: ** `POST` /api/logins


## Hangling and Loggin Errors

- Our applications don't run in an ideal world. Unexpected result can happen as a result of bugsin out code or issues in the running environment.
For example: our mongoDB server may shut down, or a remote http service we call may go down.

- A good developers should count for these unsexpected errors, log them and return a proper error to the client.

- Use the unexpected error middleware to catch any unhandled exceptions in the "request processing pipeling".

Register the error middleware after all the existing routes:

```js
app.use(function(err, req, res, next){
  // Log the exception and return a friendly error to the client
  res.status(500).sent('SOmething failed :(');
});
```

- To pass control to the error middleware, wrap the route handler code in a try-catch block and call next().

```js
try{
  const genre = await Genre.find();
  ...
}
catch(ex){
  next(ex);
}
```

- Adding a try-catch to every route handler is repetitive and time consumming. Use `express-async-errors` module. This module will monkey-patch your route handlers at runtime. It'll wrap your code within a try/catch block and pass unhandled errors to your middleware.

- To log errors use [winston]()

- Winston can log errors in multiple transports. A transport is where our log is stored.

- The core tranports that come with winston are **Console**, **File** and **Http**. There are also 3rd-party transports for storing logs in MongoDB, CoutchDB, Redis and Loggly.

- The error middleawre in express only catches exceptions in the request processing pipeline. Any errors happening during the application startup (eg connecting to MongoDB) will be invisible to express.

- Use `process.on('uncaughtException')` to catch unhandled exceptions, and `process.on('unhandledRejection')` to catch rejected promise.

- As a best practice, in the event handlers you pass to `process.on()`, your should log the exception and exit the process, because your process may be in an unclean state and it may result in more issues in the future. It's better to restart the process in a clean state.
In production you can use a process manager to autometically restart the node process.


## Testing
- Tests are first-class citizens in our source code

### Unit Testing

- Automated testing is the practice of writing code to test our code.
- Automated tests help us deliver software with fewer bugs and of better quality.
They also help us refactor our code with confidence.
- [Jest]() is a new trending popular testing framework recommended by Facebook. It
comes with everything you need to write automated tests.
- We have 3 types of automated tests:
1. ***Unit tests:*** Test a unit of an application without external resources (eg db)
2. ***Integration tests:*** Test the application with external resources.
3. ***Functional or end-to-end tests:*** Test the application through its UI.
- Tests should not be too general nor too specific. If they’re too general, they don’t
give you much confidence that your code works. If they’re too specific, they
become fragile and can break easily. As you write code, you have to spend extra
unnecessary time to fix these broken tests.
- Mocking is replacing a real implementation of a function with a fake or mock
function. It allows us to isolate our application code from its external resources.
- Popular Jest matcher functions:
```js
// Equality
expect(...).toBe();
expect(...).toEqual();
// Truthiness
expect(...).toBeDefined();
expect(...).toBeNull();
expect(...).toBeTruthy();expect(...).toBeFalsy();
// Numbers
expect(...).toBeGreaterThan();
expect(...).toBeGreaterThanOrEqual();
expect(...).toBeLessThan();
expect(...).toBeLessThanOrEqual();
// Strings
expect(...).toMatch(/regularExp/);
// Arrays
expect(...).toContain();
// Objects
expect(...).toBe(); // check for the equality of object references
expect(...).toEqual(); // check for the equality of properties
expect(...).toMatchObject();
// Exceptions
expect(() => { someCode }).toThrow();
```

### Interation Test

- Unit tests are easy to write, fast to execute and are ideal for testing functions with
minimal or zero dependency on external resources.
- The more you use mock functions, the more your tests get coupled to the current
implementation. If you change this implementation in the future, your tests will
break. If you find yourself doing too much mocking, that’s when you need to
replace your unit test with an integration test.
- With integration tests, we test our application with a real database. As a best
practice, separate your test database from the development or production
databases.
- You should write each integration test as if it is the only test in the world. Start
with a clean state (database). Populate the database only with the data required
by the test. Nothing more, nothing less. Clean up after your test using the
afterEach function.
- Run `jest` with —coverage flag to get a code coverage report.

### Tooling 

#### Library and Frameworks
- [ ] Jasmine
- [ ] Mocha, Sinon, chai
- [ ] Jest

#### Test Runner