(function() {
  var deviseServices;

  deviseServices = angular.module('deviseServices', []);

  deviseServices.service('deviseService', function($http, $location) {
    var backendUrl;
    backendUrl = "http://arcane-falls-5190.herokuapp.com";
    return {
      loadSession: function(options) {
        if (window.localStorage.getItem('user_email') && window.localStorage.getItem('user_token')) {
          return $http({
            method: 'GET',
            url: backendUrl + "/users/sign_in.json?user_email=" + window.localStorage.getItem('user_email') + '&user_token=' + window.localStorage.getItem('user_token')
          }).success(function(res) {
            return options.success();
          }).error(function(res) {
            return alert('error');
          });
        }
      },
      login: function(options) {
        return $http({
          method: 'POST',
          url: backendUrl + "/users/sign_in.json",
          dataType: 'json',
          format: 'jsonp',
          data: {
            user: {
              email: options.email,
              password: options.password
            }
          }
        }).success(function(res) {
          console.log(res.avatar_url);
          if (res && res.success && res.user) {
            window.localStorage.setItem('user_id', res.user.id);
            window.localStorage.setItem('user_token', res.authentication_token);
            window.localStorage.setItem('user_email', options.email);
            window.localStorage.setItem('avatar', res.avatar_url);
            return options.success();
          } else {
            return alert('Mot de passe/Email incorrect');
          }
        }).error(function(data) {
          return console.log('error', data);
        });
      },
      logout: function(options) {
        return $http({
          method: 'DELETE',
          url: backendUrl + "/users/sign_out.json?user_email=" + window.localStorage.getItem('user_email') + "&user_token=" + window.localStorage.getItem('user_token'),
          dataType: 'json',
          format: 'jsonp'
        }).success(function(res) {
          window.localStorage.removeItem('user_id');
          window.localStorage.removeItem('user_token');
          window.localStorage.removeItem('user_email');
          return options.success();
        }).error(function(data) {
          return alert("ERREUR LOGOUT");
        });
      },
      signUp: function(options) {
        return $http({
          method: 'POST',
          url: backendUrl + "/users",
          dataType: 'json',
          format: 'jsonp',
          data: {
            user: {
              email: options.email,
              password: options.password,
              password_confirmation: options.password_confirmation
            }
          }
        }).success(function(res) {
          if (res.data) {
            console.log(res);
            window.localStorage.clear();
            window.localStorage.setItem('user_id', res.data.id);
            window.localStorage.setItem('user_token', res.data.authentication_token);
            window.localStorage.setItem('user_email', res.data.email);
            options.success();
          } else {
            if (res.state.messages[0]) {
              alert(res.state.messages[0]);
            }
          }
          return console.log(res);
        }).error(function(data) {
          return alert('error creation account');
        });
      }
    };
  });

}).call(this);
