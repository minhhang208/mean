var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type: String, required:'{PATH} is required!'},
    lastName: {type: String, required:'{PATH} is required!'},
    username: { type: String, required:'{PATH} is required!', unique:true} ,
    salt: {type: String, required:'{PATH} is required!'},

    hashed_pwd: {type: String, required:'{PATH} is required!'},
    roles: [String]
});
//check password
userSchema.methods = {
    authenticate: function(passwordToMatch){
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role){
        return this.roles.indexOf(role) > -1;
    }
}
userSchema.methods.toJSON = function()
{
    var obj = this.toObject();
    delete obj.hashed_pwd;
    return obj;

}
var User = mongoose.model('User', userSchema);
function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'hannah');
            User.create({
                firstName: 'Hannah',
                lastName: 'Nguyen',
                username: 'hannah',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin']
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'chi');
            User.create({
                firstName: 'Chi',
                lastName: 'Do',
                username: 'chi',
                salt: salt,
                hashed_pwd: hash,
                roles: ['user']
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'anh');
            User.create({firstName: 'Anh', lastName: 'Do', username: 'anh', salt: salt, hashed_pwd: hash});
        }
    })
}


exports.createDefaultUsers = createDefaultUsers;
