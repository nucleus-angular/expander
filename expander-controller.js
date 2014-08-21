angular.module('nag.expander')
.controller('NagExpanderDCtrl', [
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
    this.show = this.expand;
  }
]);
