contactsApp = angular.module 'contactsApp', ['navigationBar', 'ngTouch', 'contactsServices']


contactsApp.controller "ContactDrawerCtrl", ($scope) ->
  $scope.hideDrawer = ->
    steroids.drawers.hide()


contactsApp.controller "ContactIndexCtrl", ($scope, contactService) ->
  contactViews = {}
  contactViews.showView = []

  refreshContacts = () ->
    contactService.fetchContacts
      afterFetch: (data) ->
        $scope.contacts = data
  
  $scope.viewContact =  (contactId) ->    
    if !contactViews.showView[contactId]
      contactViews.showView[contactId] = new steroids.views.WebView  "/views/contacts/show.html?id=" + contactId
    
    steroids.layers.push contactViews.showView[contactId]

  $scope.addContact = () ->
    steroids.layers.push 
      view:
        id: 'new_contact'
  
  $scope.openDrawer = ->
    steroids.drawers.show {
      edge: steroids.screen.edges.LEFT
    }

  msgReceived = (event) ->
    if (event.data.recipient == "contactView")
      if event.data.message == 'refresh'
        refreshContacts()

  window.addEventListener("message", msgReceived)
  refreshContacts()

  steroids.view.navigationBar.show()
  steroids.view.setBackgroundColor "#FFFFFF"

  return


contactsApp.controller "ContactShowCtrl", ($scope, contactService) ->
  

  contactService.fetchContact
    contactId: steroids.view.params["id"]
    afterFetch: (data) ->
      $scope.first_name = data.first_name
      $scope.last_name = data.last_name
      $scope.email = data.email

  
  # Native navigation
  steroids.view.navigationBar.show()
  steroids.view.setBackgroundColor "#FFFFFF"
  return


contactsApp.controller "ContactNewCtrl", ($scope, contactService) ->
 

  $scope.createContact = () ->
    contactService.saveContact
      data:
        first_name: $scope.first_name
        last_name: $scope.last_name
        email: $scope.email
      success : ->
        $scope.first_name = ""
        $scope.last_name = ""
        $scope.email = ""
        steroids.layers.pop()
        msg = {
          recipient: 'contactView'
          message: 'refresh'
        }
        window.postMessage(msg)

  return