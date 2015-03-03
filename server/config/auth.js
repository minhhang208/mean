var passport = require('passport');
exports.authenticate =   function(req,res,next){
    req.body.username = req.body.username.toLowerCase();
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
};
exports.requireApiLogin = function (req,res,next){
    if (!req.isAuthenticated()){
        res.status(403);
        res.end();
    }else{
        next();
    }


};
exports.requiresRole = function(role) {
    return function(req,res,next){
        if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1){
            res.status(403);
            res.end();
        }else{
            next();
        }
    }
};