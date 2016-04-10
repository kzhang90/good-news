app.controller('MainCtrl', ['$scope','$http','keyGetter','articleFinder', function($scope, $http, keyGetter, articleFinder) {
  $scope.obj = {};
  var url = "https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&q.enriched.url.enrichedTitle.docSentiment=|type=positive,score=>0.9|&return=enriched.url.url,enriched.url.title";
  
  keyGetter.findKey().then(function(data) {
    $scope.key = data.data.key;
  });

  var news = articleFinder.getNews;

  $scope.someFunction = function() {
    var topic = $scope.obj.topic;
    var key = $scope.key;
    console.log(topic);
    console.log(url);
    console.log(key);
    news(url,topic,key).then(function(data) {
      $scope.articles = data.data.result.docs;
    });
  }

}]);