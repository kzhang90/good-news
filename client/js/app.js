var app = angular.module('goodNews', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'MainCtrl'
      }).when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'RegisCtrl'
      }).otherwise({redirectTo: '/'});

  $locationProvider.html5Mode(true);
});
