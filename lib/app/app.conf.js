(function () {
  return angular.module("danlan")
    .constant("serverUrl", "http://localhost:8000")
    .constant("isDebug", true)
    .constant("assetUrl", "app/")
    .constant("COOKIE_CONFIG", {
      "path": "/",
      "domain": "localhost"
    });

})();