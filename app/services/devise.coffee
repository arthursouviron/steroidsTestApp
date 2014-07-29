deviseServices = angular.module 'deviseServices', []

deviseServices.service('deviseService', ($http, $location) ->
  backendUrl = "http://arcane-falls-5190.herokuapp.com"
  #backendUrl = "http://192.168.0.3:3000"

  #backendUrl = 'http://127.0.0.1:3000'

  loadSession : (options) ->
    if window.localStorage.getItem('user_email') && window.localStorage.getItem('user_token')
      $http(
        method: 'GET'
        url: backendUrl + "/users/sign_in.json?user_email=" + window.localStorage.getItem('user_email') + '&user_token=' + window.localStorage.getItem('user_token')
      ).success( (res) ->
        options.success()
      ).error( (res) ->
        alert('error')
      )

  login : (options) ->
    $http(
      method: 'POST'
      url: backendUrl + "/users/sign_in.json"
      dataType: 'json'
      format: 'jsonp'
      data:
        user:
          email: options.email
          password: options.password
    ).success( (res) ->
      console.log res.avatar_url
      if res && res.success && res.user
        window.localStorage.setItem('user_id', res.user.id)
        window.localStorage.setItem('user_token', res.authentication_token)
        window.localStorage.setItem('user_email', options.email)
        window.localStorage.setItem('avatar', res.avatar_url)
        options.success()
      else
        alert 'Mot de passe/Email incorrect'

    ).error( (data) ->
      console.log 'error', data
    )

  logout : (options) ->
    $http(
      method: 'DELETE'
      url: backendUrl + "/users/sign_out.json?user_email=" + window.localStorage.getItem('user_email') + "&user_token=" + window.localStorage.getItem('user_token')
      dataType: 'json'
      format: 'jsonp'
      
    ).success( (res) ->
      window.localStorage.removeItem('user_id')
      window.localStorage.removeItem('user_token')
      window.localStorage.removeItem('user_email')
      options.success()
      # if res && res.success && res.user
      #   window.localStorage.setItem('user_id', res.user.id)
      #   window.localStorage.setItem('user_token', res.authentication_token)
      #   window.localStorage.setItem('user_email', options.email)
      #   options.success()
      # else
      #   alert 'Mot de passe/Email incorrect'

    ).error( (data) ->
      alert "ERREUR LOGOUT"
      #console.log 'error', data
    )

  signUp : (options) ->
    $http(
      method: 'POST'
      url: backendUrl + "/users"
      dataType: 'json'
      format: 'jsonp'
      data:
        user:
          email: options.email
          password: options.password
          password_confirmation: options.password_confirmation
    ).success( (res) ->
      if res.data
        console.log res
        window.localStorage.clear()
        window.localStorage.setItem('user_id', res.data.id)
        window.localStorage.setItem('user_token', res.data.authentication_token)
        window.localStorage.setItem('user_email', res.data.email)
        options.success()
      else
        if res.state.messages[0]
          alert(res.state.messages[0])

      console.log(res)
      # if res && res.success && res.user
      #   window.localStorage.setItem('user_id', res.user.id)
      #   window.localStorage.setItem('user_token', res.authentication_token)
      #   window.localStorage.setItem('user_email', options.email)
    ).error( (data) ->
      alert 'error creation account'
    )



)