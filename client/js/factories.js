app.factory('keyGetter', ['$http', function($http) {
  return {
    findKey: function() {
      return $http.get('/a').then(function(response) {
        return response;
      });
    }
  }
}]);

app.factory('articleFinder', ['$http', function($http) {
    return {
      getNews: function(url, topic, key) {
        return $http.get(url, {
          params: {
            'q.enriched.url.title': topic, 
            apikey: key
          }
        }).then(function(response) {
          return response;
        });
      }
    }
}]);


