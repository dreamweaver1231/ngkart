'use strict';

angular.module('ngKartApp')
  .directive('ecBreadcrumb', function () {
    return {
      templateUrl: 'components/ecBreadcrumb/ecBreadcrumb.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });