/**
 * History Service
 * @class historyService
 */
(function() {
  'use strict';
  angular
    .module('incosa')
    .factory('historyService', ['httpService', '$document', historyService]);
  /**
   * @function historyService
   * @desc Alert Service
   * @param {func} httpService
   * @returns {Object}
   */
  function historyService(httpService, $document) {
    var url =
    'http://incosa-monitoring.tk:8081';
    //'http://localhost:8081/reports/api/v1/';
    /**
     * @function getParameter
     * @desc Get parameter for sensor
     * @returns {Object}
     */
    var getParameter = function(parameter) {
      var parameter;
      var parameter = localStorage.getItem('parameter');
      parameter = parameter && JSON.parse(parameter);
      return parameter;
    };
    /**
     * @function getTimeBoundValues
     * @desc Fetch data fot tags.
     * @param {String} tagName
     * @param {String} startTime
     * @param {String} endTime
     * @returns {Object[]}
     */
    var getTimeBoundValues = function(tagName, startTime, endTime) {
      var query = {
        tagNames: [tagName],
        from: startTime,
        to: endTime
      };
      return httpService.post(url + '/assetmgmt-api/report/v1.0/datapoints', query,true);
    };
    /**
     * @function displayDataOnChart
     * @desc plot data on the chart
     * @param {Object} dataPoints
     * @param {String} title
     */
    var displayDataOnChart = function(dataPoints, title) {
      debugger;
      Highcharts.chart('container', {
        chart: {
          zoomType: 'x'
        },
        title: {
          text: title + ' vs time'
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
            data: dataPoints
          }
        ]
      });
    };
    return {
      displayDataOnChart: displayDataOnChart,
      getParameter: getParameter,
      getTimeBoundValues: getTimeBoundValues
    };
  }
})();
