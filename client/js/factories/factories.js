app.factory('keyGetter', ['$http', function($http) {
  return {
    findKey: function() {
      return $http.get('/key').then(function(response) {
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
// authentication service that deals with where the JWT is stored (local storage)
app.factory('authentication', ['$http', '$window', function($http, $window) {
  return {
    register: function(user) {
      return $http.post('/api/register', user).success(function(data) {
        saveToken(data.token);
      });
    },
    login: function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
      });
    },
    saveToken: function(token) {
      $window.localStorage['mean-token'] = token;
    },
    getToken: function() {
      return $window.localStorage['mean-token'];
    },
    isLoggedIn: function() {
      // call getToken and read the mean-token
      // if exists, validate that the JWT has not expired.
      var token = getToken();
      var payload;

      if (token) {
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    },
    currentUser: function() {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email: payload.email,
          name: payload.name
        }
      }
    },
    logOut: function() {
      $window.localStorage.removeItem('mean-token');
    }
  }
}]);

app.factory('meanData', ['$http', 'authentication', function($http, authentication) {
  return {
    // get the profile using the auth token that is in local storage.
    getProfile: function() {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken();
        }
      });
    }
  }
}]);


