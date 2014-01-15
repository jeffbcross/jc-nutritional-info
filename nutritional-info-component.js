angular.module('jcNutritionalInfo', []).
  directive('jcNutritionalInfo', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      template: '<div><div ng-if="!nutritionData || !nutritionData.length">Loading nutritional information</div><table><tbody><tr ng-repeat="group in nutritionData"><td><div class="nutrition-heading"><strong ng-bind="group.name"></strong><strong class="pull-right" ng-bind="group.total"></strong><table ng-if="group.children"><tbody><tr ng-repeat="child in group.children"><td><strong ng-bind="child.name"></strong><strong class="pull-right" ng-bind="child.total"></strong></td></tr></tbody></table></td></tr></tbody></table></div>',
      scope: {
        nutritionData: "="
      }
    };
  }]);
