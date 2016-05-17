app.controller('mainController', ['$scope','$http','keyGetter','articleFinder', function($scope, $http, keyGetter, articleFinder) {
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

app.controller('regisController', ['$location', 'authentication', function($location, authentication) {
    var vm = this;
    vm.credentials = {
      name: '',
      email: '',
      password: ''
    }
    vm.onSubmit = function() {
      authentication
        .register(vm.credentials)
        .error(function(err) {
          alert(err);
        })
        .then(function() {
          $location.path('profile');
        });
    }
}]);

app.controller('loginController', ['$location', 'authentication', function($location, authentication) {
  var vm = this;
  vm.credentials = {
    email: '',
    password: ''
  }
  vm.onSubmit = function() {
    authentication
      .login(vm.credentials)
      .error(function(err) {
        alert(err);
      })
      .then(function() {
        $location.path('profile');
      });
  }
}]);

app.controller('profileController', ['$location', 'meanData', function($location, meanData) {
  var vm = this;
  vm.user = {};
  meanData.getProfile()
    .success(function(data) {
      vm.user = data;
    })
    // if cant get profile due to token not being correct
    .error(function(e) {
      console.log(e);
    });
}]);

app.controller('navController', ['$location', 'authentication', function($location, authentication) {
  var vm = this;
  vm.isLoggedIn = authentication.isLoggedIn();
  vm.currentUser = authentication.currentUser();
}]);