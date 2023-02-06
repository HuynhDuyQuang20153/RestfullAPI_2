var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var port = 8080;

// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.nodearray());

var pro = require('./products.js');

app.use('/ProductService1', pro);

app.listen(port, function(err){
    if (err) console.log(err);
    console.log(`Server listening on PORT ${port}`);
  });