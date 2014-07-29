drawerApp = angular.module 'drawerApp', ['DrawerModel', 'ngTouch']

drawerApp.controller 'IndexCtrl', ($scope, DrawerRestangular)->



  DrawerRestangular.all('drawer').getList().then (drawer)->
    $scope.drawer = drawer

  checkDefault = (item) ->
    if item.active and not $scope.currentItem
      $scope.currentItem = item

  $scope.isActive = (item)->
    checkDefault(item)
    return item.active

  $scope.switchMenu = (item)->
    if item.active
      steroids.drawers.hide {}
    else
      if item.id == 'logout'
        msg = {
          recipient: 'deviseView'
          message: 'logout'
        }
        window.postMessage(msg)
      else 
        steroids.drawers.hide 
          center: 
            id: item.id

        item.active = true
        $scope.currentItem && $scope.currentItem.active = false
        $scope.currentItem = item


  msgReceived = (event) ->
    if (event.data.recipient == "deviseView")
      if event.data.message == 'logout'
        
        steroids.drawers.hide {
          center:
            id: 'login'
        }

  window.addEventListener("message", msgReceived)

