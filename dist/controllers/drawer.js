(function() {
  var drawerApp;

  drawerApp = angular.module('drawerApp', ['DrawerModel', 'ngTouch']);

  drawerApp.controller('IndexCtrl', function($scope, DrawerRestangular) {
    var checkDefault, msgReceived;
    DrawerRestangular.all('drawer').getList().then(function(drawer) {
      return $scope.drawer = drawer;
    });
    checkDefault = function(item) {
      if (item.active && !$scope.currentItem) {
        return $scope.currentItem = item;
      }
    };
    $scope.isActive = function(item) {
      checkDefault(item);
      return item.active;
    };
    $scope.switchMenu = function(item) {
      var msg;
      if (item.active) {
        return steroids.drawers.hide({});
      } else {
        if (item.id === 'logout') {
          msg = {
            recipient: 'deviseView',
            message: 'logout'
          };
          return window.postMessage(msg);
        } else {
          steroids.drawers.hide({
            center: {
              id: item.id
            }
          });
          item.active = true;
          $scope.currentItem && ($scope.currentItem.active = false);
          return $scope.currentItem = item;
        }
      }
    };
    msgReceived = function(event) {
      if (event.data.recipient === "deviseView") {
        if (event.data.message === 'logout') {
          return steroids.drawers.hide({
            center: {
              id: 'login'
            }
          });
        }
      }
    };
    return window.addEventListener("message", msgReceived);
  });

}).call(this);
