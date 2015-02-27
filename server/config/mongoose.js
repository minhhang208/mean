var mongoose = require('mongoose'),
    crypto = require('crypto');

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
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });
    //check password
    userSchema.methods = {
        authenticate: function(passwordToMatch){
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }
    userSchema.methods.toJSON = function()
    {
        var obj = this.toObject();
        delete obj.hashed_pwd;
        return obj;

    }
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err,collection){
        if(collection.length===0){
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt,'hannah');
            User.create({firstName: 'Hannah',lastName:'Nguyen',username:'hannah',salt:salt, hashed_pwd:hash, roles:['admin']});
            salt = createSalt();
            hash = hashPwd(salt,'chi');
            User.create({firstName: 'Chi',lastName:'Do',username:'chi',salt:salt, hashed_pwd:hash, roles:['user']});
            salt = createSalt();
            hash = hashPwd(salt,'anh');
            User.create({firstName: 'Anh',lastName:'Do',username:'anh',salt:salt, hashed_pwd:hash});
        }
    })
}
function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}