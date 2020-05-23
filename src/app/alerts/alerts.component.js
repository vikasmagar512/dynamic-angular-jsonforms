/**
 * Alerts component
 * @class alerts
 * @example
 * <alerts></alerts>
 */
(function() {
  'use strict';
  angular.module('incosa').component('alerts', {
    templateUrl: 'partials/alerts.html',
    controllerAs: 'vm',
    controller: [
      '$window',
      'alertService',
      function AlertController($window, alertService) {
        $window.document.title = 'Alerts | Incosa Solutions';
        var vm = this;
        var alerts;
        vm.loader = true;
        vm.alertList = [];
        vm.tagSnapshotList = [];

        vm.showHistory = function(alert) {
          vm.tagSnapshotList = alert.snapshotValueList;
        };

        vm.$onInit = function() {
          alerts = alertService.getAlerts();
          alerts.promise.then(function(resp) {
            vm.alertList = resp;
            vm.tagSnapshotList = vm.showHistory(resp[0]);
            vm.loader = false;
          });
        };

        vm.$onDestroy = function() {
          alerts.cancel();
        };
      }
    ]
  });
})();
