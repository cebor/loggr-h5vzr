'use strict';

/**
 * @ngdoc overview
 * @name loggrioApp
 * @description
 * # loggrioApp
 *
 * Main module of the application.
 */
angular
  .module('loggrioApp', [
    'ngRoute',
    'ngMessages',
    'lbServices',
    'ngMaterial',
    'highcharts-ng',
    'ng-sortable',
    'jkuri.gallery'
  ])
  .config(function ($routeProvider, $httpProvider, $mdIconProvider, $mdThemingProvider, LoopBackResourceProvider, API) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/sensors.html',
        controller: 'SensorsCtrl',
        controllerAs: 'sensors'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/livestream', {
        templateUrl: 'views/livestream.html',
        controller: 'LivestreamCtrl',
        controllerAs: 'livestream'
      })
      .when('/photogallery', {
        templateUrl: 'views/photogallery.html',
        controller: 'PhotogalleryCtrl',
        controllerAs: 'photo'
      })
      .otherwise({
        redirectTo: '/'
      });

    $mdIconProvider.icon('chart_line', 'images/icons/ic_chartline.svg', 24);

    $mdThemingProvider.theme('default')
      .primaryPalette('teal');

    LoopBackResourceProvider.setUrlBase(API);

    $httpProvider.interceptors.push(function ($q, $location, LoopBackAuth) {
      return {
        responseError: function (rejection) {
          if (rejection.status === 401) {
            //Now clearing the loopback values from client browser for safe logout...
            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
            // prevent redirect to login on failed login
            if ($location.path() !== '/login') {
              $location.nextAfterLogin = $location.path();
            }
            $location.path('/login');
          }
          return $q.reject(rejection);
        }
      };
    });

    Highcharts.setOptions({
      global: {
        timezoneOffset: new Date().getTimezoneOffset()
      },
      lang: {
        contextButtonTitle: 'Graphenoptionen',
        downloadJPEG: 'Graph als JPEG exportieren',
        downloadPDF: 'Graph als PDF exportieren',
        downloadPNG: 'Graph als PNG exportieren',
        downloadSVG: 'Graph als SVG exportieren',
        loading: 'Daten werden geladen...',
        months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        noData: 'Keine Daten zum Anzeigen vorhanden',
        printChart: 'Graph drucken',
        shortMonths: ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
      }
    });

  })
  .run(function ($rootScope, STREAM_URL){
    $rootScope.STREAM_URL = STREAM_URL;
  });
