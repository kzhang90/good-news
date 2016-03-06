app.controller("MainCtrl", ['$scope', '$http', function($scope, $http) {

  $scope.obj = {};
  $scope.search = function() {
    $http.get("https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&q.enriched.url.title="+
              $scope.obj.topic+"&q.enriched.url.enrichedTitle.docSentiment=|type=positive,score=>0.5|&return=enriched.url.url,enriched.url.title", {
                params: {
                  apikey: "393a7cfa9df9f3b5be59780348891e80fd8521f3"
                }
              })
    .then(function(response) {
      $scope.articles = response.data.result.docs;
    })
  }
}]);
