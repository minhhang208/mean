//Create express application
var express = require('express');

//environment variable that can use in order to determine whether or not in production or development mode
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//create actual express application
var app = express();

//configure view engine
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');




//add route that delivers index page; asterisk will match all routes (images, javascript, css requests) that don't have
//existing path for
app.get('*',function(req,res){
    res.render('index');
});

//tell application to start listening to the request
var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');
