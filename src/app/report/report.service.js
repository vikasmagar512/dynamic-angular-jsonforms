/**
 * Report Service
 * @class reportService
 */
(function() {
  'use strict';
  angular
    .module('incosa')
    .factory('reportService', ['httpService', '$filter', '$q', reportService]);

  function reportService(httpService, $filter, $q) {
    /**
     * @function getListOptions
     * @desc Multi-select options
     * @returns {Object}
     */
    var api = 
    'http://incosa-monitoring.tk:8081';
    //'http://localhost:8081';
      //'https://time-series-store-predix.run.aws-usw02-pr.ice.predix.io/v1/';

    var getListOptions = function() {
      return {
        displayProp: 'id',
        enableSearch: true,
        showSelectAll: true,
        keyboardControls: true,
        checkBoxes: true,
        scrollable: true,
        buttonClasses: 'form-control',
        styleActive: true
      };
    };
    /**
     * @function getTagsByAssets
     * @desc Get all tags by asset id.
     * @param {Object[]} assets - selected assests
     * @returns {Object[]}
     */
    var getTagsByAssets = function(assets) {
      var tags = [];
      var tempTags = localStorage.getItem('tags') || [];
      tempTags = tempTags && JSON.parse(tempTags);
      tempTags.forEach(function(tag) {
        assets.forEach(function(asset) {
          if (tag.includes(asset.id)) tags.push({ id: tag });
        });
      });

      return tags;
    };
    /**
     * @function getTags
     * @desc List of tags from API.
     * @returns {Object[]}
     */
    var getTags = function() {
      return httpService.get(api + '/assetmgmt-api/report/v1.0/tags', true);
    };
    /**
     * @function setTags
     * @desc Store all the tags in `localStorage`
     */
    var setTags = function(tags) {
      localStorage.setItem('tags', JSON.stringify(tags));
    };
    /**
     * @function getDataForTags
     * @desc Fetch data fot tags.
     * @param {Object[]} selectedTags
     * @param {string} startDate
     * @param {string} endDate
     * @returns {Object[]}
     */
    var getDataForTags = function(selectedTags, startDate, endDate) {
      var defer = $q.defer();
      var tagList = [];
      selectedTags.forEach(function(tag) {
        tagList.push(tag.id);
      });

      var query = {
        tagNames: tagList,
        from: new Date(startDate).getTime(),
        to: new Date(endDate).getTime()
      };
      httpService.post(api + '/assetmgmt-api/report/v1.0/datapoints', query, true).then(function(res) {
        var seriesOptions = [];
        var tableContent = [];
        var tableHeaders = [];
        var counter = 0;


        for(let tag in res){
          var valueArray = []
          for(let datapoint of res[tag]){
            valueArray.push([datapoint.timestamp,datapoint.value])
          }
          seriesOptions.push({
            name: tag,
            data: valueArray
          });

          tableHeaders.push(tag.replace(/_/g, ' '));
          tableHeaders.push('Timestamp');
          valueArray.map(function(arrElements) {
            if (tableContent[counter] == undefined) {
              tableContent[counter] = [];
            }
            tableContent[counter].push(arrElements[1]);
            tableContent[counter].push(
              $filter('date')(arrElements[0], 'yyyy-MM-dd HH:mm')
            );
            counter++;
          });
          counter = 0;
        }
        defer.resolve({
          seriesOptions: seriesOptions,
          tableContent: tableContent,
          tableHeaders: tableHeaders
        });
      });
      return defer.promise;
    };
    /**
     * @function displayDataOnChart
     * @desc plot data on the chart
     * @param {Object} seriesOptions
     */
    var displayDataOnChart = function(seriesOptions) {
      Highcharts.stockChart('reportChart', {
        rangeSelector: {
          selected: 4
        },
        yAxis: {
          labels: {
            formatter: function() {
              return (this.value > 0 ? ' + ' : '') + this.value;
            }
          },
          plotLines: [
            {
              value: 0,
              width: 2,
              color: 'silver'
            }
          ]
        },
        plotOptions: {
          series: {
            compare: 'values',
            showInNavigator: true
          }
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
          valueDecimals: 2,
          split: true
        },
        series: seriesOptions
      });
    };
    return {
      getListOptions: getListOptions,
      getTags: getTags,
      getTagsByAssets: getTagsByAssets,
      getDataForTags: getDataForTags,
      displayDataOnChart: displayDataOnChart,
      setTags: setTags
    };
  }
})();
