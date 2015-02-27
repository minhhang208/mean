angular.module('app').factory('mvAuth',function($http,mvIdentity, $q, mvUser){
    return {
        authenticateUser: function (username, password) {
            //communicate back to the controller by using a promise
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    //after user logged in get roles of user
                    var user = new mvUser();
                    angular.extend(user, response.data.user);
                    mvIdentity.currentUser = response.data.user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        logoutUser: function(){
            var dfd = $q.defer();
            $http.post('/logout', {logout:true}).then(function() {
                mvIdentity.currentUser = undefined;
                dfd.resolve();

            });
            return dfd.promise;

        },
        authorizeCurrentUserForRoute: function(role){
            if(mvIdentity.isAuthorized(role)){
                return true;
            }else{
                return false;
            }
        }
    }
});

