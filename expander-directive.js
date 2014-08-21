/**
 * # Expander
 *
 * The expander directive allows you to create content that can show and handle when clicking on a handle.
 *
 * By defualt you need to provide an element with the class of handle and class of content:
 *
 * ```html
 * <div nag-exapnder>
 *   <div class="handle">handle</div>
 *   <div class="content">content</div>
 * </div>
 * ```
 *
 * The element with the class of handle will have the mouseup event attached to it which will toggle the display of the element with content.
 *
 * If for whatever reason you can use handle/content classes, you can use whatever css valid selector you want and give that to the nag-expander element and handle-selector and content-selector html attributes.  The selectors will be performs with the main element as the root element so the selector should be relative to the nag-expander element:
 *
 * ```html
 * <div nag-exapnder handle-selector="> div:nth-child(1)" content-selector="> div:nth-child(2)">
 *   <div>handle</div>
 *   <div>content</div>
 * </div>
 * ```
 *
 * @module nag.expander
 * @ngdirective nagExpander
 *
 * @nghtmlattribute {null} nag-expander Just indicates this element is an expander
 * @nghtmlattribute {string} [handle-selector="> .handle"] CSS selector to use to get handle element (relative to this element)
 * @nghtmlattribute {string} [content-selector="> .content"] CSS selector to use to get content element (relative to this element)
 * @nghtmlattribute {string} [style] A stype to use for the expander supports:
 *
 * - button-drop-down
 */
angular.module('nag.expander')
.directive('nagExpander', [
  '$timeout',
  '$rootScope',
  'nagHelper',
  function($timeout, $rootScope, nagHelper){
    return {
      restrict: 'A',
      priority: 398,
      template: nagHelper.template,
      scope: true,
      compile: function(element, attributes, transclude) {
        element.addClass('expander');

        var handleSelector = attributes.handleSelector || '> .handle';
        var contentSelector = attributes.contentSelector || '> .content';

        element.find(handleSelector).attr('ng-mouseup', 'contentVisible = !contentVisible');

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
                'square',
                'not-positioned'
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

          scope.$watch('contentVisible', function(newValue) {
            if(newValue === true) {
              element.addClass('is-active');
            } else {
              element.removeClass('is-active');
            }
          })
        }
      }
    };
  }
]);
