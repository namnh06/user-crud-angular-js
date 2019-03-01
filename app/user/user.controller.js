angular
  .module('user')
  .controller('UserController', ['$http', '$routeParams', 'UserService', function ($http, $routeParams, UserService) {
    var self = this;
    self.$onInit = function () {
      var id = $routeParams.id;
      UserService.getUser(id).then(
        function (response) {
          self.user = response.data.user;
        }
      )
    }

  }]);