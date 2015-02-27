var auth = require('./auth');

module.exports = function(app){
    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });
    //post to the URL of login
    app.post('/login',auth.authenticate);
//add route that delivers index page; asterisk will match all routes (images, javascript, css requests) that don't have
//existing path for
    app.get('*', function(req, res) {
        res.render('index');
    });
}