/**
 * Navbar component
 * @class navbar
 * @example
 * <navbar></navbar>
 */
(function() {
  'use strict';
  angular.module('incosa').component('navbar', {
    templateUrl: 'partials/navbar.html',
    bindings: {
      title: '@'
    },
    controllerAs: 'vm',
    controller: [
      '$location',
      'navbarService',
      function NavBarController($location, navbarService) {
        var vm = this;
        var tempSessionItems = ['token', 'username'];
        var tempLocalItems = ['assetList', 'parameter', 'sensor', 'tags'];

        vm.user = sessionStorage.getItem('username');
        vm.logout = function() {
          navbarService.flushData(tempSessionItems, tempLocalItems);
          navbarService.clearContainer();
          $location.path('/');
          location.reload();
        };
      }
    ]
  });
})();
