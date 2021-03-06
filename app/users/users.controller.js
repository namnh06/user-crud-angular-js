angular.module('users').controller('UsersController', [
  '$http',
  '$location',
  '$route',
  '$uibModal',
  'UserService',
  function ($http, $location, $route, $uibModal, UserService) {
    var self = this;
    self.$onInit = function () {
      self.userForm = {};
      self.userForm.status = false;
      self.userForm.edit = false;
      UserService.getUsers().then(function (response) {
        console.log(response);
        self.users = response.data;
      });
    };

    self.onCreateAnUserClick = function () {
      self.userForm.status = true;
      self.userForm.edit = false;
      self.userForm.name = '';
      self.userForm.email = '';
      self.userForm.password = '';
    };

    self.onAddUpdateUserFormClick = function () {
      if (self.userForm.edit) {
        UserService.updateUser(self.userForm).then(function (response) {
          if (parseInt(response.data.status) === 200) {
            self.userForm.status = false;
            var user = response.data.data.user;
          }
        });
        return;
      }

      UserService.addUser(self.userForm).then(function (response) {
        if (parseInt(response.data.status) === 201) {
          self.userForm.status = false;
          var user = response.data.data.user;
          self.users.unshift(user);
        }
      });
      return;
    };

    self.onCancelUserFormClick = function () {
      self.userForm.status = false;
    };


    self.onEditButtonClick = function (user) {
      self.userForm.status = true;
      self.userForm.edit = true;
      self.userForm.editUserID = user.id;
      self.userForm.name = user.name;
      self.userForm.email = user.email;
      self.userForm.password = user.password;
    };

    self.onShowButtonClick = function (user) {
      var path = '/user/' + user.id;
      console.log(path);
      $location.path(path);
    }

    self.onOrderByClicked = function (order) {
      self.userOrder = order;
    };

    self.onDeleteButtonClick = function (id) {
      var userID = id;

      var modalInstance = $uibModal.open({
        animation: true,
        component: 'deleteConfirmModalComponent'
      });
      modalInstance.result.then(
        function (message) {
          if (message === 'ok') {
            UserService.deleteUser(userID).then(function (response) {
              self.users = self.users.filter(function (user) {
                return user.id !== userID;
              });
            });
          }
        },
        function (message) {}
      );
    };
  }
]);