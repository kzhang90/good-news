app.controller('MainCtrl', ['$scope','$http','keyGetter','articleFinder', function($scope, $http, keyGetter, articleFinder) {
  $scope.obj = {};
  var topic = $scope.obj.topic;
  var url = "https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&q.enriched.url.enrichedTitle.docSentiment=|type=positive,score=>0.9|&return=enriched.url.url,enriched.url.title";
  var key = keyGetter.findKey;
  
  $scope.someFunction = function() {
    news.then(function(response) {
      $scope.articles = response;
    });
  }

}]);