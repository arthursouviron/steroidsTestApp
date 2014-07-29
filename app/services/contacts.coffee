contactsServices = angular.module 'contactsServices', []


contactsServices.service 'contactService', ($http) ->
  backendUrl = "http://arcane-falls-5190.herokuapp.com"
  #backendUrl = "http://192.168.0.3:3000"
  #backendUrl = 'http://127.0.0.1:3000'
  
  
  getSessionInfos = () ->
    session = {
      user_id: window.localStorage.getItem('user_id')
      token_url: 'user_email=' + window.localStorage.getItem('user_email') + '&user_token=' + window.localStorage.getItem('user_token')
    }



  fetchContacts : (options) ->
    session = getSessionInfos()
    if session.user_id > 0
      $http(
        method: 'GET'
        url: backendUrl + '/users/' + session.user_id + '/contacts.json?' + session.token_url
        format: 'jsonp'
      ).success( (res) ->
        options.afterFetch(res)
      ).error( (res) ->
        alert('error fetch')
      )
    
  fetchContact : (options) ->
    session = getSessionInfos()
    
    if session.user_id > 0
      $http(
        method: 'GET'
        url: backendUrl + '/users/' + session.user_id + '/contacts/' + options.contactId + '.json?' + session.token_url
        format: 'jsonp'
      ).success( (res) ->
        options.afterFetch(res)
      ).error( (res) ->
        alert('error fetch')
      )


  # updateContact : (data, id) ->
  #   $http(
  #     method: 'PUT'
  #     url: './users/' + window.current_user.id + '/contacts/' + id
  #     data: data
  #   ).then( (res) ->
  #     $location.path('/contacts')
  #   , (res) ->
  #     alert('error update')
  #   )

  saveContact : (options) ->
    session = getSessionInfos()

    $http(
      url: backendUrl + '/users/' + session.user_id + '/contacts.json?' + session.token_url
      method: 'POST'
      dataType: 'json'
      format: 'jsonp'
      data:
        contact:
          first_name: options.data.first_name
          last_name: options.data.last_name
          email: options.data.email
          avatar: options.data.avatar
    ).success( (res) ->
      options.success()
      
    ).error( (res) ->
      alert('error save')
    )
