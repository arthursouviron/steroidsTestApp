(function() {
  var contactsApp;

  contactsApp = angular.module('contactsApp', ['navigationBar', 'ngTouch', 'contactsServices']);

  contactsApp.controller("ContactDrawerCtrl", function($scope) {
    return $scope.hideDrawer = function() {
      return steroids.drawers.hide();
    };
  });

  contactsApp.controller("ContactIndexCtrl", function($scope, contactService) {
    var contactViews, msgReceived, refreshContacts;
    contactViews = {};
    contactViews.showView = [];
    refreshContacts = function() {
      return contactService.fetchContacts({
        afterFetch: function(data) {
          return $scope.contacts = data;
        }
      });
    };
    $scope.viewContact = function(contactId) {
      if (!contactViews.showView[contactId]) {
        contactViews.showView[contactId] = new steroids.views.WebView("/views/contacts/show.html?id=" + contactId);
      }
      return steroids.layers.push(contactViews.showView[contactId]);
    };
    $scope.addContact = function() {
      return steroids.layers.push({
        view: {
          id: 'new_contact'
        }
      });
    };
    $scope.openDrawer = function() {
      return steroids.drawers.show({
        edge: steroids.screen.edges.LEFT
      });
    };
    msgReceived = function(event) {
      if (event.data.recipient === "contactView") {
        if (event.data.message === 'refresh') {
          return refreshContacts();
        }
      }
    };
    window.addEventListener("message", msgReceived);
    refreshContacts();
    steroids.view.navigationBar.show();
    steroids.view.setBackgroundColor("#FFFFFF");
  });

  contactsApp.controller("ContactShowCtrl", function($scope, contactService) {
    contactService.fetchContact({
      contactId: steroids.view.params["id"],
      afterFetch: function(data) {
        $scope.first_name = data.first_name;
        $scope.last_name = data.last_name;
        return $scope.email = data.email;
      }
    });
    steroids.view.navigationBar.show();
    steroids.view.setBackgroundColor("#FFFFFF");
  });

  contactsApp.controller("ContactNewCtrl", function($scope, contactService) {
    $scope.createContact = function() {
      return contactService.saveContact({
        data: {
          first_name: $scope.first_name,
          last_name: $scope.last_name,
          email: $scope.email
        },
        success: function() {
          var msg;
          $scope.first_name = "";
          $scope.last_name = "";
          $scope.email = "";
          steroids.layers.pop();
          msg = {
            recipient: 'contactView',
            message: 'refresh'
          };
          return window.postMessage(msg);
        }
      });
    };
  });

}).call(this);
