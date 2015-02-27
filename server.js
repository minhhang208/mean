//Create express application
var express = require('express');

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
require('./server/config/passport')();
 require('./server/config/route')(app);

//tell application to start listening to the request
app.listen(config.port);

console.log('Listening on port ' + config.port + '...');
