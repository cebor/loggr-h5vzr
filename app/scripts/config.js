'use strict';

/**
 * Config of the application.
 */
angular
  .module('loggrioApp')
    .constant('API', 'http://localhost:3000/api')
    .constant('POLLING_INTERVAL', 10000)
    .constant('STREAM_URL','http://141.60.124.117:8080/?action=stream');
