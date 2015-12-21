// server.js
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// index page 
app.get('/favicon.ico', function(req, res) {
    res.sendFile(__dirname + '/views/img/favicon.ico');
});

// other pages
app.get('/:page', function(req, res) {
    res.render('pages/'+req.params.page);
});

app.listen(8080);
console.log('listening http://localhost:8080');

/*var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname+'/assets')).listen(8080);

// views is directory for all template files
app.set('views', __dirname + '/assets');
app.set('view engine', 'ejs');

console.log('listening http://localhost:8080');*/