var fs = require('fs'),
    path = require('path'),
    template, oneLinedTemplate, directive;

template = fs.readFileSync(path.resolve('src/nutritional-info-component.html'));
oneLinedTemplate = template.toString().split(/\s*\n\s*/).join('').replace(/([\w\s\:])'/g, '$1\\\'');

directive = fs.readFileSync(path.resolve('src/nutritional-info-component.js')).toString();
directive = directive.replace(
    /templateUrl\s*\:\s*? 'nutritional\-info\-component\.html\'/, 'template: \'' +
    oneLinedTemplate +'\'');

fs.writeFileSync(path.resolve('nutritional-info-component.js'), directive);
