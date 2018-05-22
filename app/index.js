let Generator = require('yeoman-generator'),
  chalk = require('chalk'),
  figlet = require('figlet'),
  git = require('simple-git')(),
  updateNotifier = require('update-notifier'),
  pkg = require('../package.json'),

  fs = require("fs");

// let vueNuxt = require('./generators/vue-nuxt');

let matiseArguments = [];

let notifier = updateNotifier({
  'pkg': pkg,
  updateCheckInterval: 0
})

// Object with answers
let answers = {
  appName: '',
  siteTitle: '',
  projectType: ''
};

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    matiseArguments = this.args;
  }

  // Set up and check for updates
  initialization() {
    // this.log(chalk.cyan(figlet.textSync('MATISE.', {
    //   font: 'Big Money-nw'
    // })));
    //
    // this.log(chalk.blue('Here we go, creating a new Matise project:'));
    //
    // if (notifier.update !== undefined) {
    //   this.log('\n' + chalk.yellow('----------------------------------------'));
    //   this.log(chalk.red('UPDATE AVAILABLE:'));
    //   this.log(chalk.red('Update your generator to ') + chalk.green(notifier.update.latest));
    //   this.log('Run: ' + chalk.cyan('npm i -g generator-matise') + ' to update');
    //   this.log(chalk.yellow('----------------------------------------') + '\n');
    // }
  }

  // Ask questions
  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'appname',
      message: 'Your project name',
      default: this.appname.toLowerCase()
    }, {
      type: 'input',
      name: 'title',
      message: 'Your site title',
      default: 'Amazing website'
    }, {
      type: 'list',
      name: 'projecttype',
      message: 'What kind of project are you looking for?',
      choices: ['Vue-Nuxt', 'Vue basic'],
      default: 0
    }]).then((promptAnswers) => {
      answers.projectType = promptAnswers.projecttype.toLowerCase();
      answers.appName = promptAnswers.appname.replace(' ', '');
      answers.siteTitle = promptAnswers.title;

      this.log(answers.projectType)

      // Vue prompt
      if (answers.projectType === 'vue-nuxt') {
        // this.log(vueNuxt.go(this));
      }
    })
  }

  configuring() {
    this.log(chalk.magenta('configuring...'));
  }

  default () {
    this.log('Init Git');
    git.init().add('.').commit('First commit!');
    this.log('Git init complete');
  }

  writing() {
    this.log(chalk.yellow('writing files...'));
  }

  // Install all the dependencies
  install() {
    let self = this;
    this.log(chalk.blue('installing dependencies...'));

    // Nuxt
    // spawn('vue init nuxt-community/starter-template test');

    if (answers.projectType === 'vue-nuxt') {

      this.npmInstall('vue-cli', {
        'save': true
      }).then(function() {
        self.spawnCommandSync('./node_modules/.bin/vue', ['init', 'nuxt-community/starter-template'])
      }).then(function() {

        // Writing all the custom files
        fs.unlink('nuxt.config.js');
        self.fs.copyTpl(
          self.templatePath('../templates/vue-nuxt/nuxt.config.js'),
          self.destinationPath('nuxt.config.js'), {
            appName: 'Dennis'
          }
        );

        self.fs.copyTpl(
          self.templatePath('../templates/vue-nuxt/assets/scss/app.scss'),
          self.destinationPath('assets/scss/app.scss')
        );

        // ASSETS
        self.fs.copyTpl(
          self.templatePath('../templates/vue-nuxt/assets/images/matise.svg'),
          self.destinationPath('assets/scss/images/matise.svg')
        );

        self.fs.copyTpl(
          self.templatePath('../templates/vue-nuxt/assets/scss/color/_colors.scss'),
          self.destinationPath('assets/scss/color/_colors.scss')
        );

        self.fs.copyTpl(
          self.templatePath('../templates/vue-nuxt/assets/scss/components/_matise-image.scss'),
          self.destinationPath('assets/scss/components/_matise-image.scss')
        );

        self.fs.copyTpl(
          self.templatePath('../templates/vue-nuxt/assets/scss/settings/_settings.scss'),
          self.destinationPath('assets/scss/settings/_settings.scss')
        );

        self.fs.copyTpl(
          self.templatePath('../templates/vue-nuxt/assets/scss/typography/_typography.scss'),
          self.destinationPath('assets/scss/typography/_typography.scss')
        );

        // LAYOUTS
        fs.unlink('layouts/default.vue');
        self.fs.copyTpl(
          self.templatePath('../templates/vue-nuxt/layouts/default.vue'),
          self.destinationPath('layouts/default.vue')
        );

        self.fs.copyTpl(
          self.templatePath('../templates/vue-nuxt/layouts/footer/footerElement.vue'),
          self.destinationPath('layouts/footer/footerElement.vue')
        );

        self.fs.copyTpl(
          self.template('../templates/vue-nuxt/layouts/header/headerElement.vue'),
          self.destinationPath('layouts/header/headerElement.vue')
        );

        //PAGES DIT VERDIEND AANDACHT!!!!
        fs.unlink('nuxt.config.js');
        self.fs.copyTpl(
          self.templatePath('../templates/vue-nuxt/pages/index.vue'),
          self.destinationPath('layouts/header/pages/index.vue')
        );

      }).then(function() {
        // Installing Nuxt
        let npmDeps = [
          'node-sass',
          'sass-loader'
        ]
        self.npmInstall(npmDeps, {
        	'save': true
        })
      })

    }
  }

  end() {
    this.log(`Your project name is: ${chalk.yellow(answers.appName)}`);
    this.log(`Matise arguments are: ${matiseArguments}`);
    this.log('Build just ran!');
  }
};
