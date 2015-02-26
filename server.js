//Create express application
var express = require('express'),
    mongoose  =require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

//environment variable that can use in order to determine whether or not in production or development mode
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//create actual express application
var app = express();

var config =require('./server/config/config')[env];

require('./server/config/express')(app,config);

require('./server/config/mongoose')(config);
/**
//create a schema for a collection of message
var messageSchema = mongoose.Schema({
    message: String
});
//create model based on that schema
var Message = mongoose.model('Message',messageSchema);
//create variable that's going to hold that data that we pull out of the database
var mongoMessage ;
//return first document in the collection, after data return, have it execute a callback function by call exec function
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
    console.log(mongoMessage);
});
*/
var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('start to find');
        User.findOne({username:username}).exec(function(err, user) {
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }
));

passport.serializeUser(function(user, done) {
    if(user) {
        done(null, user._id);
    }
});

passport.deserializeUser(function(id, done) {
    User.findOne({_id:id}).exec(function(err, user) {
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
});
 require('./server/config/route')(app);

//tell application to start listening to the request
app.listen(config.port);

console.log('Listening on port ' + config.port + '...');
