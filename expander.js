angular.module('nag.expander', [
  'nag.core'
])
.directive('nagExpander', [
  '$timeout',
  'nagDefaults',
  function($timeout, nagDefaults){
    return {
      restrict: 'A',
      priority: 1000,
      scope: {
        options: '=?nagExpander',
        model: '=?'
      },
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
        element.addClass('nag-expander');

        element.find('.handle').attr('ng-click', 'contentVisible = !contentVisible');
        element.find('.handle').attr('ng-class', "{'is-active': contentVisible}");
        element.find('.content').attr('ng-show', 'contentVisible');

        return function(scope, element, attributes) {
          scope.options = nagDefaults.getExpanderOptions(scope.options);

          if(scope.options.style) {
            element.addClass(scope.options.style);

            if(scope.options.style === 'button-drop-down') {

              var copyingClasses = [
                'small',
                'large',
                'largest',
                'split',
                'shadow',
                'border',
                'square'
              ];

              for(var x = 0; x <= copyingClasses.length; x += 1) {
                if(element.find('button').hasClass(copyingClasses[x])) {
                  element.addClass(copyingClasses[x]);
                }
              }
            }
          }

          scope.contentVisible = false;

          //$timeout used in case the data attribute is added dynamically (like with the nucleus angular attribute directive
          $timeout(function(){scope.contentVisible = $(element).data('default-expand')}, 0);
        }
      }
    };
  }
]);
