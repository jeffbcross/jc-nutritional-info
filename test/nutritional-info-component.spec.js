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
