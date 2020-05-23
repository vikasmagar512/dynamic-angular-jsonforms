/**
 * History component
 * @class history
 * @example
 * <history></history>
 */
(function() {
  'use strict';
  angular.module('incosa').component('history', {
    templateUrl: 'partials/history.html',
    controllerAs: 'vm',
    controller: [
      '$window',
      '$location',
      '$routeParams',
      'historyService',
      function HistoryController(
        $window,
        $location,
        $routeParams,
        historyService
      ) {
        $window.document.title = 'Asset history | Incosa Solutions';
        var vm = this;
        vm.loader = true;
        vm.assetId = $routeParams.id;
        vm.datapointsForHistoryTable = [];
        vm.breadcrumbItems = [
          { title: 'Dashboard', route: 'dashboard' },
          { title: vm.assetId, route: 'asset/' + vm.assetId }
        ];
        var parameter = historyService.getParameter();
        if (parameter == null) {
          $location.path('/asset/' + vm.assetId);
        }
        var tagName = parameter.tag;
        var timeStampDiff = 30 * 60 * 1000;
        var end = parameter.timestamp;
        var start = end - timeStampDiff;
        var d = new Date();

        var defaultEndDate = Math.round(d.getTime() / 1000);
        var defaultStartDate = defaultEndDate - timeStampDiff;
        vm.startTime = new Date(defaultStartDate * 1000).toLocaleString();
        vm.endTime = new Date(defaultEndDate * 1000).toLocaleString();

        var updateTimeBounds = function(tagName, start, end) {
          vm.loader = true;
          historyService
            .getTimeBoundValues(tagName, start, end)
            .then(function(resp) {
              var valueArray = []
              
              for(let tag in resp){
                for(let datapoint of resp[tag]){
                  valueArray.push([datapoint.timestamp,datapoint.value])
                }
              }
              vm.datapointsForHistoryTable = valueArray
              
              historyService.displayDataOnChart(
                vm.datapointsForHistoryTable,
                tagName
              );
              vm.loader = false;
            });
        };

        vm.dpForSingleTag = function(from, to) {
          var start = new Date(from).getTime();
          var end = new Date(to).getTime();
          updateTimeBounds(tagName, start, end);
        };
        
        vm.$onInit = function() {
          updateTimeBounds(tagName, start, end);
        };
      }
    ]
  });
})();
