/**
 * Asset component
 * @class asset
 * @example
 * <asset></asset>
 */
(function () {
  'use strict';
  angular.module('incosa').component('asset', {
    templateUrl: 'partials/asset.html',
    controllerAs: 'vm',
    controller: [
      '$window',
      '$document',
      '$location',
      '$routeParams',
      '$uibModal',
      '$interval',
      'assetService',
      function AssetController(
        $window,
        $document,
        $location,
        $routeParams,
        $uibModal,
        $interval,
        assetService
      ) {
        $window.document.title = 'Asset | Incosa Solutions';
        var vm = this;
        var assetData;
        var gauge = assetService.getGaugeConfig();
        vm.loader = true;
        vm.statusTags = [];
        vm.ioControls = [];
        vm.parametersGauge = [];
        vm.health = {};
        vm.assetId = $routeParams.id;
        vm.gaugewidth = gauge.width;
        vm.gaugeThickness = gauge.thickness;
        vm.breadcrumbItems = [{ title: 'Dashboard', route: 'dashboard' }];
        var userParametersForAlerts = [];

        function cancelTimer() {
          $interval.cancel(vm.timer);
        }

        vm.$onInit = function () {
          // assetService.getActivityInfo(vm.assetId).then(function (resp) {
          //   vm.health = resp;
          // });

          var emailPrefs = assetService.getUserAlertPref(vm.assetId);
          emailPrefs.promise.then(function(data) {
            userParametersForAlerts = data;
          })


          assetData = assetService.getLatestSensorData(vm.assetId);
          assetData.promise.then(function (data) {
            var sensorData = data;
            vm.ioControls = sensorData.ioControls;
            var data = assetService.getData(sensorData.parameters);
            vm.statusTags = data.tags;
            vm.parametersGauge = data.gauge;
            assetService.setSensor(sensorData);
            vm.loader = false;
          });

          getLatestValues();
        };

        vm.$onDestroy = function () {
          assetData.cancel();
          cancelTimer();
        };

        vm.showHistory = function (parameter) {
          assetService.setParameter(parameter);
          $location.path('/asset/' + vm.assetId + '/history');
        };

        vm.emailAlerts = function (parameter) {
          var userPrefDTO =
          {
            assetId: vm.assetId,
            parameterId: parameter.tag,
            toggle: !parameter.toggle
          }
          assetService.updateUserAlertPref(userPrefDTO);
        };

        vm.openIoModal = function (io) {
          var parentElem = angular.element(
            $document[0].querySelector('.asset')
          );

          $uibModal
            .open(assetService.getModalOpts(io, vm.assetId, parentElem))
            .result.then(function () { }, function () { });
        };

        vm.sort = function (keyname) {
          vm.sortKey = keyname;
          vm.reverse = !vm.reverse;
        };

        var getLatestValues = function (){
            assetData = assetService.getLatestSensorData(vm.assetId);
            assetData.promise.then(function (data) {
              var sensorData = data;
              assetService.setSensor(sensorData);
                Object.keys(sensorData.parameters).map(function (tag) {
                  var tempTag = sensorData.parameters[tag];
                  if (tempTag.tileType == 'gauge') {
                    vm.parametersGauge.map(function (parameter) {
                        if(userParametersForAlerts.includes(parameter.tag)){
                            parameter.toggle = true
                        }
                      if (
                        parameter.tag == tempTag.tag &&
                        parameter.value != tempTag.value
                      ) {
                        parameter.value = tempTag.value;
                      }
                    });
                  } else {
                    vm.statusTags.map(function (parameter) {
                        if(userParametersForAlerts.includes(parameter.tag)){
                            parameter.toggle = true
                        }
                      if (
                        parameter.tag == tempTag.tag &&
                        parameter.value != tempTag.value
                      ) {
                        parameter.value = tempTag.value;
                      }
                    });
                  }
              });
            });
        }

        vm.timer = $interval(function () {
          if (vm.assetId) {
            getLatestValues()
          } else {
            cancelTimer();
          }
        }, 1000);
      }
    ]
  });
})();

