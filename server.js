var express = require('express');
var app = express();
var path = require('path');

//app viewed at localhost:8080

app.get('/', function(res,req){
  res.sendFile(path.join('/index.html'));
});

app.listen(8080);
