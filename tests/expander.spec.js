describe('Expander', function(){
  var $compile, $scope;

  beforeEach(module('nag.expander'));

  beforeEach(inject(function($injector) {
    $scope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');

    $scope.expanderOptions = {};
  }));

  var setupElement = function(scope) {
    var element = $compile('<div nag-expander="expanderOptions">' +
    '<div class="handle">Click on me for expanded view</div>' +
    '<div class="content">' +
      '<ul>' +
        '<li>I</li>' +
        '<li>Am</li>' +
        '<li>The</li>' +
        '<li>Expanded</li>' +
        '<li>View</li>' +
      '</ul>' +
    '</div>' +
    '</div>')(scope);
    scope.$digest();
    return element;
  }

  it('should have proper initial structure', function() {
    var element = setupElement($scope);

    expect(element.find('.content').attr('style').trim()).toEqual('display: none;');
  });

  it('should show data when handle is clicked', function() {
    var element = setupElement($scope);

    element.find('.handle').trigger('click');

    expect(element.find('.content').attr('style')).toEqual('');
  });
});
