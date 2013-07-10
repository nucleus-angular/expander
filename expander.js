angular.module('nag.expander', [])
.directive('nagExpander', [
  '$timeout',
  '$rootScope',
  function($timeout, $rootScope){
    return {
      restrict: 'A',
      priority: 1000,
      scope: {
        model: '=?',
        handleSelector: '@?',
        contentSelector: '@?',
        style: '@?'
      },
      controller: [
        '$scope',
        function($scope) {
          $scope.contentVisible = false;

          this.expand = function() {
            $scope.contentVisible = true;
          };

          this.collapse = function() {
            $scope.contentVisible = false;
          };

          this.toggle = function() {
            $scope.contentVisible = !$scope.contentVisible;
          };

          Object.defineProperty(this, 'contentVisible', {
            get: function() {
              return $scope.contentVisible;
            },
            set: function(value) {
              $scope.contentVisible = value;
            }
          });

          //for compatibility with the single panel directive
          this.hide = this.collapse;
        }
      ],
      compile: function(element, attributes, transclude) {
        element.addClass('expander');

        var handleSelector = attributes.handleSelector || '> .handle';
        var contentSelector = attributes.contentSelector || '> .content';

        element.find(handleSelector).attr('ng-click', 'contentVisible = !contentVisible');
        element.find(handleSelector).attr('ng-class', "{'is-active': contentVisible}");
        element.find(contentSelector).attr('ng-class', "{'is-active': contentVisible}");

        if(attributes.animate !== 'true') {
          element.find(contentSelector).attr('ng-show', 'contentVisible');
        }

        return function(scope, element, attributes) {
          if(attributes.style) {
            element.addClass(attributes.style);

            if(attributes.style === 'button-drop-down') {
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

          if(attributes.broadcast) {
            scope.$watch('contentVisible', function(newValue, oldValue) {
              $rootScope.$broadcast('expander-' + attributes.broadcast + '::state-change', newValue);
            });
          }

          scope.contentVisible = false;

          //$timeout used in case the data attribute is added dynamically (like with the nucleus angular attribute directive
          $timeout(function(){scope.contentVisible = $(element).data('default-expand')}, 0);
        }
      }
    };
  }
]);
