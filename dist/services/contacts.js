(function() {
  var contactsServices;

  contactsServices = angular.module('contactsServices', []);

  contactsServices.service('contactService', function($http) {
    var backendUrl, getSessionInfos;
    backendUrl = "http://arcane-falls-5190.herokuapp.com";
    getSessionInfos = function() {
      var session;
      return session = {
        user_id: window.localStorage.getItem('user_id'),
        token_url: 'user_email=' + window.localStorage.getItem('user_email') + '&user_token=' + window.localStorage.getItem('user_token')
      };
    };
    return {
      fetchContacts: function(options) {
        var session;
        session = getSessionInfos();
        if (session.user_id > 0) {
          return $http({
            method: 'GET',
            url: backendUrl + '/users/' + session.user_id + '/contacts.json?' + session.token_url,
            format: 'jsonp'
          }).success(function(res) {
            return options.afterFetch(res);
          }).error(function(res) {
            return alert('error fetch');
          });
        }
      },
      fetchContact: function(options) {
        var session;
        session = getSessionInfos();
        if (session.user_id > 0) {
          return $http({
            method: 'GET',
            url: backendUrl + '/users/' + session.user_id + '/contacts/' + options.contactId + '.json?' + session.token_url,
            format: 'jsonp'
          }).success(function(res) {
            return options.afterFetch(res);
          }).error(function(res) {
            return alert('error fetch');
          });
        }
      },
      saveContact: function(options) {
        var session;
        session = getSessionInfos();
        return $http({
          url: backendUrl + '/users/' + session.user_id + '/contacts.json?' + session.token_url,
          method: 'POST',
          dataType: 'json',
          format: 'jsonp',
          data: {
            contact: {
              first_name: options.data.first_name,
              last_name: options.data.last_name,
              email: options.data.email,
              avatar: options.data.avatar
            }
          }
        }).success(function(res) {
          return options.success();
        }).error(function(res) {
          return alert('error save');
        });
      }
    };
  });

}).call(this);
