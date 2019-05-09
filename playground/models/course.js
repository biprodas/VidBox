const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    minlength: 2,
    maxlength: 255
  },
  author: String,
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'desktop', 'network']
  },
  tags: {
    type: Array,
    validate: {
      //isAsync: true,
      validator: function(v){
        return v && v.length > 0;
      },
      message: 'A course should have at least one tag.'
    }
  },
  isPublished: Boolean,
  price: Number,
  date: { 
    type: Date, 
    default: Date.now 
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Vue masterclass',
    author: 'Mosh',
    category: '-',
    tags: ['vue', frontend],
    isPublished: false
  });

  try{
    const result = await course.save();
    console.log(result);
  }
  catch(ex){
    console.log(ex.message);
  }
}