angular
  .module('angularCRUD')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/users', {
        template: '<users></users>'
      })
      .when('/users/:id', {
        template: '<user></user>'
      })
      .otherwise('/users');
  }]);