/**
 * Main entry point
 * @class incosa
 * @requires dependecies 'ngRoute', 'ngAnimate', 'ngTouch', 'angularjs-dropdown-multiselect', 'angularjs-datetime-picker', 'angularjs-gauge', 'angularUtils.directives.dirPagination', 'ui.bootstrap'
 */
(function() {
  angular
    .module('incosa', [
      'ngRoute',
      'ngAnimate',
      'ngTouch',
      'angularjs-dropdown-multiselect',
      'angularjs-datetime-picker',
      'angularjs-gauge',
      'angularUtils.directives.dirPagination',
      'jsonforms',
      'ui.bootstrap',
    ])
    .config([
      '$routeProvider',
      '$qProvider',
      'paginationTemplateProvider',
      'ngGaugeProvider',
      function config(
        $routeProvider,
        $qProvider,
        paginationTemplateProvider,
        ngGaugeProvider
      ) {
        $routeProvider
          .when('/dashboard', {
            template: '<dashboard></dashboard>',
            activetab: 'dashboard'
          })
          .when('/asset/:id', {
            template: '<asset></asset>',
            activetab: 'dashboard'
          })
          .when('/asset/:id/history', {
            template: '<history></history>',
            activetab: 'dashboard'
          })
          .when('/alerts', {
            template: '<alerts></alerts>',
            activetab: 'alerts'
          })
          .when('/config', {
            template: '<config></config>',
            activetab: 'config'
          })
          .when('/report', {
            template: '<report></report>',
            activetab: 'report'
          })
          .when('/login', {
            template: '<login></login>',
            activetab: 'report'
          })
          .otherwise('/login');
        paginationTemplateProvider.setPath('./templates/pagination.html');
        $qProvider.errorOnUnhandledRejections(false);
        ngGaugeProvider.setOptions({
          size: 250,
          cap: 'round',
          thick: 15,
          foregroundColor: '#ff8645',
          backgroundColor: '#e4e4e4'
        });
      }
    ])
    .run(duringRun);

  duringRun.$inject = ['authenticator'];

  function duringRun(authenticator) {
    authenticator.initialize();
  }
})();
