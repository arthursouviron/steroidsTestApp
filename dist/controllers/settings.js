(function() {
  var settingsApp;

  settingsApp = angular.module('settingsApp', ['navigationBar', 'ngTouch', 'settingsServices']);

  settingsApp.controller('UserSettingsCtrl', function($scope, settingsService) {
    var uploadPhoto;
    $scope.avatar = "";
    $scope.takePicture = function() {
      navigator.camera.getPicture(uploadPhoto, (function(message) {
        alert("get picture failed");
      }), {
        quality: 50,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
      });
    };
    uploadPhoto = function(imageURI) {
      return settingsService.uploadAvatar(imageURI);
    };
    return $scope.openDrawer = function() {
      return steroids.drawers.show({
        edge: steroids.screen.edges.LEFT
      });
    };
  });

}).call(this);
