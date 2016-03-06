app.service("News", ['$http', function($http) {
  return {
    get: function(callback) {
      $http.get("/a").success(function(data) {
        callback(data);
      })
    }
  }
}])