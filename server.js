const express = require('express');
const path = require('path');
const multer = require('multer')
const routes = require('./routes/index');
var upload = multer({ dest: 'uploads/' })
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use('/', routes);
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.post('/housekeeping', upload.array('files', 3), function (req, res) {
//     console.log('housekeeping post called222')
//     console.log(req.files)
// });

// app.listen(3000);
console.log(process.env.PORT)
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});