const express = require('express');
const router = express.Router();

// Test api
router.get('/', (req, res) => {
  res.send('<h3>Hello Node..<h3>');
});


module.exports = router;