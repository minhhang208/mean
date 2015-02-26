var path = require('path');
var rootPath=path.normalize(__dirname + '/../../');
module.exports={
    development:{
        db: 'mongodb://localhost/mean',
        rootPath: rootPath,
        port: 3030
    },
    production:{
        db: 'mongodb://minhhang208:minhhang123@ds047911.mongolab.com:47911/mean',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}