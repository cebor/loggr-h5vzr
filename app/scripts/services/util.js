'use strict';

/**
 * @ngdoc service
 * @name loggrioApp.util
 * @description
 * # util
 * Service in the loggrioApp.
 */
angular.module('loggrioApp')
  .service('util', function () {

    function getWeekDay(weekDay) {
      switch (weekDay) {
          case 0:
            return 'Sonntag';
          case 1:
            return 'Montag';
          case 2:
            return 'Dienstag';
          case 3:
            return 'Mittwoch';
          case 4:
            return 'Donnerstag';
          case 5:
            return 'Freitag';
          case 6:
            return 'Samstag';
          default:
            return 'Falscher Tag';
      }
    }

    function round(value) {
      return Math.round(value * 100) / 100;
    }

    this.setAverageExtremes = function (chart) {
      var dataMin = chart.series[0].dataMin;
      var dataMax = chart.series[0].dataMax;
      var extremes = {
        min: dataMin - 0.1 * dataMax,
        max: dataMax + 0.01 * dataMax
      };
      chart.yAxis[0].setExtremes(extremes.min, extremes.max, true);
    };

    this.meteringToChartData = function (meterings) {
      var data = {
        default: [],
        averageWeek: {
          values: [],
          categories: []
        }
      };

      // get date from last metering
      var oneWeekAgo = new Date(meterings[meterings.length - 1].time);
      // eleminate time to 00:00:00 (remove actual day)
      oneWeekAgo.setHours(0,0,0,0);
      // get back additianl 6 days to get correct week cycle
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
      // get time as timestamp
      oneWeekAgo = oneWeekAgo.getTime();

      var counter = 0;

      angular.forEach(meterings, function (metering) {
        var date = Date.parse(metering.time);
        var value = metering.value;

        // push data to default chart
        data.default.push([date, value]);

        // sum values of the same day in the last week
        if (date >= oneWeekAgo) {
          var day = new Date(date).getDay();
          var length = data.averageWeek.categories.length;

          // if day is not already in -> create and add first value
          if (data.averageWeek.categories[length - 1] !== getWeekDay(day)) {
            counter = 0;
            data.averageWeek.categories.push(getWeekDay(day));
            data.averageWeek.values.push(value);
          // else sum up average
          } else {
            counter++;
            var lastValue = data.averageWeek.values[length - 1];
            data.averageWeek.values[length - 1] = round((lastValue * counter + value) / (counter + 1));
          }
        }
      });

      return data;
    };

    this.sensorIsInUse = function (sensor) {
      var position = -1; // not in Use
      var viewConfig = JSON.parse(localStorage.getItem('viewConfig'));
      if (viewConfig) {
        angular.forEach(viewConfig.sensorsInUse, function (sensorInUse, index) {
          if (sensor.id === sensorInUse.id) {
            position = index;
          }
        });
      // viewConfig non existing
      } else {
        position = -2;
      }
      return position;
    };

    this.isDisconnected = function (lastTime) {
      // TODO: move to config file
      var DELAY = 120000;
      var nowTime = Date.now();

      return (nowTime - Date.parse(lastTime)) > DELAY;
    };

  });
