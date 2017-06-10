const express = require('express');
const router = express.Router();

// Do work here
router.get('/test', (req, res) => {
  //res.send('Hey! It works!');
  //res.sendFile(path.join(__dirname, 'build', 'index.html'));
  //res.json({test: 'hit /test'})
  res.writeHead(301,
  {Location: 'http://google.com'}
);
res.end();
  
});
router.get('*', (req, res) => {
  //res.send('Hey! It works!');
  //res.sendFile(path.join(__dirname, 'build', 'index.html'));
  res.json({anything: 'hitmatch'})
});

module.exports = router;