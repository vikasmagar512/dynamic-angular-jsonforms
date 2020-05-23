/**
 * Spinner component
 * @class spinner
 * @example
 * <spinner></spinner>
 */
(function() {
  'use strict';
  angular.module('incosa').component('spinner', {
    templateUrl: 'partials/spinner.html',
    bindings: {
      secondaryColor: '='
    },
    controllerAs: 'vm',
    controller: [function SpinnerController() {}]
  });
})();
