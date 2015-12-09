'use strict';

/**
 * @ngdoc service
 * @name loggrioApp.notify
 * @description
 * # notify
 * Service in the loggrioApp.
 */
angular.module('loggrioApp')
  .service('notify', function ($mdToast) {

    var self = this;

    var toggled = false;

    function restoreDiconnectToast() {
      if (toggled) {
        self.toastDisconnected();
      }
    }

    this.showToast = function (text, icon, hidedelay) {
      hidedelay = (typeof hidedelay === 'undefined') ? 3000 : hidedelay;
      $mdToast.show({
        template: '<md-toast style="position: fixed">' +
          ' <md-icon style="color: white">' + icon + '</md-icon>' +
          ' <span flex>  ' + text + '</span>' +
          '</md-toast>',
        position: 'bottom left',
        hideDelay: hidedelay,
      }).finally(restoreDiconnectToast);
    };

    this.toastReconnected = function () {
      self.showToast('Verbindung zur Messeinheit wiederhergestellt', 'check');
      toggled = false;
    };

    this.toastDisconnected = function () {
      self.showToast('Verbindung zur Messeinheit unterbrochen', 'flash_on', 0);
      toggled = true;
    };
  });
