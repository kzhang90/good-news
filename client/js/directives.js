app.directive('navigation', function() {
  return {
    restrict: 'EA',
    templateUrl: 'partials/navigation.template.html',
    controller: 'navController as navvm'
  }
});