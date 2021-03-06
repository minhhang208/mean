//service store that we log in and store the current user
//from window object get bootstrappedUser
angular.module('app').factory('mvIdentity', function($window, mvUser){
    var currentUser;
    if (!!$window.bootstrappedUserObject){
        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);

    }
    return{
        currentUser: currentUser,
        isAuthenticated: function(){
            return !!this.currentUser;
        },
        isAuthorized: function(role){
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        },
        isAdmin: function()
        {
            return !!this.currentUser && this.currentUser.roles.indexOf('admin') > -1;
        }
    }
})