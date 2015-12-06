'use strict';

/**
 * @ngdoc directive
 * @name loggrioApp.directive:scroll
 * @description
 * # scroll
 */
angular.module('loggrioApp')
.directive('scroll', function ($window, $animate) {

    return function(scope, element, attrs) {

      /* header DOM element with md-page-header attribute */
      var header;
      var headerRect;
      
      var picture;
      
      var logo;
      var logoRect;
      var heightToShrink;

      var title;

      /* The height of a toolbar by default in Angular Material */
      var defaultToolbarHeight = 64;
      /* The primary color palette used by Angular Material */
      var toolbarColor = [0,150,136];

      function initialize() {
        element.wrap( "<div scroll-header></div>" );
        element.before( "<div scroll-picture></div>" );
        
        header = angular.element('[scroll-header]');
        headerRect = header[0].getBoundingClientRect();
        
        picture = angular.element('[scroll-picture]');
        picture.css('background-image', 'url(' + attrs.imgUrl +')');
        
        logo = angular.element('.' + attrs.logoClass);
        logo.addClass('logo-size');
        logoRect = logo[0].getBoundingClientRect();
        heightToShrink = logoRect.bottom + logoRect.top;
        
        title = angular.element('.' + attrs.titleClass);
        title.addClass('title-size');        
      }

      function update(Rect) {
        var tmpHeight = Rect.bottom - headerRect.top;

        /* toolbar height */
        if ((tmpHeight) > defaultToolbarHeight) {
          element.css('height', (tmpHeight)+'px');
        } else {
          element.css('height', defaultToolbarHeight +'px');
        }

        /* transparancy */
        element.css('background-color','rgba('+toolbarColor[0]+','+toolbarColor[1]+','+toolbarColor[2]+','+(1-ratio(Rect))+')');
        /* shadow */
        element.css('box-shadow', '0 '+(Rect.height*3/4)+'px '+(Rect.height/2)+'px -'+(Rect.height/2)+'px rgba(0,0,0,'+ratio(Rect)/2+') inset');

        /* shrink logo */
        if (tmpHeight <= heightToShrink && logo.hasClass('logo-size')) {
          $animate.removeClass(logo, 'logo-size');
          $animate.removeClass(title, 'title-size');
        }
        if (tmpHeight > heightToShrink && !logo.hasClass('logo-size')) {
          $animate.addClass(logo, 'logo-size');
          $animate.addClass(title, 'title-size');
        }

      }

      function ratio(rect) {
        var ret = (rect.bottom-headerRect.top)/rect.height;

        if(ret < 0) {
          return 0;
        }
        if(ret > 1) {
          return 1;
        }

        return Number(ret.toFixed(2));
      }

      initialize();
      update(headerRect);

      /* Scroll event listener */
      angular.element($window).bind('scroll', function() {
        var tmpHeaderRect = header[0].getBoundingClientRect();
        update(tmpHeaderRect);
        scope.$apply();
      });

      /* Resize event listener */
      angular.element($window).bind('resize',function () {
        headerRect = header[0].getBoundingClientRect();
        update(headerRect);
        scope.$apply();
      });

    };

});
