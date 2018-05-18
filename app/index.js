let Generator = require('yeoman-generator'),
  chalk = require('chalk'),
  figlet = require('figlet'),
  git = require('simple-git')(),
  updateNotifier = require('update-notifier'),
  pkg = require('../package.json');

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

    this.fs.copyTpl(
      this.templatePath('../templates/vue-nuxt/nuxt.config.js'),
      this.destinationPath('nuxt.config.js'), {
        appName: 'Dennis'
      }
    );
  }

  // Install all the dependencies
  install() {
    this.log(chalk.blue('installing dependencies...'));

    // Nuxt
    if (answers.projectType === 'vue-nuxt') {
      this.npmInstall(['nuxt'], {
        'save': true
      });

      let npmDeps = [
        'node-sass',
        'sass-loader'
      ];

      npmDeps.push('autoprefixer');

      this.npmInstall(npmDeps, {
  			'save': true
  		});
    }
  }



  end() {
    this.log(`Your project name is: ${chalk.yellow(answers.appName)}`);
    this.log(`Matise arguments are: ${matiseArguments}`);
    this.log('Build just ran!');
  }
};
