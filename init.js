var express = require('express');
var bodyParser = require('body-parser');
var mongojs= require('mongojs');

db = mongojs('cs5610353', ['services']);

var app = express();

var jsonParser = bodyParser.json();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/services', function(req, resp){
	db.services.find(function(err, doc){
		resp.json(doc);
	})	
});

app.get('/services/:id', function(req, resp){
	var id=req.params.id;
	db.services.findOne({_id : mongojs.ObjectId(id)},  function(err, doc){
		resp.json(doc);
	})	
});

app.post('/services',  function(req, resp){
	var request = req.body;	
	db.services.insert(request, function(err, doc){
		resp.json(doc);
	});
});

app.put('/services/:id',  function(req, resp){
	var id=req.params.id;
	var request = req.body;	
	db.services.findAndModify({query: { _id: id}, update: {name: request.name}}, function(err, doc){
		resp.json(doc);
	});
});

app.delete('/services/:id',  function(req, resp){
	var id=req.params.id;
	db.services.remove({_id : mongojs.ObjectId(id)}, function (err, doc){
		resp.json(doc);
	});
});	   

app.listen(3000);

