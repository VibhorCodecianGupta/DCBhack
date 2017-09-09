var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require ('body-parser');
var morgan = require('morgan');
var port = process.env.PORT || 3000
var routes = require('./controller.js');

app.use(morgan('dev'));

app.use(routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.listen(port);
console.log('Magic happens on port ' + port);
