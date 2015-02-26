var mongoose = require('mongoose');
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

    var userSchema = mongoose.Schema({
       firstName: String,
        lastName: String,
        username: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err,collection){
        if(collection.length===0){
            User.create({firstName: 'Hannah',lastName:'Nguyen',username:'hannah'});
            User.create({firstName: 'Chi',lastName:'Do',username:'chi'});
            User.create({firstName: 'Anh',lastName:'Do',username:'anh'});
        }
    })
}