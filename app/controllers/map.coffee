mapApp = angular.module 'mapApp', ['ngTouch', 'google-maps', 'navigationBar' ]

mapApp.controller 'IndexCtrl', ($scope)->

  $scope.map = 
    center: 
      latitude: 45
      longitude: -73
    zoom: 8
    markers: [ 
      id: 1
      coordinates:
        latitude: 12
        longitude: 42
    ]


  onError = (error) ->
    alert "code: " + error.code + "\n" + "message: " + error.message + "\n"
    return
  onSuccess = (position) ->
    alert "Latitude: " + position.coords.latitude + "\n" + "Longitude: " + position.coords.longitude + "\n" + "Altitude: " + position.coords.altitude + "\n" + "Accuracy: " + position.coords.accuracy + "\n" + "Altitude Accuracy: " + position.coords.altitudeAccuracy + "\n" + "Heading: " + position.coords.heading + "\n" + "Speed: " + position.coords.speed + "\n" + "Timestamp: " + position.timestamp + "\n"
    $scope.map.center =
      latitude: position.coords.latitude
      longitude: position.coords.longitude
    $scope.map.markers =  [
      id: 1
      coordinates:
        latitude: position.coords.latitude
        longitude: position.coords.longitude
      options:
        title: 'Your position'
    ]
    $scope.$apply()
    return

  $scope.getPosition = () ->
    navigator.geolocation.getCurrentPosition onSuccess, onError

  $scope.openDrawer = ->
    steroids.drawers.show {
      edge: steroids.screen.edges.LEFT
    }

  steroids.view.navigationBar.show()