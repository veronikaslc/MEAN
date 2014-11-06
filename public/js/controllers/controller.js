'use strict';

var app = angular.module('main', [  'ngResource'])
    .config(['$routeProvider',  function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login/login.html',
                controller: LoginCtrl
            })
            .when('/', {
                templateUrl: 'views/login/login.html',
                controller: LoginCtrl
            })
            .when('/users', {
                templateUrl: 'views/users/user-list.html',
                controller: UsersCtrl
            })
            .when('/tweets', {
                templateUrl: 'views/tweets/tweets-list.html',
                controller: TweetsCtrl
            })
            .when('/tweets/:id', {
                templateUrl: 'views/tweets/tweets-list.html',
                controller: TweetsCtrl
            })
            .otherwise({redirectTo: '/login'});
    }
        ]);

app.directive('headerTemplate', ['$location',
    function($location) {
        return {
            restrict: 'E',
            controller: HeaderCtrl,
            templateUrl: 'views/frames/header-template.html'
        };
    }]);

app.run();