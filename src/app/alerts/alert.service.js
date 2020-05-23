/**
 * Alert Service
 * @class alertService
 */
(function() {
  'use strict';
  angular
    .module('incosa')
    .factory('alertService', ['httpService', '$document', alertService]);
  /**
   * @function alertService
   * @desc Alert Service
   * @param {func} httpService
   * @returns {Object}
   */
  function alertService(httpService, $document) {
    var url = 'http://incosa-monitoring.tk:8081/assetmgmt-api/alert/v1.0/20';
      //'http://localhost:8081/assetmgmt-api/alert/v1.0/20';

    /**
     * @function getTags
     * @desc List of tags from API.
     * @returns {Object[]}
     */
    var getAlerts = function() {
      return httpService.get(url, true);
    };
    /**
     * @function showHistory
     * @desc plot data on the chart and prepare snapshot
     * @param {Object} alert
     * @returns {Object}
     */
    var showHistory = function(alert) {
      var alertHistoryList = [];
      var tagSnapshotList = alert.snapshotValueList;

      alert.alertHistory.forEach(function(alertHistory) {
        alertHistoryList.push([alertHistory.timestamp, alertHistory.value]);
      });

      Highcharts.chart('alertHistory', {
        chart: {
          zoomType: 'x'
        },
        title: {
          text: alert.assetId + '_' + alert.tagName + ' vs time'
        },
        subtitle: {
          text:
            $document[0].ontouchstart === undefined
              ? 'Click and drag in the plot area to zoom in'
              : 'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Values'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              }
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },

        series: [
          {
            type: 'line',
            name: 'Trendline',
            data: alertHistoryList
          }
        ]
      });
      return tagSnapshotList;
    };
    return {
      getAlerts: getAlerts,
      showHistory: showHistory
    };
  }
})();
