'use strict';

/**
 * @ngdoc directive
 * @name loggrioApp.directive:scroll
 * @description
 * # scroll
 */
angular.module('loggrioApp')
.directive('scroll', function ($window) {

    return function(scope, element) {

      /* header DOM element with md-page-header attribute */
      var header = angular.element('[md-page-header]')[0];
      // console.log(header);
      /* Store header dimensions to initialize header styling */
      var baseDimensions = header.getBoundingClientRect();
      /* The height of a toolbar by default in Angular Material */
      var legacyToolbarH = 64;
      /* The primary color palette used by Angular Material */
      var primaryColor = [0,150,136];

      function handleStyle(dim) {
        if ((dim.bottom-baseDimensions.top) > legacyToolbarH) {
          element.css('height', (dim.bottom-baseDimensions.top)+'px');
        } else {
          element.css('height', legacyToolbarH+'px');
        }
        element.css('background-color','rgba('+primaryColor[0]+','+primaryColor[1]+','+primaryColor[2]+','+(1-ratio(dim))+')');
        /* Uncomment the line below if you want shadow inside picture (low performance) <- mimimimi */
        element.css('box-shadow', '0 '+(dim.height*3/4)+'px '+(dim.height/2)+'px -'+(dim.height/2)+'px rgba(0,0,0,'+ratio(dim)/2+') inset');
      }

      function ratio(dim) {
        var r = (dim.bottom-baseDimensions.top)/dim.height;

        if(r < 0) {
          return 0;
        }
        if(r > 1) {
          return 1;
        }

        return Number(r.toFixed(2));
        // return Number(r.toString().match(/^\d+(?:\.\d{0,2})?/));
      }

      handleStyle(baseDimensions);

      /* Scroll event listener */
      angular.element($window).bind('scroll', function() {
        var dimensions = header.getBoundingClientRect();
        handleStyle(dimensions);
        scope.$apply();
      });

      /* Resize event listener */
      angular.element($window).bind('resize',function () {
        baseDimensions = header.getBoundingClientRect();
        var dimensions = header.getBoundingClientRect();
        handleStyle(dimensions);
        scope.$apply();
      });

    };

});
