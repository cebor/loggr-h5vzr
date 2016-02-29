'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:PhotogalleryCtrl
 * @description
 * # PhotogalleryCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('PhotogalleryCtrl', function ($rootScope, $mdDialog, $http, notify, Container) {

    if (!Customer.isAuthenticated()) {
      $location.path('/login');
    } else {
      $rootScope.header = 'Photogallery';
      $rootScope.user = Customer.getCurrent();
    }

    var photo = this;
    photo.photogallery = [];

    /*
     * retrieve photos from server and populates photogallery-array
     */
     var loadShots = function () {
      photo.photogallery = [];
       Container.getContainers().$promise.then(function (data) {
         data.reverse();
         angular.forEach(data, function (container) {
           var name = container.name;
           var date = container.mtime;
           var pics = [];
           Container.getFiles({container:name}).$promise
            .then(function (data) {
                var imgUrl = 'http://localhost:3000/api/containers/' +
                              name + '/download/';

                angular.forEach(data, function (imgObj) {
                  pics.push({
                    thumb: imgUrl + imgObj.name,
                    img: imgUrl + imgObj.name});
                });
                photo.photogallery.push({
                  name: name,
                  date: date,
                  images: pics,
                  downloaded: true,
                  coverflow: {}
                });
              });
         });
       });
     };

     loadShots();

    /*
     * checks if photos from chosen shot have already been downloaded,
     * if yes deletes them immediately, if not asks user for further assistance
     */
    this.deleteShots = function (containerName, ev) {
      // find chosen shot by timestamp
      angular.forEach(photo.photogallery, function (entry) {
        // already downloaded, delete now
        if(entry.name === containerName && entry.downloaded) {
          erasePhotosFromDB(containerName);
        } else if (entry.name === containerName && !entry.downloaded) {
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
          ).then(function () {
            // delete them
            erasePhotosFromDB(containerName);
          }, function () {
            // keep photos, do nothing
          });
        }
      });
    };

    /*
     * Retrieves all photos from chosen shot, zip archives and downloads them
     */
    this.downloadShots = function (name) {
      //TODO download photos from server as zip archive
      //TODO mark them as downloaded
      console.log(name);
    };

    /*
     * Sends request to server to delete photos from DB persisently
     */
    var erasePhotosFromDB = function (name) {
      Container.destroyContainer({container: name}).$promise.then(
        function () {
          //onSuccess
          notify.showToast('Photos deleted sucessfully', 'check');
        },function () {
          //onFail
          notify.showToast('Encountered error while deleting photos', 'flash_on');
        }).then(function () {
          loadShots();
        });
    };
  });
