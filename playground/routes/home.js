const express = require('express');
const router = express.Router();

// Test api
router.get('/', (req, res) => {
  //res.send('<h3>Hello Node..<h3>');
  const obj = {
    title: 'My Express App',
    message: 'Hello pug!!'
  };
  res.render('index', obj);
});


module.exports = router;