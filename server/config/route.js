var passport = require('passport');


module.exports = function(app){
    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });
    //post to the URL of login
    app.post('/login',function(req,res,next){
        var auth = passport.authenticate('local', function(err, user){
            if(err){
                return next(err);
            }
            if(!user){
                res.send({success: false});}
            //login is a function that Passport adds to the request object and login takes in the user and a call back
            //will also again check for errors. Otherwise if the login was successful then we will send to the client a
            //JSON object that specifies that we were able to successfully login the user

            req.logIn(user,function(err){
                if (err) return next(err);
                res.send({success: true, user: user});
            })
        });
        //call above function
        auth(req, res, next);
    });
//add route that delivers index page; asterisk will match all routes (images, javascript, css requests) that don't have
//existing path for
    app.get('*', function(req, res) {
        res.render('index');
    });
}