/**
 * Dashboard component
 * @class dashboard
 * @example
 * <dashboard></dashboard>
 */
(function() {
  angular.module('incosa').component('dashboard', {
    templateUrl: 'partials/dashboard.html',
    controllerAs: 'vm',
    controller: [
      'dashboardService',
      '$window',
      '$location',
      function DashboardController(dashboardService, $window, $location) {
        var vm = this;
        var sensors;
        $window.document.title = 'Dashboard | Incosa Solutions';
        vm.sensorList = [];
        vm.loader = true;
        
        vm.changeData=function(event){
          alert('changeData')
        }
        vm.sensorDisplay = function(sensor) {
          $location.path('/asset/' + sensor.id);
        };

        vm.$onInit = function() {
          sensors = dashboardService.getSensorList();
          sensors.promise.then(function(sensors) {
            vm.sensorList = sensors;
            dashboardService.setSensorList(sensors);
            vm.loader = false;
          });
        };

        vm.$onDestroy = function() {
          sensors.cancel();
        };
      }
    ]
  });
})();
