(function() {
  var navApp;

  navApp = angular.module('navigationBar', ['ngTouch']);

  navApp.directive('navigationBar', function($parse, $compile) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        var leftButtons, rightButtons, updatedNavigationBar, _constructButtonFromElement;
        _constructButtonFromElement = function(element) {
          var button, buttonElement, fn;
          buttonElement = angular.element(element);
          button = new steroids.buttons.NavigationBarButton();
          button.imagePath = "" + (buttonElement.attr("icon")) + ".png";
          fn = $parse(buttonElement.attr("onTap"));
          button.onTap = function() {
            return fn(scope);
          };
          steroids.logger.log(button.onTap);
          return button;
        };
        leftButtons = [];
        rightButtons = [];
        angular.forEach(element.find("left-button"), function(element) {
          return leftButtons.push(_constructButtonFromElement(element));
        });
        angular.forEach(element.find("right-button"), function(element) {
          return rightButtons.push(_constructButtonFromElement(element));
        });
        updatedNavigationBar = {
          title: attrs.title,
          buttons: {
            left: leftButtons,
            right: rightButtons
          }
        };
        return steroids.view.navigationBar.update(updatedNavigationBar);
      }
    };
  });

}).call(this);
