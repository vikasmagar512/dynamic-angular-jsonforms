/**
 * IO controller
 * @class ioController
 * @example
 */
(function() {
  angular
    .module('incosa')
    .controller('IoController', [
      '$uibModalInstance',
      'io',
      'assetId',
      'assetService',
      ioController
    ]);
  function ioController($uibModalInstance, io, assetId, assetService) {
    var vm = this;
    vm.io = io;
    vm.assetId = assetId;
    vm.loader = false;
    vm.toggled = false;
    vm.modalTitle = 'Toggle GPIO';

    vm.ok = function() {
      vm.loader = true;
      assetService.toggleIo(io, vm.assetId).then(function(resp) {
        vm.modalTitle = 'Done!';
        vm.toggled = true;
        vm.loader = false;
      });
    };

    vm.cancel = function() {
      $uibModalInstance.dismiss();
    };
  }
})();
