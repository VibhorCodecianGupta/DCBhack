var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require ('body-parser');
var morgan = require('morgan');
var port = process.env.PORT || 3000

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req,res){
  res.send('hello');
});
app.listen(port);
console.log('Magic happens on port ' + port);
