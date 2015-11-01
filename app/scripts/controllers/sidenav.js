'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:SidenavCtrl
 * @description
 * # SidenavCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('SidenavCtrl', function ($location) {
    this.navigateTo = function (url) {
      $location.path(url);
    };

    this.menu = [
      {
        link: '/dashboard',
        title: 'Dashboard',
        icon: 'dashboard'
      },
      {
        link: '/sensors',
        title: 'Sensors',
        icon: 'poll'
      },
      {
        link: '/live-stream',
        title: 'Live-Stream',
        icon: 'videocam'
      },
      {
        link: '/photo-gallery',
        title: 'Photo-Gallery',
        icon: 'photo library'
      },
    ];
  });
