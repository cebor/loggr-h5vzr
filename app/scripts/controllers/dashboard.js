'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('DashboardCtrl', function ($rootScope) {
    $rootScope.header = 'Dashboard';
  });
