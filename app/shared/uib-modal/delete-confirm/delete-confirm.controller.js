angular
  .module('uibModal')
  .controller('DeleteConfirmModalController', [function () {
    var self = this;
    self.ok = function () {
      self.close({
        $value: 'ok'
      });
    }

    self.cancel = function () {
      self.dismiss({
        $value: 'cancel'
      });
    }
  }])