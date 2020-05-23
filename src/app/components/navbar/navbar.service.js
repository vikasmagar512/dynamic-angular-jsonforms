/**
 * Navbar Service
 * @class navbarService
 */
(function() {
  'use strict';
  angular
    .module('incosa')
    .factory('navbarService', ['$document', navbarService]);

  function navbarService($document) {
    var flushSessionData = function(items) {
      items.map(function(item) {
        sessionStorage.removeItem(item);
      });
      sessionStorage.clear();
    };

    var flushLocalData = function(items) {
      items.map(function(item) {
        localStorage.removeItem(item);
      });
    };

    /**
     * @function flushData
     * @desc Clears temp data on user log out
     * @param {Array} sessionItems
     * @param {Array} localItems
     */
    var flushData = function(sessionItems, localItems) {
      flushSessionData(sessionItems);
      flushLocalData(localItems);
    };

    /**
     * @function clearContainer
     * @desc Clears container in case sidenav toggled
     */
    var clearContainer = function() {
      var main = $document[0].getElementById('incosa-container');
      var mainClass = 'incosa-container--full-screen';
      main.classList.remove(mainClass);
    };

    return {
      clearContainer: clearContainer,
      flushData: flushData
    };
  }
})();
