angular
  .module('header')
  .controller('HeaderController', ['$location', function ($location) {
    var self = this;
    self.onHomeButtonClick = function () {
      $location.path('/users');
    }
  }])