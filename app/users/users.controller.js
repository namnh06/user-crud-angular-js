angular
  .module('users')
  .controller('UsersController', ['$http', function ($http) {
    var self = this;
    $http.get('app/users/users.json').then(function (response) {
      self.users = response.data;
    })
  }]);