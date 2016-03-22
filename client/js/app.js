var app = angular.module("goodNews", ["ngRoute"]);
app.config(function($routeProvider, $locationProvider){
    $routeProvider
      .when("/", {
        templateUrl: "partials/home.html",
        controller: "MainCtrl"
      }).otherwise({redirectTo: "/"});
  $locationProvider.html5Mode(true);
});

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    // higher zoom number is closer
    zoom: 6
  });
};