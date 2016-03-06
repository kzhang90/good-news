app.controller("MainCtrl", ['$scope', '$http','News', function($scope, $http, News) {
  $scope.obj = {};
  var topic = $scope.obj.topic;
  News.get(function(data) {
    var result = data.key;
    
    $scope.search = function() {
      $http.get("https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&q.enriched.url.title="+topic+"&q.enriched.url.enrichedTitle.docSentiment=|type=positive,score=>0.5|&return=enriched.url.url,enriched.url.title", {
        params: {
          apikey: result
        }
      }).then(function(data) {
        console.log(data);
        $scope.articles = data;
      })
    }
  });
}]);
