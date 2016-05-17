var app = angular.module('goodNews', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
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
  function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
        $location.path('/');
      }
    });
  }

// is the below correct?
// run functionality:
  // if an unauth user tries to visit the profile page, they will be redirected to the homepage.
}).run(['$rootScope', '$location', 'authentication', run]);
