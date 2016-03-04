app.controller("MainCtrl", ['$scope', '$http', function($scope, $http) {
  $scope.obj = {};
  $scope.search = function() {
    $http.get("https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&q.enriched.url.title="+
              $scope.obj.topic+"&q.enriched.url.enrichedTitle.docSentiment=|type=positive,score=>0.5|&return=enriched.url.url,enriched.url.title&apikey="+dotenv.ALCHEMY_API_KEY)
    .then(function(response) {
      $scope.response = response.data.result.docs;
    })
  }
}]);
