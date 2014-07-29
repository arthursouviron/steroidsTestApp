navApp = angular.module 'navigationBar', ['ngTouch']

navApp.directive 'navigationBar', ($parse, $compile) ->
  restrict: 'E'
  link: (scope, element, attrs) ->
    _constructButtonFromElement = (element)->
      buttonElement = angular.element element
      button = new steroids.buttons.NavigationBarButton()
      button.imagePath = "#{buttonElement.attr("icon")}.png"

      fn = $parse buttonElement.attr("onTap")
      button.onTap = ->
        fn scope

      steroids.logger.log(button.onTap)

      return button

    leftButtons = []
    rightButtons = []

    angular.forEach element.find("left-button"), (element)->
      leftButtons.push _constructButtonFromElement(element)

    angular.forEach element.find("right-button"), (element)->
      rightButtons.push _constructButtonFromElement(element)

    updatedNavigationBar =
      title: attrs.title
      # overrideBackButton: attrs.overrideBackButton
      buttons:
        left: leftButtons
        right: rightButtons

    steroids.view.navigationBar.update(
      updatedNavigationBar
    )