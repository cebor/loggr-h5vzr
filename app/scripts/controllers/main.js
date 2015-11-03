'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('MainCtrl', function ($rootScope, $location, Customer, chartHandler, chartMenu, zoom) {

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

    this.photogallery = [{
      date: '2015-10-31T03:13:57+00:00',
      images: [
        {thumb: 'images/photogallery/hallo1.png', img: 'images/photogallery/hallo1.png'},
        {thumb: 'images/photogallery/hallo2.jpg', img: 'images/photogallery/hallo2.jpg'},
        {thumb: 'images/photogallery/hallo3.jpg', img: 'images/photogallery/hallo3.jpg'},
        {thumb: 'images/photogallery/hallo4.jpg', img: 'images/photogallery/hallo4.jpg'}
      ]},{
      date: '2015-11-02T15:50:57+00:00',
      images: [
        {thumb: 'images/photogallery/image1.jpg', img: 'images/photogallery/image1.jpg'},
        {thumb: 'images/photogallery/image2.jpg', img: 'images/photogallery/image2.jpg'},
        {thumb: 'images/photogallery/image3.jpg', img: 'images/photogallery/image3.jpg'},
        {thumb: 'images/photogallery/image4.jpg', img: 'images/photogallery/image4.jpg'}
      ]}
  ];

  });
