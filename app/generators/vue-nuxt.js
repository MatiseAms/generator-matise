let Generator = require('yeoman-generator'),
  chalk = require('chalk'),
  figlet = require('figlet');

module.exports.go = function(_this) {
  let self = _this;

  return self.prompt([{
    type: 'checkbox',
    name: 'projectfeatures',
    message: 'What features would you like to use?',
    choices: [{
      name: 'Axios',
      value: 'axios',
      checked: true
    }, {
      name: 'Vuex',
      value: 'vuex',
      checked: true
    }]
  }]).then((optionsAnswers) => {
    return optionsAnswers
  });
};
