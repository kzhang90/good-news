var app = angular.module('goodNews', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
  console.log('in the config');
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'mainController',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'regisController',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginController',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: 'partials/profile.html',
        controller: 'profileController',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
});

app.run(function($rootScope, $location, authentication) {
  console.log('in the run');
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if ($location.path() == '/profile' && !authentication.isLoggedIn()) {
      $location.path('/');
    }
  });
});