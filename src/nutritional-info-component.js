angular.module('jcNutritionalInfo', []).
  directive('jcNutritionalInfo', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      templateUrl: 'nutritional-info-component.html',
      scope: {
        nutritionData: "="
      }
    };
  }]);
