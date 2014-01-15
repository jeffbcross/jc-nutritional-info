angular.module('jcNutritionalInfo', []).
  directive('jcNutritionalInfo', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      template: '<div><div ng-if="!nutritionData || !nutritionData.length">Loading nutritional information</div><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr ng-repeat="group in nutritionData"><td><div class="nutrition-heading"style="display:block; background:#000;color:#fff;font-size:18px; line-height:24px;height:30px; padding:3px 6px;"><strong ng-bind="group.name"></strong><strong class="pull-right" ng-bind="group.total"></strong></div><table class="table" ng-if="group.children"><tbody><tr ng-repeat="child in group.children"><td><strong ng-bind="child.name"></strong><strong class="pull-right" ng-bind="child.total"></strong></td></tr></tbody></table></td></tr></tbody></table></div>',
      scope: {
        nutritionData: "="
      }
    };
  }]);
