(function() {
  (function() {
    var module;
    if (typeof angular === "undefined") {
      return;
    }
    module = angular.module("DrawerModel", ["restangular"]);
    module.factory("DrawerRestangular", function(Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl("http://localhost/data");
        RestangularConfigurer.setRequestSuffix(".json");
      });
    });
  })();

}).call(this);
