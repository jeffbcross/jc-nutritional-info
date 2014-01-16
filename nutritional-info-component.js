angular.module('jcNutritionalInfo', []).
  filter('stripUnit', function () {
    return function (val) {
      var match = /[a-z]+/.exec(val);
      var unit = match && match[0] ? match[0] : '';
      number = parseInt(val.replace(unit, ''), 10);
      if (typeof number !== 'number') throw new Error('Value must contain a value');

      return [number, unit];
    }
  }).
  filter('foodsToNutrition', ['$filter', function ($filter) {
    return function (foods) {
      var nutritionMap = {}; //{name: total, name: total}
      var nutrition = [{
        name: 'Carbohydrates',
        total: '',
        children: [{
          name: 'Dietary Fiber',
          total: ''
        },{
          name: 'Sugars',
          total: ''
        }]
      },{
        name: 'Cholesterol',
        total: '',
        children: []
      },{
        name: 'Sodium',
        total: '',
        children: []
      },{
        name: 'Protein',
        total: '',
        children: []
      }];

      var stripUnit = $filter('stripUnit');
      foods.forEach(function (nutrition) {
        angular.forEach(nutrition, function (val, key) {
          var separatedVal;

          if (nutritionMap[key]) {
            separatedVal = $filter('stripUnit')(val);
            nutritionMap[key] =
              (stripUnit(nutritionMap[key])[0] + separatedVal[0]).toString() +
              separatedVal[1];
          }
          else {
            nutritionMap[key] = val;
          }
        });
      });

      angular.forEach(nutritionMap, function (val, key) {
        switch (key) {
          case 'cholesterol':
            nutrition[1].total = val;
            break;
          case 'sodium':
            nutrition[2].total = val;
            break;
          case 'carbohydrate':
            nutrition[0].total = val;
            break;
          case 'dietaryFiber':
            nutrition[0].children[0].total = val;
            break;
          case 'sugars':
            nutrition[0].children[1].total = val;
            break;
          case 'protein':
            nutrition[3].total = val;
            break;
          default:
            //ignore

        }
      })



      return nutrition;
    }
  }]).
  directive('jcNutritionalInfo', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      template: '<div><style>jc-nutritional-info table thead th, jc-nutritional-info table tbody tr td{font-family: Helvetica, Arial, sans-serif;}jc-nutritional-info .nutrition-title {background:#000;color:#fff;}jc-nutritional-info tr.group-row {border-bottom: 3px solid #000;}jc-nutritional-info .group-row tr td {padding-left:10px;}</style><div ng-if="!nutritionData || !nutritionData.length">Loading nutritional information</div><table class="table"><thead><tr><th class="nutrition-title">Nutrition Facts</th></tr></thead><tbody><tr class="group-row" ng-repeat="group in nutritionData"><td><div class="nutrition-heading"><strong ng-bind="group.name"></strong><strong class="pull-right" ng-bind="group.total"></strong></div><table class="table" ng-if="group.children"><tbody><tr ng-repeat="child in group.children"><td><span ng-bind="child.name"></span><span class="pull-right" ng-bind="child.total"></span></td></tr></tbody></table></td></tr></tbody></table></div>',
      scope: {
        nutritionData: "="
      }
    };
  }]);
