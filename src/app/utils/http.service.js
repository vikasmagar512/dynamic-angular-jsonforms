/**
 * Http Service
 * @class httpService
 */
(function() {
  'use strict';
  angular.module('incosa').factory('httpService', ['$q', '$http', httpService]);

  function httpService($q, $http) {
    var headersWithPredix = {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      //'predix-zone-id': 'efff9b19-1bad-416f-ab3a-1682a3b4cb6b',
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    var headers = {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      'content-type': 'application/json'
    };
    /**
     * @function get
     * @desc http get request.
     * @returns {Promise}
     */
    var get = function(url, predix) {
      var defer = $q.defer();
      var cancel = function(reason) {
        defer.resolve(reason);
      };
      var promise = $http({
        method: 'GET',
        url: url,
        headers: predix ? headersWithPredix : headers,
        timeout: defer.promise
      }).then(function(resp) {
        var data = [];
        if (resp.status == 200 && resp.data) {
          data = resp.data;
        }
        return data;
        // defer.resolve(data);
      });
      // return defer.promise;
      return { promise: promise, cancel: cancel };
    };
    /**
     * @function post
     * @desc http post request.
     * @returns {Promise}
     */
    var post = function(url, query, predix) {
      var defer = $q.defer();
      $http({
        method: 'POST',
        url: url,
        data: JSON.stringify(query),
        headers: predix ? headersWithPredix : headers
      }).then(function(resp) {
        var data = [];
        if (resp.status == 200 && resp.data) {
          data = resp.data;
        }
        defer.resolve(data);
      });
      return defer.promise;
    };
        /**
     * @function post
     * @desc http post request.
     * @returns {Promise}
     */
    var put = function(url, query, predix) {
      var defer = $q.defer();
      $http({
        method: 'PUT',
        url: url,
        data: JSON.stringify(query),
        headers: predix ? headersWithPredix : headers
      }).then(function(resp) {
        var data = [];
        if (resp.status == 200 && resp.data) {
          data = resp.data;
        }
        defer.resolve(data);
      });
      return defer.promise;
    };

    return {
      get: get,
      post: post,
      put:put
    };
  }
})();
