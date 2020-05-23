/**
 * Sidenav component
 * @class sidenav
 * @example
 * <sidenav></sidenav>
 */
(function() {
  'use strict';
  angular.module('incosa').component('sidenav', {
    templateUrl: 'partials/sidenav.html',
    controller: [
      '$route',
      '$rootScope',
      '$window',
      'sidenavService',
      function SidenavController($route, $rootScope, $window, sidenavService) {
        var main = $window.document.getElementById('incosa-container');
        var sidenav = $window.document.getElementById('sidenav');
        var mainClass = 'incosa-container--full-screen';
        var sideNavClass = 'sidenav--collapsed';
        var self = this;
        self.$route = $route;
        self.collapsed = false;
        self.navItems = sidenavService.getNavItems();
        /**
         * @namespace SidenavController
         * @function toggleMenu
         * @desc Toggles the sidenav on menu click
         */
        self.toggleMenu = function() {
          sidenavService.toggleClass(
            [main, sidenav],
            [mainClass, sideNavClass],
            self.collapsed
          );
          self.collapsed = !self.collapsed;
        };
        if (!$rootScope.login)
          $window.matchMedia('(max-width: 700px)').matches && self.toggleMenu();
      }
    ]
  });
})();
