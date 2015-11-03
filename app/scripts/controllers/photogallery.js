'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:PhotogalleryCtrl
 * @description
 * # PhotogalleryCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('PhotogalleryCtrl', function ($rootScope) {
    $rootScope.header = 'Photogallery';

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
