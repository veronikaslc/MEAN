var express = require('express');
var bodyParser = require('body-parser');
var mongojs= require('mongojs');

var db = mongojs('mydb');
var people = db.collection('people');
var tweets = db.collection('tweets');

var app = express();
var jsonParser = bodyParser.json();

var winston = require('winston');

//winston.add (winston.transports.File, {filename: 'debug.log'});

var logger = new (winston.Logger) ({
		transports: [
				new (winston.transports.Console),
				new (winston.transports.File) ({filename: 'debug.log'})
		]
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//login
app.post('/login', function(req, resp){
		logger.log('info', 'Handling login');
    var name = req.body.name;
    var password = req.body.password;

});

//list all users
app.get('/people', function(req, resp){
    people.find(function(err, doc){
        resp.json(doc);
    })
});

//get all tweets
app.get('/tweets', function(req, resp){
    tweets.find(function(err, doc){
        resp.json(doc);
    })
});

//get a user info
app.get('/people/:id', function(req, resp){
    var id = req.params.id;
    console.log('this is ide:' + id);
    people.findOne({_id : mongojs.ObjectId(id)},  function(err, doc){
        resp.json(doc);
    })
});

//get all tweets from a user
app.get('/tweets/:id', function(req, resp){
    var userid = req.params.id;
    tweets.find({userid : userid},  function(err, doc){
        resp.json(doc);
    })
});

//get all tweets from a user's friends
app.get('/tweets/friends/:userid', function(req, resp){
    var userid = req.params.userid;
    people.findOne({_id : mongojs.ObjectId(userid)},  function(err, doc){
        var friendsid = doc.friends;
        tweets.find({userid : {$in : friendsid}},  function(err, doc){
            resp.json(doc);
        })
    })

});

//create a user
app.post('/people',  function(req, resp){
    var request = req.body;
    people.insert(request, function(err, doc){
        resp.json(doc);
    });
});

//post a tweet
app.post('/tweets',  function(req, resp){
    var request = req.body;
    tweets.insert(request, function(err, doc){
        resp.json(doc);
    });
});


//add a friend
app.put('/people/add/:id',  function(req, resp){
    var id = req.params.id;
    var friendid = req.body.friendid;
    people.findAndModify(
        {
            query: {_id: mongojs.ObjectId(id)},
            update: {$addToSet: {friends: friendid}},
            new: true
        },
        function(err, doc, lastErrObject) {
            resp.json(doc);
        });
});

//change a tweet
app.put('/tweets/:id',  function(req, resp){

    var id = req.params.id;
    var text = req.body.text;

    tweets.findAndModify(
        {
            query: {_id: mongojs.ObjectId(id)},
            update: {$set: {text: text}},
            new: true
        },
        function(err, doc, lastErrObject) {
            console.log(doc);
            resp.json(doc);
        });
});

//delete user
app.delete('/people/:id',  function(req, resp){
    var id=req.params.id;
		people.remove({_id : mongojs.ObjectId(id)}, function (err, doc){
        resp.json(doc);
    });
});

//delete tweet
app.delete('/tweets/:id',  function(req, resp){
    var id=req.params.id;
    tweets.remove({_id : mongojs.ObjectId(id)}, function (err, doc){
        resp.json(doc);
    });
});

app.listen(3000);
