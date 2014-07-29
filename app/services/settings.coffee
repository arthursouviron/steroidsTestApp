settingsServices = angular.module 'settingsServices', []


settingsServices.service 'settingsService',  ($http) ->
  backendUrl = "http://arcane-falls-5190.herokuapp.com"
  #backendUrl = "http://192.168.0.3:3000"
  #backendUrl = 'http://127.0.0.1:3000'


  # getSessionInfos = () ->
  #   session = {
  #     user_id: window.localStorage.getItem('user_id')
  #     token_url: 'user_email=' + window.localStorage.getItem('user_email') + '&user_token=' + window.localStorage.getItem('user_token')
  #   }
 
  uploadAvatar : (imageURI) ->
    options = new FileUploadOptions()
    options.fileKey = "avatar"
    options.fileName = imageURI.substr(imageURI.lastIndexOf("/") + 1)
    options.mimeType = "image/jpeg"
    
    win = (r) ->
      alert('Image sent')
 
    fail = (error) ->
      alert "An error has occurred: Code = " + error.code
      return

    options.params = 
      user_email: window.localStorage.getItem('user_email')
      user_token:  window.localStorage.getItem('user_token')
    ft = new FileTransfer()
    ft.upload imageURI, encodeURI(backendUrl + "/users/edit_avatar"), win, fail, options
    return
 

  # fetchAvatar : (imageURI) ->
  #   msg =
  #     recipient: 'settingsView'
  #     message: 'avatar'

  #   window.postMessage(msg)
  #   if window.localStorage.getItem('avatar')
  #     $scope.avatar =  backendUrl  + window.localStorage.getItem('avatar')
  

  