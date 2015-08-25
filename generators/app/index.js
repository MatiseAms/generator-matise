var generators = require('yeoman-generator');
var chalk = require('chalk');
var consoleMatiseLogo = ' __  __   _ _____ ___ ___ ___   \n|  \\/  | /_|_   _|_ _/ __| __|  \n| |\\/| |/ _ \\| |  | |\\__ | _| _ \n|_|  |_/_/ \\_|_| |___|___|___(_)';
var promptAnswers = {
  appName: '',
  siteTitle: ''
};

module.exports = generators.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);
  },
  initializing: function initialization() {
    this.log(consoleMatiseLogo);
    this.log(chalk.blue('Here we go, creating a new Matise project:'));
  },
  prompting: function askThemEverything() {
    var done = this.async();
    this.prompt([
      {
        type    : 'list',
        name    : 'projecttype',
        message : 'What kind of project are you looking for?',
        choices : ['angular-parse','angular','wordpress'],
        default : 1
      }, {
        type    : 'input',
        name    : 'name',
        message : 'Your project name',
        default : 'newproject'
      }, {
        type    : 'input',
        name    : 'title',
        message : 'Your site title',
        default : 'title'
      }
    ], function (answers) {
      promptAnswers.appName = answers.name;
      promptAnswers.siteTitle = answers.title;
      done();
    }.bind(this));
  },
  configuring: function configure() {
    this.log(chalk.magenta('configuring...'));
  },
  default: function defaultThings() {
    this.log('default');
  },
  writing: function writeItDown() {
    this.log(chalk.yellow('writing files...'));
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/app/index.html'),
      { title: promptAnswers.siteTitle, appName: promptAnswers.appName}
    );
  },
  conflicts: function mergeTheConflicts() {
    this.log('conflicts');
  },
  install: function installThePackages() {
    this.log('install');
    this.npmInstall(['lodash'], { 'saveDev': true });
  },
  end: function ItAintOverTillItsOver() {
    this.log(chalk.green('The End, All done!'));
  }
});
