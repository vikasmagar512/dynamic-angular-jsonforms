/**
 * SideNav Service
 * @class sidenavService
 */
(function() {
  'use strict';
  angular.module('incosa').factory('sidenavService', [sidenavService]);

  function sidenavService() {
    /**
     * @function getNavItems
     * @desc list of nav items
     * @returns {Array}
     */
    var getNavItems = function() {
      return [
        {
          link: 'dashboard',
          title: 'Dashboard',
          disabled: false,
          icon: 'dashboard'
        },
        {
          link: 'alerts',
          title: 'Alerts',
          count: 2,
          disabled: false,
          icon: 'notification_important'
        },
        {
          link: 'report',
          title: 'Report',
          count: 4,
          disabled: false,
          icon: 'show_chart'
        },
        {
          link: 'config',
          title: 'Config',
          count: 4,
          disabled: false,
          icon: 'show_chart'
        }
      ];
    };
    /**
     * @function toggleClass
     * @desc toggles class for main container and side nav
     * @parms {Object[]} elements - List of elements
     * @parms {string[]} klass - List of css classes to be operated.
     * @parms {boolean} add - Flad whether to add or remove class.
     */
    var toggleClass = function(elements, klass, add) {
      elements.forEach(function(ele, i) {
        add ? ele.classList.remove(klass[i]) : ele.classList.add(klass[i]);
      });
    };

    return {
      getNavItems: getNavItems,
      toggleClass: toggleClass
    };
  }
})();
