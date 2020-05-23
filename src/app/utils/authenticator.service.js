/**
 * Authenticator Service
 * @class authenticator
 */
(function() {
  'use strict';
  angular
    .module('incosa')
    .factory('authenticator', ['$rootScope', '$location', authenticator]);

  function authenticator($rootScope, $location) {
    /**
     * @function initialize
     * @desc authenticator
     */
    var initialize = function(url) {
      $rootScope.$on('$routeChangeStart', function() {
        $rootScope.login = $location.path() == '/login';
        var authenticated = sessionStorage.getItem('token') || false; //Requires JWT or better auth mechanism.
        if (!authenticated) {
          $location.path('/login');
        }
      });
    };
    return {
      initialize: initialize
    };
  }
})();
