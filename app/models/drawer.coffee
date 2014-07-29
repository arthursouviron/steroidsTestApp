(->
  
  # Protects views where AngularJS is not loaded from errors
  return  if typeof angular is "undefined"
  
  module = angular.module("DrawerModel", ["restangular"])
  
  module.factory "DrawerRestangular", (Restangular) ->
    Restangular.withConfig (RestangularConfigurer) ->
      RestangularConfigurer.setBaseUrl "http://localhost/data"
      RestangularConfigurer.setRequestSuffix ".json"
      return
  return
)()