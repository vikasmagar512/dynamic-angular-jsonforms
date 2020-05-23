/**
 * Breadcrumb component
 * @class breadcrumb
 * @example
 * <breadcrumb></breadcrumb>
 */
(function() {
  'use strict';
  angular.module('incosa').component('breadcrumb', {
    templateUrl: 'partials/breadcrumb.html',
    bindings: {
      current: '@',
      items: '<'
    },
    controllerAs: 'vm',
    controller: [function BreadcrumbController() {}]
  });
})();
