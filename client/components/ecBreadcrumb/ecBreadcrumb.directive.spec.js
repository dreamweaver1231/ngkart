'use strict';

describe('Directive: ecBreadcrumb', function () {

  // load the directive's module and view
  beforeEach(module('ngKartApp'));
  beforeEach(module('components/ecBreadcrumb/ecBreadcrumb.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ec-breadcrumb></ec-breadcrumb>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ecBreadcrumb directive');
  }));
});