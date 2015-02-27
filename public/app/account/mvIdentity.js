//service store that we log in and store the current user
angular.module('app').factory('mvIdentity', function(){
    return{
        currentUser: undefined,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    }
})