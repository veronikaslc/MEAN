var express = require('express');
var bodyParser = require('body-parser');
var mongojs= require('mongojs');

var db = mongojs('mydb');
var people = db.collection('people');

var app = express();

var jsonParser = bodyParser.json();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/services', function(req, resp){
    people.find(function(err, doc){
        resp.json(doc);
    })
});

app.get('/services/:id', function(req, resp){
    var id=req.params.id;
    people.findOne({_id : mongojs.ObjectId(id)},  function(err, doc){
        resp.json(doc);
    })
});

app.post('/services',  function(req, resp){
    var request = req.body;
    people.insert(request, function(err, doc){
        resp.json(doc);
    });
});

app.put('/services/:id',  function(req, resp){
  	console.log (req.body);
		var id=req.params.id;
    var name = req.body.name;
		console.log (id + '->' + name);
		people.findAndModify(
				{
						query: {_id: mongojs.ObjectId(id)},
						update: {$set: {name: name}},
						new: true,
				},
				function(err, doc, lastErrObject) {
						console.log(doc);
						console.log(doc);
						resp.json(doc);
				});
});

app.delete('/services/:id',  function(req, resp){
    var id=req.params.id;
		people.remove({_id : mongojs.ObjectId(id)}, function (err, doc){
        resp.json(doc);
    });

});

app.listen(3000);
