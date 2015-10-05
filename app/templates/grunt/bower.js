var path = require('path');

module.exports = {
  install: {
    options: {
      targetDir: '<%= config.src.vendor %>',
      layout: function(type, component) {
        if (component === 'foundation') {
          console.log(component);
          return path.join(component, type);
        } else {
          return '';
        }

      },
      install: true, // You don't want to do this in Jenkins!
      verbose: true,
      cleanTargetDir: true,
      cleanBowerDir: true,
      bowerOptions: {
        production: true
      }
    }
  }
};
