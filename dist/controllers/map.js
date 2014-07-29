(function() {
  var mapApp;

  mapApp = angular.module('mapApp', ['ngTouch', 'google-maps', 'navigationBar']);

  mapApp.controller('IndexCtrl', function($scope) {
    var onError, onSuccess;
    $scope.map = {
      center: {
        latitude: 45,
        longitude: -73
      },
      zoom: 8,
      markers: [
        {
          id: 1,
          coordinates: {
            latitude: 12,
            longitude: 42
          }
        }
      ]
    };
    onError = function(error) {
      alert("code: " + error.code + "\n" + "message: " + error.message + "\n");
    };
    onSuccess = function(position) {
      alert("Latitude: " + position.coords.latitude + "\n" + "Longitude: " + position.coords.longitude + "\n" + "Altitude: " + position.coords.altitude + "\n" + "Accuracy: " + position.coords.accuracy + "\n" + "Altitude Accuracy: " + position.coords.altitudeAccuracy + "\n" + "Heading: " + position.coords.heading + "\n" + "Speed: " + position.coords.speed + "\n" + "Timestamp: " + position.timestamp + "\n");
      $scope.map.center = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      $scope.map.markers = [
        {
          id: 1,
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          options: {
            title: 'Your position'
          }
        }
      ];
      $scope.$apply();
    };
    $scope.getPosition = function() {
      return navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };
    $scope.openDrawer = function() {
      return steroids.drawers.show({
        edge: steroids.screen.edges.LEFT
      });
    };
    return steroids.view.navigationBar.show();
  });

}).call(this);
