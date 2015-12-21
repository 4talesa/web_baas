'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'UserApp'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: '../pages/userapp/partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/login', {templateUrl: '../pages/userapp/partials/login.html', login: true});
  $routeProvider.when('/signup', {templateUrl: '../pages/userapp/partials/signup.html', public: true});
  $routeProvider.when('/verify-email', {templateUrl: '../pages/userapp/partials/verify-email.html', verify_email: true});
  $routeProvider.when('/reset-password', {templateUrl: '../pages/userapp/partials/reset-password.html', public: true});
  $routeProvider.when('/set-password', {templateUrl: '../pages/userapp/partials/set-password.html', set_password: true});
  $routeProvider.when('/articles', {templateUrl: '../pages/userapp/partials/articles.html', controller: 'ArticlesCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]).
run(function(user) {
  user.init({ appId: '561448f1e2862' });
});
