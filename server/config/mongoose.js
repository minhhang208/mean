var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    courseModel = require('../models/Course');

module.exports = function(config){
    //connect to mongodb database
    mongoose.connect(config.db);

    //reference to mongodb connection
    var db = mongoose.connection;
    //listen to event
    db.on('error',console.error.bind(console,'connection error...'));
    db.once('open', function callback(){
        console.log('mean db openned' + config.db);
    });
    userModel.createDefaultUsers();
    courseModel.createDefaultCourses();

}
