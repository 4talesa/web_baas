var express = require('express');
var app = express();
var fs = require("fs");

// import the language driver
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

// Connection URL for local mongodb server
var url = 'mongodb://127.0.0.1:27017/webinar';

// Suport for body variables
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Enable Cors
//var cors = require('cors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/listUsers', function (req, res, next) {
	
	console.log( "/listUsers/" );
	
	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		//ensure we've connected
		assert.equal(null, err);
		
		var userData = db.collection('user');
		var result = userData.find({}).sort( { name: 1 });
		
		var userArray = [];

		result.each(function(err,doc){
			assert.equal(err,null);
			
			if (doc){				
				userArray.push(doc);
			}else{
				res.writeHead(200, { 'Content-Type': 'application/json' });
				console.log( userArray );
				res.write(JSON.stringify(userArray));
				res.end();				
			}			
		});		
	});
})

app.post('/addUser', function (req, res, next) {
	
	console.log( "/addUser/" );
	
	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		//ensure we've connected
		assert.equal(null, err);

		var userData = db.collection('user');
		
		var userAdd = [];
		
		userData.insertOne({
			name: req.body.name,
			password: req.body.password,
			profession: req.body.profession,
			id: req.body.id
		}, function (err, op_result) {

			if (err) {
				return console.error(err);
			}

			console.log('inserted:');
			userAdd = op_result.ops[0];			
			
			res.writeHead(200, { 'Content-Type': 'application/json' });			
			res.write(JSON.stringify(userAdd));
			console.log(userAdd);
			res.end();
		});
	});	   
})

app.get('/getUser/:id', function (req, res, next) {
	
	console.log( "/getUser/" + req.params.id );
	
	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		//ensure we've connected
		assert.equal(null, err);
		
		var userData = db.collection('user');
		var result = userData.find({id: req.params.id});
		
		var userFound = [];
		var count = 0;
		
		result.each(function(err,doc){
			assert.equal(err,null);
			
			if (doc){
				
				userFound[count] = doc;
				count ++;
			}else{
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify(userFound));
				console.log( userFound );
				res.end();
			}			
		});		
	});
})

app.post('/delUser/:id', function (req, res, next) {

   console.log( "/delUser/" + req.params.id );
	
	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		//ensure we've connected
		assert.equal(null, err);
		
		var userData = db.collection('user');
		var result = userData.find({id: req.params.id});
		
		var userFound = [];
		var countdel = 0;
		
		result.each(function(err,doc){
			assert.equal(err,null);
			
			if (doc){
				doc.deleted = true;
				
				if (req.body.harddelete == "true"){
					
					doc.harddelete = true;
					userFound[countdel] = doc;
					countdel ++;
						
					userData.remove({ _id: doc._id }, function (err, count) {

						if (err) {
							console.error(err);
						}
					});
				}else{

				userFound[countdel] = doc;
				countdel ++;
					
					userData.updateOne({ _id: doc._id }, doc, { w: 1 }, function (err, op_result) {
						
					});
				}
			}else{
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify(userFound));
				console.log( userFound );
				res.end();
			}			
		});		
	});
})

app.post('/updUser/', function (req, res, next) {

   console.log( "/updUser/" );
	
	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		//ensure we've connected
		assert.equal(null, err);
		
		console.log( "find id: " + req.body.id);
		
		var userData = db.collection('user');
		var result = userData.find({id: req.body.id});
		
		var userFound = [];
		
		result.each(function(err,doc){
			assert.equal(err,null);
			
			if (doc){
				
				doc.name = req.body.name;
				doc.password = req.body.password;
				doc.profession = req.body.profession;				
				
				userFound = doc;
				
				userData.updateOne({ _id: doc._id }, doc, { w: 1 }, function (err, op_result) {
					
				});
			}else{
				res.writeHead(200, { 'Content-Type': 'application/json' });
				console.log( userFound );
				res.write(JSON.stringify(userFound));
				res.end();
			}			
		});		
	});
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})