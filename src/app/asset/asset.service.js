/**
 * Asset Service
 * @class assetService
 */
(function() {
  'use strict';
  angular
    .module('incosa')
    .factory('assetService', ['httpService', '$q', '$window', assetService]);
  /**
   * @function alertService
   * @desc Alert Service
   * @param {func} httpService
   * @param {Object} $q
   * @param {Object} $window
   * @returns {Object}
   */
  function assetService(httpService, $q, $window) {
    var url = 'http://incosa-monitoring.tk:8081';
    //var url = 'http://localhost:8081';

    var ioUrl = 'https://yc6gmq525l.execute-api.us-west-2.amazonaws.com';
    /**
     * @function getLatestSensorData
     * @desc Get the sensor details.
     * @param {Number} assetId
     * @returns {Object[]}
     */
    var getLatestSensorData = function(assetId) {
      var api = url + '/assetmgmt-api/asset/v1.0/' + assetId
      return httpService.get(api, true);
    };
    /**
     * @function getGaugeWidth
     * @desc Get width for the gauge
     * @returns {Number}
     */
    var getGaugeWidthAndThickness = function() {
      var width =
        $window.innerWidth ||
        $window.document.documentElement.clientWidth ||
        $window.document.body.clientWidth;
      return {
        width: Math.round(width * 0.148) + '',
        thickness: Math.round(width * 0.015625) + ''
      };
    };
    /**
     * @function getModalOpts
     * @desc Get modal options
     * @param {Object} io
     * @param {String} assetId
     * @param {Object} parentElem
     * @returns {Object}
     */
    var getModalOpts = function(io, assetId, parentElem) {
      return {
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'io-modal.html',
        controller: 'IoController',
        controllerAs: 'vm',
        appendTo: parentElem,
        resolve: {
          io: function() {
            return io;
          },
          assetId: function() {
            return assetId;
          }
        }
      };
    };
    /**
     * @function getStatusTags
     * @desc Get status tags
     * @param {Object[]} parameters
     * @returns {Object[]}
     */
    var getStatusAndParametersTags = function(parameters) {
      var parametersGauge = [];
      var statusTags = [];
      Object.keys(parameters).map(function(tag) {
        parameters[tag].tileType == 'gauge'
          ? parametersGauge.push(parameters[tag])
          : statusTags.push(parameters[tag]);
      });
      return { tags: statusTags, gauge: parametersGauge };
    };
    /**
     * @function getActivityInfo
     * @desc Get status tags
     * @param {String} assetId
     * @returns {Object}
     */
    var getActivityInfo = function(assetId) {
      var defer = $q.defer();
      var currentStatus = 'OFF';
      var currentStatusColor = 'color:red';
      var currentStatusPanel = 'panel panel-danger';

      var tagName = assetId + '_ESTOP';
      var endDate = new Date();
      var startTime = new Date(endDate.getFullYear(), 0, 1).getTime();

      var query = {
        tagNames: [assetId + '_ESTOP'],
        from: startTime,
        to: endDate.getTime()
      };

      httpService.get(url+ "/assetmgmt-api/asset/v1.0/heartBeat/" + assetId,true).then(function(res) {
        var estopData = res[assetId + '_ESTOP']
        var onTime = 0;
        var yearlyOnTimeInHours;
        var monthlyOnTime = 0;
        var dailyOnTime = 0;
        var cur = new Date();
        var diff;
        var monthDate = new Date(
          cur.getFullYear(),
          cur.getMonth(),
          1
        ).getTime();
        var todayDate = new Date(
          cur.getFullYear(),
          cur.getMonth(),
          cur.getDate()
        ).getTime();
        for (var i = 0; i < estopData.length - 1; i++) {
          var prevValue = estopData[i].value;
          var curValue = estopData[i + 1].value;
          if (
            (prevValue == 1 && curValue == 0) ||
            (prevValue == 1 && curValue == 1)
          ) {
            diff = estopData[i + 1].timestamp - estopData[i].timestamp;
            if (estopData[i].timestamp > monthDate) {
              monthlyOnTime += diff;
            }
            if (estopData[i].timestamp > todayDate) {
              dailyOnTime += diff;
            }
            onTime += diff;
          }
        }
        if (curValue == 1) {
          currentStatus = 'ON';
          currentStatusColor = 'text-success';
          // currentStatusPanel = 'card bgx-success';
          diff = cur.getTime() - estopData[estopData.length - 1].timestamp;
          if (estopData[i].timestamp > monthDate) {
            monthlyOnTime += diff;
          }
          if (todayDate > estopData[i].timestamp) {
            dailyOnTime = cur.getTime() - todayDate;
          }
          onTime += diff;
        } else {
          currentStatus = 'OFF';
          currentStatusColor = 'text-danger';
          // currentStatusPanel = 'card bgx-danger';
        }

        yearlyOnTimeInHours = Math.round(onTime / (1000 * 60 * 60 * 24));
        monthlyOnTime = Math.round(monthlyOnTime / (1000 * 60 * 60 * 24));
        dailyOnTime = Math.floor(dailyOnTime / (1000 * 60 * 60));
        defer.resolve({
          yearlyOnTimeInHours: yearlyOnTimeInHours,
          monthlyOnTime: monthlyOnTime,
          dailyOnTime: dailyOnTime,
          currentStatusPanel: currentStatusPanel,
          currentStatusColor: currentStatusColor,
          currentStatus: currentStatus
        });
      });
      return defer.promise;
    };
    /**
     * @function setSensor
     * @desc Set selected sensor
     * @param {Object} sensors
     */
    var setSensor = function(sensor) {
      localStorage.setItem('sensor', JSON.stringify(sensor));
    };
    /**
     * @function setParameter
     * @desc Set parameter for sensor
     * @param {Object} parameter
     */
    var setParameter = function(parameter) {
      localStorage.setItem('parameter', JSON.stringify(parameter));
    };
    /**
     * @function toggleIo
     * @desc Toggle GPIO
     * @param {Object} io
     * @param {String} assetId
     * @returns {Object}
     */
    var toggleIo = function(io, assetId) {
      var req = {
        topic: assetId,
        message: { gpio: io.topic, value: 1 }
      };
      return httpService.post(ioUrl + '/control/v1/gpio', req, false);
    };

    var updateUserAlertPref = function(userPrefDTO) {
      return httpService.put(url + '/assetmgmt-api/alert-pref/v1.0/email/', userPrefDTO, true);
    }

    var getUserAlertPref = function(assetId) {
      var api = url + '/assetmgmt-api/alert-pref/v1.0/email/' + assetId;
      return httpService.get(api, true);
    }

    return {
      getLatestSensorData: getLatestSensorData,
      getGaugeConfig: getGaugeWidthAndThickness,
      getModalOpts: getModalOpts,
      getData: getStatusAndParametersTags,
      getActivityInfo: getActivityInfo,
      setSensor: setSensor,
      setParameter: setParameter,
      toggleIo: toggleIo,
      updateUserAlertPref: updateUserAlertPref,
      getUserAlertPref: getUserAlertPref
    };
  }
})();
