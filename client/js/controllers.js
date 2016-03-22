app.controller("MainCtrl", ['$scope', '$http','News', function($scope, $http, News) {
  $scope.obj = {};
  var topic = $scope.obj.topic;

  News.get(function(data) {
    var result = data.key;
    
    $scope.search = function() {
      $http.get("https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&q.enriched.url.enrichedTitle.docSentiment=|type=positive,score=>0.9|&return=enriched.url.url,enriched.url.title", {
        params: {
          "q.enriched.url.title": topic,
          apikey: result
        },
      }).then(function(data) {
        $scope.articles = data.data.result.docs;
        console.log(data);
      })
    }
  });
}]);
