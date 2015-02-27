angular.module('app').factory('mvUser', function($resource){
    //call API, restful manners
    var UserResource = $resource('/api/users/:id', {_id: "@id"});
    //check if user is admin
    UserResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };
    return UserResource;
})