(function() {
  var deviseApp;

  deviseApp = angular.module('deviseApp', ['navigationBar', 'ngTouch', 'deviseServices']);

  deviseApp.controller('DeviseLoginCtrl', function($scope, deviseService) {
    steroids.statusBar.hide();
    $scope.title = 'Login';
    $scope.email = 'test@test.com';
    $scope.password = 'password';
    deviseService.loadSession({
      success: function() {
        return steroids.layers.push({
          view: {
            id: 'contacts'
          }
        });
      }
    });
    $scope.login = function() {
      return deviseService.login({
        email: $scope.email,
        password: $scope.password,
        success: function() {
          var msg;
          msg = {
            recipient: 'contactView',
            message: 'refresh'
          };
          window.postMessage(msg);
          return steroids.layers.push({
            view: {
              id: "contacts"
            }
          });
        }
      });
    };
    $scope.signUp = function() {
      return steroids.layers.push({
        view: {
          id: "signup"
        }
      });
    };
    steroids.view.navigationBar.show();
    return steroids.view.setBackgroundColor("#FFFFFF");
  });

  deviseApp.controller('DeviseSignUpCtrl', function($scope, deviseService) {
    $scope.email = "test@test.com";
    $scope.password = "password";
    $scope.password_confirmation = "password";
    return $scope.signUp = function() {
      return deviseService.signUp({
        email: $scope.email,
        password: $scope.password,
        password_confirmation: $scope.password_confirmation,
        success: function() {
          return deviseService.loadSession({
            success: function() {
              return steroids.layers.push({
                view: {
                  id: "contacts"
                }
              });
            }
          });
        }
      });
    };
  });

  deviseApp.controller('DeviseLogoutCtrl', function($scope, deviseService) {
    var msgReceived;
    msgReceived = function(event) {
      if (event.data.recipient === "deviseView") {
        return deviseService.logout({
          success: function() {
            var msg;
            msg = {
              recipient: 'drawerView',
              message: 'logout'
            };
            return window.postMessage(msg);
          }
        });
      }
    };
    return window.addEventListener("message", msgReceived);
  });

}).call(this);
