angular.module('nag.expander', [])
.directive('nagExpander', [
  '$timeout',
  function($timeout){
    return {
      restrict: 'A',
      priority: 1000,
      controller: [
          '$scope',
          function($scope) {
            $scope.contentVisible = false;

            this.expand = function() {
              $scope.contentVisible = true;
            }

            this.collapse = function() {
              $scope.contentVisible = false;
            }

            this.toggle = function() {
              $scope.contentVisible = !$scope.contentVisible;
            }

            Object.defineProperty(this, 'contentVisible', {
                get: function() {
                    return $scope.contentVisible;
                },
                set: function(value) {
                    $scope.contentVisible = value;
                }
            })
          }
      ],
      compile: function(element, attributes, transclude) {
        $(element).addClass('nag-expander');

        $(element).find('.handle').attr('ng-click', 'contentVisible = !contentVisible');
        $(element).find('.content').attr('ng-show', 'contentVisible');

        return function(scope, element, attributes) {
          scope.contentVisible = false;

          //$timeout used in case the data attribute is added dynamically (like with the nucleus angular attribute directive
          $timeout(function(){scope.contentVisible = $(element).data('default-expand')}, 0);
        }
      }
    };
  }
]);
