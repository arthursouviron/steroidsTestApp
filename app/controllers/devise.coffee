## DEVISE CTRL

deviseApp = angular.module 'deviseApp', ['navigationBar', 'ngTouch', 'deviseServices']


deviseApp.controller 'DeviseLoginCtrl', ($scope, deviseService) ->
  steroids.statusBar.hide()

  $scope.title = 'Login'
  $scope.email = 'test@test.com'
  $scope.password = 'password'

  deviseService.loadSession
    success: ->
      steroids.layers.push
        view: 
          id: 'contacts'

  $scope.login = () ->
    deviseService.login
      email: $scope.email
      password: $scope.password
      success: ->
        msg = {
          recipient: 'contactView'
          message: 'refresh'
        }
        window.postMessage(msg)
        steroids.layers.push
          view: 
            id: "contacts"

  $scope.signUp = () ->
    steroids.layers.push
      view:
        id: "signup"
 
  steroids.view.navigationBar.show()
  steroids.view.setBackgroundColor "#FFFFFF"



deviseApp.controller 'DeviseSignUpCtrl', ($scope, deviseService) ->

  $scope.email = "test@test.com"
  $scope.password = "password"
  $scope.password_confirmation = "password"


  $scope.signUp = () ->
    deviseService.signUp
      email: $scope.email
      password: $scope.password
      password_confirmation: $scope.password_confirmation
      success: ->
        deviseService.loadSession
          success: ->
            steroids.layers.push
              view: 
                id: "contacts"

deviseApp.controller 'DeviseLogoutCtrl', ($scope, deviseService) ->


  msgReceived = (event) ->
    if (event.data.recipient == "deviseView")
      deviseService.logout
        success: () ->
          msg = {
            recipient: 'drawerView'
            message: 'logout'
          }
          window.postMessage(msg)

  window.addEventListener("message", msgReceived)
