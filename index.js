const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('<h3>Hello Node..<h3>');
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));