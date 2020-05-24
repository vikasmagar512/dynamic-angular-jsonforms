/**
 * Config Service
 * @class configService
 */
(function() {
  'use strict';
  angular
    .module('incosa')
    .factory('configService', ['httpService', configService]);
  /**
   * @function configService
   * @desc Config Service
   * @param {func} httpService
   * @returns {Object}
   */
  function configService(httpService) {

    /**
     * @function getSensorList
     * @desc List of sensors from API.
     * @returns {Object[]}
     */
  
    return {
    };
  }
})();
