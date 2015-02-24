//Create express application
var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose  =require('mongoose');

//environment variable that can use in order to determine whether or not in production or development mode
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//create actual express application
var app = express();
//stylus: setup middleware configuration for stylus
function compile(str,path){
    return stylus(str).set('filename',path);
}

//configure view engine
app.set('views', __dirname + '/server/views');
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'ejs');
app.set('view engine', 'jade');
//turn on express as logging
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(stylus.middleware(
        {
            src: __dirname + '/public',
            compile: compile
        }
    )

);
//stylus: setup static routing to our public directory: tell express that anytime any requests come in that match up
//to a file inside of the public directory, go ahead and serve the file
app.use(express.static(__dirname + '/public'));

//connect to mongodb database
mongoose.connect('mongodb://localhost/mean');
//reference to mongodb connection
var db = mongoose.connection;
//listen to event
db.on('error',console.error.bind(console,'connection error...'));
db.once('open', function callback(){
    console.log('mean db openned');
});

//create a schema for a collection of message
var messageSchema = mongoose.Schema({
    message: String
});
//create model based on that schema
var Message = mongoose.model('Message',messageSchema);
//create variable that's going to hold that data that we pull out of the database
var mongoMessage = "teteeee";
//return first document in the collection, after data return, have it execute a callback function by call exec function
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
    console.log(mongoMessage);
});

app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});


//add route that delivers index page; asterisk will match all routes (images, javascript, css requests) that don't have
//existing path for
app.get('*', function(req, res) {
    res.render('index',{
        mongoMessage: mongoMessage
    });
});

//tell application to start listening to the request
var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');
