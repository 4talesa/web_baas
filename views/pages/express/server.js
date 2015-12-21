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

app.get('/listUsers', function (req, res) {
	
	console.log( "/listUsers/" );
	
	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		//ensure we've connected
		assert.equal(null, err);
		
		var first = true;

		var userData = db.collection('user');
		var result = userData.find({});
		
		res.write('{');
		result.each(function(err,doc){
			assert.equal(err,null);
			
			if (doc){
				
				console.log( doc );
				
				res.write((first ? '' : ',') + '"user'+doc.id+'":' + JSON.stringify(doc));
				first = false;
			}else{
				res.write('}');
				res.end();
			}			
		});		
	});
})

app.post('/addUser', function (req, res) {
	
	console.log( "/addUser/" );
	
	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		//ensure we've connected
		assert.equal(null, err);
		
		var first = true;

		var userData = db.collection('user');
		
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
			console.log(op_result.ops[0]);
			res.end(JSON.stringify(op_result.ops[0]));
		});
	});	   
})

app.get('/getUser/:id', function (req, res) {
	
	console.log( "/getUser/" + req.params.id );
	
	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		//ensure we've connected
		assert.equal(null, err);
		
		var first = true;

		var userData = db.collection('user');
		var result = userData.find({id: req.params.id});
		
		res.write('{');
		result.each(function(err,doc){
			assert.equal(err,null);
			
			if (doc){
				
				console.log( doc );
				
				res.write((first ? '' : ',') + '"user'+doc.id+'":' + JSON.stringify(doc));
				first = false;
			}else{
				res.write('}');
				res.end();
			}			
		});		
	});
})

app.post('/delUser/:id', function (req, res) {

   console.log( "/delUser/" + req.params.id );
	
	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		//ensure we've connected
		assert.equal(null, err);
		
		var first = true;

		var userData = db.collection('user');
		var result = userData.find({id: req.params.id});
		
		res.write('{');
		result.each(function(err,doc){
			assert.equal(err,null);
			
			if (doc){
				
				if (req.body.harddelete = "true"){
					userData.remove({ _id: doc._id }, function (err, count) {

						if (err) {
							console.error(err);
						}
						
						console.log( doc );
						res.write((first ? '' : ',') + '"user'+doc.id+'":' + JSON.stringify(doc));
						first = false;						
					});
				}else{
					doc.deleted = true;
					
					console.log( doc );
					res.write((first ? '' : ',') + '"user'+doc.id+'":' + JSON.stringify(doc));
					first = false;
					
					userData.updateOne({ _id: doc._id }, doc, { w: 1 }, function (err, op_result) {
						
					});
				}
			}else{
				res.write('}');
				res.end();
			}			
		});		
	});
})

app.post('/updUser/:id', function (req, res) {

   console.log( "/updUser/" + req.params.id );
	
	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		//ensure we've connected
		assert.equal(null, err);
		
		var first = true;

		var userData = db.collection('user');
		var result = userData.find({id: req.params.id});
		
		res.write('{');
		result.each(function(err,doc){
			assert.equal(err,null);
			
			if (doc){
				
				doc.name = req.body.name;
				doc.password = req.body.password;
				doc.profession = req.body.profession;
				//doc.id = req.body.id;
				
				console.log( doc );
				res.write((first ? '' : ',') + '"user'+doc.id+'":' + JSON.stringify(doc));
				first = false;
				
				userData.updateOne({ _id: doc._id }, doc, { w: 1 }, function (err, op_result) {
					
				});
			}else{
				res.write('}');
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