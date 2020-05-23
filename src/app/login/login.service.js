/**
 * Login Service
 * @class loginService
 */
(function() {
  'use strict';
  angular.module('incosa').factory('loginService', ['$http', loginService]);
  /**
   * @function loginService
   * @desc Login Service
   * @param {Object} $http
   * @returns {Object}
   */
  function loginService($http) {
    var api =
      'http://incosa-monitoring.tk:8081/token';
      //'http://localhost:8081/token';
    var headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    /**
     * @function urlEncode
     * @desc endode the url
     * @param {Object[]} data
     * @returns {string}
     */
    var urlEncode = function(data) {
      var pairs = [];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          if (typeof data[key] === 'undefined') continue;
          pairs.push(
            encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
          );
        }
      }
      return pairs.join('&');
    };
    /**
     * @function setToken
     * @desc Set access token
     */
    var setToken = function() {
      // var clientData = {
      //   client_id: 'admin-cli',
      //   grant_type: 'password'
      // };
      //
      // $http({
      //   url: api,
      //   method: "POST",
      //   headers: headers,
      //   transformRequest: function(obj) {
      //   var str = [];
      //   for(var p in obj)
      //   str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      //   return str.join("&");
      //   },
      //   data: userdata
      //   }).then(function(response) {
      //     sessionStorage.setItem('token', response.data.access_token);
      //   });
    };
    /**
     * @function validateUser
     * @desc Authentic user
     * @param {String} username
     * @param {String} password
     * @returns {Object[]}
     */
    var validateUser = function(name, password) {
      sessionStorage.setItem('username', name);
      var userdata = {
        grant_type: 'password',
        username: name,
        password: password
      };
      //debugger;
      return $http({
        url: api,
        method: "POST",
        headers: headers,
        transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
        },
        data: userdata
    })
      //return $http.post(api , { headers: headers, data: userdata });
    };

    var createUser = function(token, userDetails) {
      return $http({
        url: "http://incosa-monitoring.tk:8083/auth/admin/realms/incosa/users",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "bearer " + token
        },
        data: userDetails
      })
    }

    var getAdminToken = function() {
      //sessionStorage.setItem('username', name);
      var userdata = {
        grant_type: "password",
        username: "incosa-admin",
        password: "incosa@123",
        client_id: "admin-cli"
      };

      return $http({
          url: api,
          method: "POST",
          headers: headers,
          transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
          },
          data: userdata
      })
    };

    /**
     * @function handleError
     * @desc Handle the network error
     * @param {Object} error
     * @returns {String}
     */
    var handleError = function(error) {
      if (error.status === 401) {
        return 'Invalid username or password.';
      }
      debugger;
      if(error.data && error.data.error){
        return error.data.error + ':' + error.data.error_description;
      } else {
        return error.xhrStatus + " : same email id already exists";
      }

    };
    return {
      setToken: setToken,
      urlEncode: urlEncode,
      validateUser: validateUser,
      handleError: handleError,
      getAdminToken: getAdminToken,
      createUser: createUser
    };
  }
})();
