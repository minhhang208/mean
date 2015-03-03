angular.module( 'app',['ngResource','ngRoute']);

angular.module('app').config(function($routeProvider,$locationProvider) {
    var routeRouteChecks = {
        admin: {auth:function(mvAuth){
            return mvAuth.authorizeCurrentUserForRoute('admin')
        }},
        user: {auth: function(mvAuth){
            return mvAuth.authorizeAuthenticatedUserForRoute()
        }}
    };
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
        .when('/admin/users', { templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListCtrl',
            resolve: routeRouteChecks.admin
        })
        .when('/signup', { templateUrl: '/partials/account/signup',
            controller: 'mvSignupCtrl'
        })
        .when('/profile', { templateUrl: '/partials/account/profile',
            controller: 'mvProfileCtrl',
            result: routeRouteChecks.user
        });
});

angular.module('app').run(function($rootScope, $location){
    //listen to a special event called "route change error"
    $rootScope.$on('$routeChangeError',function(event,current,previous, rejection){
       if(rejection === 'not authorized') {
           $location.path('/');
       }
    });
})