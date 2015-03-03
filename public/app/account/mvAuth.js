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
        createUser: function(newUserData) {
            var newUser = new mvUser(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function() {
                mvIdentity.currentUser = newUser;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        /* We have our userResource, so we want to take a userResource object, update it with new data, and then
        * call save on it. We do have an instance of a userResource object that's already available to us, that is
        * the current user on the identity service, but we don't want to update that object unless we know that
        * the save was successful. So we are not going to use that object, instead we are going to create a clone of it */
        updateCurrentUser: function(newUserData) {
            var dfd = $q.defer();

            var clone = angular.copy(mvIdentity.currentUser);
            angular.extend(clone, newUserData);
            console.log('before update');
            clone.$update().then(function() {
                console.log('update');
                mvIdentity.currentUser = clone;
                console.log('after update');
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;

        /*unfortunately, there's problem with calling save. We called save and that posted the data to the server.
        * We want to update this user, not create a new one, so we want an entirely different route, and we want
        * to use the put method. Unfortunately, by default, Angular will use a post when we call save, and it
        * doesn't have any other methods for updating a resource, so we're going to go into our UserResource and add
        * a new method on it for put when calling to the server, see mvUser*/
        }
        ,
        logoutUser: function(){
            var dfd = $q.defer();
            $http.post('/logout', {logout:true}).then(function(req,res) {
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
        },
        authorizeAuthenticatedUserForRoute:function(role){
            if (mvIdentity.isAuthorized(role)){
                return true;
            }else
            {
                return $q.reject('not authorized');
            }
        }
    }
});

