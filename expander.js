angular.module('nag.expander', [])
.directive('nagExpander', [
  '$timeout',
  function($timeout){
    return {
      restrict: 'A',
      compile: function(element, attributes, transclude) {
        $(element).addClass('nag-expander');

        $(element).find('.handle').attr('ng-click', 'contentVisible = !contentVisible');
        $(element).find('.content').attr('ng-show', 'contentVisible');

        return function(scope, element, attributes) {
          scope.contentVisible = false;

          //$timeout used in case the data attribute it added dynamically (like with the nucleus angular attribute directive
          $timeout(function(){scope.contentVisible = $(element).data('default-expand')}, 0);
        }
      }
    };
  }
]);
