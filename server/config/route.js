var auth = require('./auth'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app){
    app.get('/api/users', auth.requiresRole('admin') ,function(req,res){
        User.find({}).exec(function(err,collection){
            res.send(collection);
        });
    });
    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });
    //post to the URL of login
    app.post('/login',auth.authenticate);
    app.post('/logout',function(req,res){
        req.logout;
        res.end();
    })
//add route that delivers index page; asterisk will match all routes (images, javascript, css requests) that don't have
//existing path for
    app.get('*', function(req, res) {
        res.render('index',{
            bootstrappedUser: req.user
        });
    });
}