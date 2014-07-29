(function() {
  var settingsServices;

  settingsServices = angular.module('settingsServices', []);

  settingsServices.service('settingsService', function($http) {
    var backendUrl;
    backendUrl = "http://arcane-falls-5190.herokuapp.com";
    return {
      uploadAvatar: function(imageURI) {
        var fail, ft, options, win;
        options = new FileUploadOptions();
        options.fileKey = "avatar";
        options.fileName = imageURI.substr(imageURI.lastIndexOf("/") + 1);
        options.mimeType = "image/jpeg";
        win = function(r) {
          return alert('Image sent');
        };
        fail = function(error) {
          alert("An error has occurred: Code = " + error.code);
        };
        options.params = {
          user_email: window.localStorage.getItem('user_email'),
          user_token: window.localStorage.getItem('user_token')
        };
        ft = new FileTransfer();
        ft.upload(imageURI, encodeURI(backendUrl + "/users/edit_avatar"), win, fail, options);
      }
    };
  });

}).call(this);
