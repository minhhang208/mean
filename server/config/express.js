var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');
module.exports = function(app, config) {

//stylus: setup middleware configuration for stylus
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

//configure view engine
    app.set('views', config.rootPath + '/server/views');
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'ejs');
    app.set('view engine', 'jade');
//turn on express as logging
    app.use(logger('dev'));
    app.use(cookieParser());

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    //add cookies parser before the body parser since cookies are required for sessions and we also need to add in the
    //session middleware
    app.use(session({secret: 'multi vision unicorns', resave:false, saveUninitialized:false}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware(
            {
                src: config.rootPath + '/public',
                compile: compile
            }
        )
    );
//stylus: setup static routing to our public directory: tell express that anytime any requests come in that match up
//to a file inside of the public directory, go ahead and serve the file
    app.use(express.static(config.rootPath + '/public'));

}