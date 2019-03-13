angular
  .module('angularCRUD')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/users', {
        template: '<users></users>'
      })
      .otherwise('/users');
  }]);