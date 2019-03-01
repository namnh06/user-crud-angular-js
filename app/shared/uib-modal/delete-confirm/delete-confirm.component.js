angular
  .module('uibModal')
  .component('deleteConfirmModalComponent', {
    templateUrl: 'app/shared/uib-modal/delete-confirm/delete-confirm.template.html',
    controller: 'DeleteConfirmModalController',
    controllerAs: 'dcmc',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    }
  })