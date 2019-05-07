angular
  .module('angularCRUD')
  .service('UserService', ['$http', function ($http) {
    var self = this;
    var url = 'http://localhost/user-crud-laravel/public/api/users';
    // var url = 'https://namcoi.com/projects/user-crud-laravel-api/public/api/users';
    self.getUsers = function () {
      return $http.get(url);
    }

    self.getUser = function (id) {
      return $http.get(url + '/' + id);
    }

    self.deleteUser = function deleteUser(id) {
      return $http.delete(url + '/' + id);
    }

    self.addUser = function addUser(user) {
      return $http.post(url, user);
    }

    self.updateUser = function updateUser(user) {
      return $http.put(url + '/' + user.editUserID, user);
    }
  }])