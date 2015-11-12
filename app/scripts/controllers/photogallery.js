'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:PhotogalleryCtrl
 * @description
 * # PhotogalleryCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('PhotogalleryCtrl', function ($rootScope, $mdDialog, notify) {
    $rootScope.header = 'Photogallery';

    var photo = this;

    photo.photogallery = [{
      date: '2015-10-31T03:13:57+00:00',
      downloaded: true,
      images: [
        {thumb: 'images/photogallery/hallo1.png', img: 'images/photogallery/hallo1.png'},
        {thumb: 'images/photogallery/hallo2.jpg', img: 'images/photogallery/hallo2.jpg'},
        {thumb: 'images/photogallery/hallo3.jpg', img: 'images/photogallery/hallo3.jpg'},
        {thumb: 'images/photogallery/hallo4.jpg', img: 'images/photogallery/hallo4.jpg'}
      ]},{
      date: '2015-11-02T15:50:57+00:00',
      downloaded: false,
      images: [
        {thumb: 'images/photogallery/image1.jpg', img: 'images/photogallery/image1.jpg'},
        {thumb: 'images/photogallery/image2.jpg', img: 'images/photogallery/image2.jpg'},
        {thumb: 'images/photogallery/image3.jpg', img: 'images/photogallery/image3.jpg'},
        {thumb: 'images/photogallery/image4.jpg', img: 'images/photogallery/image4.jpg'}
      ]}
    ];

    /*
     * checks if photos from chosen shot have already been downloaded,
     * if yes deletes them immediately, if not asks user for further assistance
     */
    this.deleteShots = function(timestamp, ev){
      // find chosen shot by timestamp
      angular.forEach(photo.photogallery, function(entry){
        // already downloaded, delete now
        if(entry.date === timestamp && entry.downloaded) {
          erasePhotosFromDB(timestamp);
        } else if (entry.date === timestamp && !entry.downloaded) {
          // modal to ask if rly delete
          $mdDialog.show(
              $mdDialog.confirm()
                .clickOutsideToClose(true)
                .title('Do you really want to delete these photos?')
                .content('These photos have not been downloaded yet.')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Delete anyway')
                .cancel('Keep photos')
          ).then(function() {
            // delete them
            erasePhotosFromDB(timestamp);
          }, function() {
            // keep photos, do nothing
          });
        }
      });
    };

    /*
     * Retrieves all photos from chosen shot, zip archives and downloads them
     */
    this.downloadShots = function(timestamp){
      //TODO download photos from server as zip archive
      //TODO mark them as downloaded
      console.log(timestamp);
    };

    /*
     * Sends request to server to delete photos from DB persisently
     */
    var erasePhotosFromDB = function(timestamp){
      //TODO delete photos from DB
      console.log(timestamp);
      /*
      //onSuccess
      notify.toastPhotoDeleteSucess();
      //onFail
      notify.toastPhotoDeleteFail();
      */
    };
  });
