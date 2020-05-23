/**
 * Report component
 * @class report
 * @example
 * <report></report>
 */
(function() {
  'use strict';
  angular.module('incosa').component('report', {
    templateUrl: 'partials/report.html',
    controllerAs: 'vm',
    controller: [
      '$window',
      '$scope',
      'reportService',
      function ReportController($window, $scope, reportService) {
        $window.document.title = 'Report | Incosa Solutions';
        var vm = this;
        var tags;
        vm.assetList = [];
        vm.tagList = [];
        vm.selectedAssetList = [];
        vm.selectedTagList = [];
        vm.loader = true;
        //check with limit in seleciton
        vm.listSettings = reportService.getListOptions();
        var assetListLocal = JSON.parse(localStorage['assetList']) || [];

        assetListLocal.map(function(asset) {
          vm.assetList.push({ id: asset.id });
        });

        vm.$onInit = function() {
          tags = reportService.getTags();
          tags.promise.then(function(tags) {
            reportService.setTags(tags);
            vm.loader = false;
          });
        };

        vm.$onDestroy = function() {
          tags.cancel();
        };

        vm.getDataForTags = function(startDate, endDate) {
          vm.loader = true;
          reportService
            .getDataForTags(vm.selectedTagList, startDate, endDate)
            .then(function(data) {
              vm.seriesOptions = data.seriesOptions;
              vm.tableContent = data.tableContent;
              vm.tableHeaders = data.tableHeaders;
              reportService.displayDataOnChart(data.seriesOptions);
              vm.loader = false;
            });
        };

        $scope.$watchCollection(
          'vm.selectedAssetList',
          function() {
            vm.tagList = vm.selectedAssetList.length
              ? reportService.getTagsByAssets(vm.selectedAssetList)
              : [];
          },
          true
        );
      }
    ]
  });
})();
