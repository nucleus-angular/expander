/**
 * Component to allow you to easily hide/show collapsible data
 *
 * @module nag.expander
 * @ngdirective nagExpander
 */
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

          /**
           * Expand the element
           *
           * @ngdirectivecontroller
           * @method expand
           */
          this.expand = function() {
            $scope.contentVisible = true;
          };

          /**
           * Collapse the element
           *
           * @ngdirectivecontroller
           * @method collapse
           */
          this.collapse = function() {
            $scope.contentVisible = false;
          };

          /**
           * Switch the state of the element
           *
           * @ngdirectivecontroller
           * @method toggle
           */
          this.toggle = function() {
            $scope.contentVisible = !$scope.contentVisible;
          };

          /**
           * Whether or not the element's content is visible
           *
           * @ngdirectivecontroller
           * @property contentVisible
           * @type {boolean}
           */
          Object.defineProperty(this, 'contentVisible', {
            get: function() {
              return $scope.contentVisible;
            },
            set: function(value) {
              $scope.contentVisible = value;
            }
          });

          //for compatibility with the single panel directive
          /**
           * Adds compatibility with the single panel directive by alias .hide() to .collapse
           *
           * @ngdirectivecontroller
           * @method hide
           */
          this.hide = this.collapse;
        }
      ],
      compile: function(element, attributes, transclude) {
        element.addClass('expander');

        var handleSelector = attributes.handleSelector || '> .handle';
        var contentSelector = attributes.contentSelector || '> .content';

        element.find(handleSelector).attr('ng-mouseup', 'contentVisible = !contentVisible');
        element.find(handleSelector).attr('ng-class', "{'is-active': contentVisible}");
        element.find(contentSelector).attr('ng-class', "{'is-active': contentVisible}");

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

          /**
           * Event triggered when the visibility changes, uses the value of the data-broadcast HTML attribute to generate the event string
           *
           * @event expander-[data-broadcast]::state-change
           * @eventlevel root
           */
          if(attributes.broadcast) {
            scope.$watch('contentVisible', function(newValue, oldValue) {
              $rootScope.$broadcast('expander-' + attributes.broadcast + '::state-change', newValue);
            });
          }

          /**
           * Whether or not the element's content is visible
           *
           * @ngscope
           * @property contentVisible
           * @type {boolean}
           */
          scope.contentVisible = false;

          //$timeout used in case the data attribute is added dynamically (like with the nucleus angular attribute directive
          $timeout(function(){scope.contentVisible = $(element).data('default-expand')}, 0);
        }
      }
    };
  }
]);
