'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:SensorsCtrl
 * @description
 * # SensorsCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('SensorsCtrl', function ($rootScope, $location, Customer, chartHandler, chartMenu, zoom) {
    $rootScope.header = 'Sensors';
    // THIS FIX IS DEDICATED TO MARKO G.
    if (!Customer.isAuthenticated()) {
      $location.path('/login');
    } else {
      $rootScope.user = Customer.getCurrent();
      chartHandler.goLive();
    }

    var self = this;

    this.charts = chartHandler.charts;
    this.ranges = zoom.ranges;

    this.zoomNavigation = zoom.getZoomNavigation(this.charts);
    this.contextMenu = chartMenu.contextMenu(this.charts);

    this.toggleChartView = function (chartIndex) {
      self.charts[chartIndex].viewToggle();
    };
  });
