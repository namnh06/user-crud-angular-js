angular
  .module('angularCRUD')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/users'
      })
      .when('/users', {
        template: '<users-component></users-component>'
      })
      .when('/user/:id', {
        template: '<user></user>'
      })
      .otherwise({
        redirectTo: '/users'
      });
  }]);