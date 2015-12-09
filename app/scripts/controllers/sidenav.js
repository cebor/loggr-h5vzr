'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:SidenavCtrl
 * @description
 * # SidenavCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('SidenavCtrl', function ($location, $mdSidenav) {
    this.navigateTo = function (menuItem) {
      $mdSidenav('left').close();
      $location.path(menuItem.link);
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
        link: '/livestream',
        title: 'Livestream',
        icon: 'videocam'
      },
      {
        link: '/photogallery',
        title: 'Photogallery',
        icon: 'photo library'
      },
    ];
  });
