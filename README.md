jc-nutritional-info
====================

An AngularJS component to show nutritional information, supporting one level deep of children.

## Usage

### `bower install jc-nutritional-info`

### Add a nutrition list on the scope

```javascript
$scope.nutrition = [{
  name: 'Carbohydrates',
  total: '50mg',
  children: [{
    name: 'Dietary Fiber',
    total: '10g'
  },{
    name: 'Sugars',
    total: '30g'
  }]
}]
```

### And in your template:
```html
<jc-nutritional-info nutrition-data="nutrition">
<jc-nutritional-info>
```

## Development

### Run Tests

 * `bower install`
 * `npm install .`
 * `npm test`