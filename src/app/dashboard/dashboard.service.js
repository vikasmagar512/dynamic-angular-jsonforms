/**
 * Dashboard Service
 * @class dashboardService
 */
(function() {
  'use strict';
  angular
    .module('incosa')
    .factory('dashboardService', ['httpService', dashboardService]);
  /**
   * @function dashboardService
   * @desc Dashboard Service
   * @param {func} httpService
   * @returns {Object}
   */
  function dashboardService(httpService) {
    var url = 'http://incosa-monitoring.tk:8081/';
    //var url = 'http://localhost:8081/';

    /**
     * @function getSensorList
     * @desc List of sensors from API.
     * @returns {Object[]}
     */
    var getSensorList = function() {
      return httpService.get(url + 'assetmgmt-api/asset/v1.0', true);
    };
    /**
     * @function setSensorList
     * @desc List of sensors from API.
     * @param {Object[]} sensors
     */
    var setSensorList = function(sensors) {
      localStorage.setItem('assetList', JSON.stringify(sensors));
    };
    return {
      getSensorList: getSensorList,
      setSensorList: setSensorList
    };
  }
})();
