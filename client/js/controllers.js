app.controller("MainCtrl", ['$scope', '$http', function($scope, News) {
  $scope.obj = {};
  // $scope.search = function() {
  //   $http.get("https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&q.enriched.url.title="+
  //             $scope.obj.topic+"&q.enriched.url.enrichedTitle.docSentiment=|type=positive,score=>0.5|&return=enriched.url.url,enriched.url.title", {
  //               params: {
  //                 apikey: alchemyApi
  //               }
  //             })
  //   .then(function(response) {
  //     $scope.response = response.data.result.docs;
  //   })
  // }
  $scope.search = News.getNews($scope.obj.topic).then(function(data) {
    $scope.response = data;
  });


}]);
