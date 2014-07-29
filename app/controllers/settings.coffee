settingsApp = angular.module('settingsApp', ['navigationBar', 'ngTouch', 'settingsServices']);


settingsApp.controller 'UserSettingsCtrl', ($scope, settingsService) ->

  $scope.avatar = ""

  $scope.takePicture = () ->
    navigator.camera.getPicture uploadPhoto, ((message) ->
      alert "get picture failed"
      return
    ),
      quality: 50
      destinationType: navigator.camera.DestinationType.FILE_URI
      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY

    return

  uploadPhoto = (imageURI) ->
    settingsService.uploadAvatar(imageURI)
    # settingsService.fetchAvatar()
 #   

  # settingsService.fetchAvatar()
  
  # $scope.avatar = "http://192.168.0.3:3000"  + window.localStorage.getItem('avatar')


  # $scope.saveProfile = () ->
    # avatar = new steroids.File
    #   path: 'image.png'
    #   relativeTo: steroids.app.userFilesPath


    # deviseService.saveProfile
    #   avatar: avatar


  $scope.openDrawer = ->
    # steroids.drawers.show contactViews.mainDrawer
    steroids.drawers.show {
      edge: steroids.screen.edges.LEFT
    }

  # msgReceived = (event) ->
  #   if (event.data.recipient == "settingsView")
  #     if event.data.message == 'avatar'
  #       $scope.avatar = window.localStorage.getItem('avatar')

  # window.addEventListener("message", msgReceived)
