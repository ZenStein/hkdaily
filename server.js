const express = require('express');
const path = require('path');
const multer = require('multer')
var upload = multer({ dest: 'uploads/' })
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/housekeeping', upload.array('files', 3), function (req, res) {
    console.log('housekeeping post called222')
    console.log(req.files)
});

app.listen(3000);