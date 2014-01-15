describe('dpdCollection', function () {
  var $compile, $rootScope, $controller, $httpBackend, $filter;

  beforeEach(module('jcNutritionalInfo', 'nutritional-info-component.html'));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$controller_, _$httpBackend_, _$filter_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $filter = _$filter_;
  }));


  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  describe('stripUnit', function () {
    var stripUnit;
    beforeEach(function () {
      stripUnit = $filter('stripUnit');
    });


    it('should return a tuple of numeric value and unit string', function () {
      expect(stripUnit('5mg')).toEqual([5,'mg'])
    });


    it('should replace the unit with an empty string if just number provided', function () {
      expect(stripUnit('5')).toEqual([5, '']);
    });


    it('should complain if input does not start with number', function () {
      expect(function () {stripUnit('twinkie')}).toThrow(new Error('Value must contain a value'));
    });
  });


  describe('foodsToNutrition', function () {
    var foodsToNutrition;

    beforeEach(function () {
      foodsToNutrition = $filter('foodsToNutrition');
    });


    it('should return an ordered array of directive-friendly data', function () {
      var output = foodsToNutrition([{carbohydrate: '5mg', sodium: '5mg'}, {sodium: '5mg'}]);
      expect(output[0].total).toBe('5mg');
      expect(output[2].total).toBe('10mg');
    });
  });


  describe('jcNutritionalInfo', function () {
    it('should show a message when no data provided', function () {
      $rootScope.nutritionalInfo = [];
      var compiled = $compile(
        '<jc-nutritional-info nutrition-data="nutritionalInfo">'+
        '</jc-nutritional-info>'
      )($rootScope);
      $rootScope.$apply();
      expect(compiled.text()).toContain('Loading nutritional information');
      $rootScope.nutritionalInfo.push({
        name: 'Carbohydrates',
        total: '50mg',
        children: [{
          name: 'Dietary Fiber',
          total: '15mg'
        }]});
      $rootScope.$apply();
      expect(compiled.text()).not.toContain('Loading nutritional information');
    });


    it('show information of parents and children', function () {
      $rootScope.nutritionalInfo = [{
        name: 'Carbohydrates',
        total: '50mg',
        children: [{
          name: 'Dietary Fiber',
          total: '15mg'
        }]}];

      var compiled = $compile(
        '<jc-nutritional-info nutrition-data="nutritionalInfo">'+
        '</jc-nutritional-info>'
      )($rootScope);
      $rootScope.$apply();
      expect(
        compiled.find('table').find('tbody').find('tr').find('td').text()).
        toContain('Carbohydrates');
      expect(
        compiled.find('table').find('tbody').find('tr').find('td').find('table').text()).toContain('Dietary Fiber');
    });


    it('update information when the model changes', function () {
      $rootScope.nutritionalInfo = [{
        name: 'Carbohydrates',
        total: '50mg',
        children: [{
          name: 'Dietary Fiber',
          total: '15mg'
        }]}];

      var compiled = $compile(
        '<jc-nutritional-info nutrition-data="nutritionalInfo">'+
        '</jc-nutritional-info>'
      )($rootScope);
      $rootScope.$apply();
      expect(compiled.text()).toContain('Carbohydrates');

      $rootScope.nutritionalInfo.splice(0,1, {name: 'Sugar!', total: '500mg'});
      $rootScope.$apply();
      expect(compiled.text()).not.toContain('Carbohydrates');
      expect(compiled.text()).toContain('Sugar!');
    });
  });
});
