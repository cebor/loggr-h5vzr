'use strict';

/**
 * @ngdoc directive
 * @name loggrioApp.directive:scroll
 * @description
 * # scroll
 */
angular.module('loggrioApp')
.directive('scroll', function ($window, $animate) {

    return function(scope, element) {

      /* header DOM element with md-page-header attribute */
      var header = angular.element('[scroll-header]');
      var headerDimensions;

      var logo = angular.element('[scroll-logo]');
      var logoHeight;
      var heightToShrink;

      var title = angular.element('[scroll-title]');

      /* The height of a toolbar by default in Angular Material */
      var defaultToolbarHeight = 64;
      /* The primary color palette used by Angular Material */
      var toolbarColor = [0,150,136];

      function initialize() {
        headerDimensions = header[0].getBoundingClientRect();
        logo.addClass('an-logo-size');
        title.addClass('an-title-size');
        logoHeight = logo[0].clientHeight;
        console.log(logoHeight);
        heightToShrink = logoHeight * 1.3;
      }

      function handleStyle(dim) {
        var tmpHeight = dim.bottom - headerDimensions.top;

        /* toolbar height */
        if ((tmpHeight) > defaultToolbarHeight) {
          element.css('height', (tmpHeight)+'px');
        } else {
          element.css('height', defaultToolbarHeight +'px');
        }

        /* transparancy */
        element.css('background-color','rgba('+toolbarColor[0]+','+toolbarColor[1]+','+toolbarColor[2]+','+(1-ratio(dim))+')');
        /* shadow */
        element.css('box-shadow', '0 '+(dim.height*3/4)+'px '+(dim.height/2)+'px -'+(dim.height/2)+'px rgba(0,0,0,'+ratio(dim)/2+') inset');

        /* shrink logo */
        if (tmpHeight <= heightToShrink && logo.hasClass('an-logo-size')) {
          $animate.removeClass(logo, 'an-logo-size');
          $animate.removeClass(title, 'an-title-size');
        }
        if (tmpHeight > heightToShrink && !logo.hasClass('an-logo-size')) {
          $animate.addClass(logo, 'an-logo-size');
          $animate.addClass(title, 'an-title-size');
        }

      }

      function ratio(dim) {
        var r = (dim.bottom-headerDimensions.top)/dim.height;

        if(r < 0) {
          return 0;
        }
        if(r > 1) {
          return 1;
        }

        return Number(r.toFixed(2));
        // return Number(r.toString().match(/^\d+(?:\.\d{0,2})?/));
      }

      initialize();
      handleStyle(headerDimensions);

      /* Scroll event listener */
      angular.element($window).bind('scroll', function() {
        var tmpHeaderDim = header[0].getBoundingClientRect();
        handleStyle(tmpHeaderDim);
        scope.$apply();
      });

      /* Resize event listener */
      angular.element($window).bind('resize',function () {
        headerDimensions = header[0].getBoundingClientRect();
        handleStyle(headerDimensions);
        scope.$apply();
      });

    };

});
