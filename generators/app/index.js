var generators = require('yeoman-generator');
var chalk = require('chalk');
var consoleMatiseLogo = ' __  __   _ _____ ___ ___ ___   \n|  \\/  | /_|_   _|_ _/ __| __|  \n| |\\/| |/ _ \\| |  | |\\__ | _| _ \n|_|  |_/_/ \\_|_| |___|___|___(_)';
var answers = {
	appName: '',
	siteTitle: '',
	projectType: ''
};

module.exports = generators.Base.extend({
	// The name `constructor` is important here
	constructor: function() {
		// Calling the super constructor is important so our generator is correctly set up
		generators.Base.apply(this, arguments);
	},
	initializing: function initialization() {
		this.log(consoleMatiseLogo);
		this.log(chalk.blue('Here we go, creating a new Matise project:'));
	},
	prompting: function askThemEverything() {
		var done = this.async();
		this.prompt([{
			type: 'list',
			name: 'projecttype',
			message: 'What kind of project are you looking for?',
			choices: ['angular-parse', 'angular', 'wordpress'],
			default: 1
		}, {
			type: 'input',
			name: 'appname',
			message: 'Your angular app name',
			default: 'newproject'
		}, {
			type: 'input',
			name: 'title',
			message: 'Your site title',
			default: 'title'
		}], function(promptAnswers) {
			answers.projectType = promptAnswers.projecttype;
			answers.appName = promptAnswers.appname;
			answers.siteTitle = promptAnswers.title;
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
		// ============= Config files ==============
		this.fs.copyTpl(
			this.templatePath('package.json'),
			this.destinationPath('package.json'), {
				appDesc: answers.siteTitle,
				appName: answers.appName
			}
		);
		this.fs.copyTpl(
			this.templatePath('bower.json'),
			this.destinationPath('bower.json'), {
				appName: answers.appName
			}
		);
		this.fs.copyTpl(
			this.templatePath('.bowerrc'),
			this.destinationPath('.bowerrc'), {}
		);
		this.fs.copyTpl(
			this.templatePath('.gitignore'),
			this.destinationPath('.gitignore'), {}
		);
		this.fs.copyTpl(
			this.templatePath('Gruntfile.js'),
			this.destinationPath('Gruntfile.js'), {}
		);
		this.fs.copyTpl(
			this.templatePath('Gemfile'),
			this.destinationPath('Gemfile'), {}
		);
		// ============= Grunt files ==============
		this.fs.copy(
			this.templatePath('grunt/config/jit-mapping.json'),
			this.destinationPath('grunt/config/jit-mapping.json')
		);
		this.fs.copy(
			this.templatePath('grunt/config/project.json'),
			this.destinationPath('grunt/config/project.json')
		);
		this.fs.copy(
			this.templatePath('grunt/aliases.json'),
			this.destinationPath('grunt/aliases.json')
		);
		this.fs.copy(
			this.templatePath('grunt/bower.js'),
			this.destinationPath('grunt/bower.js')
		);
		this.fs.copy(
			this.templatePath('grunt/clean.js'),
			this.destinationPath('grunt/clean.js')
		);
		this.fs.copyTpl(
			this.templatePath('grunt/concat.js'),
			this.destinationPath('grunt/concat.js'), {
				appName: answers.appName
			}, {
				delimiter: '?'
			}
		);
		this.fs.copy(
			this.templatePath('grunt/connect.js'),
			this.destinationPath('grunt/connect.js')
		);
		this.fs.copy(
			this.templatePath('grunt/copy.js'),
			this.destinationPath('grunt/copy.js')
		);
		this.fs.copy(
			this.templatePath('grunt/htmlbuild.js'),
			this.destinationPath('grunt/htmlbuild.js')
		);
		this.fs.copy(
			this.templatePath('grunt/jshint.js'),
			this.destinationPath('grunt/jshint.js')
		);
		this.fs.copyTpl(
			this.templatePath('grunt/ngtemplates.js'),
			this.destinationPath('grunt/ngtemplates.js'), {
				appName: answers.appName
			}, {
				delimiter: '?'
			}
		);
		this.fs.copy(
			this.templatePath('grunt/notify.js'),
			this.destinationPath('grunt/notify.js')
		);
		this.fs.copy(
			this.templatePath('grunt/postcss.js'),
			this.destinationPath('grunt/postcss.js')
		);
		this.fs.copy(
			this.templatePath('grunt/sass.js'),
			this.destinationPath('grunt/sass.js')
		);
		this.fs.copyTpl(
			this.templatePath('grunt/uglify.js'),
			this.destinationPath('grunt/uglify.js'), {
				appName: answers.appName
			}, {
				delimiter: '?'
			}
		);
		this.fs.copy(
			this.templatePath('grunt/watch.js'),
			this.destinationPath('grunt/watch.js')
		);
		// ============= App base files ==============
		this.fs.copyTpl(
			this.templatePath('index.html'),
			this.destinationPath('src/app/index.html'), {
				title: answers.siteTitle,
				appName: answers.appName
			}
		);
		this.fs.copyTpl(
			this.templatePath('app.js'),
			this.destinationPath('src/app/' + answers.appName + '.js'), {
				appName: answers.appName
			}
		);
		// ============= App default files ==============
		this.fs.copy(
			this.templatePath('sections/error/footer.html'),
			this.destinationPath('src/app/sections/error/footer.html')
		);
		this.fs.copyTpl(
			this.templatePath('sections/error/footer-controller.js'),
			this.destinationPath('src/app/sections/error/footer-controller.js'), {
				appName: answers.appName
			}
		);
		this.fs.copy(
			this.templatePath('sections/error/header.html'),
			this.destinationPath('src/app/sections/error/header.html')
		);
		this.fs.copyTpl(
			this.templatePath('sections/error/header-controller.js'),
			this.destinationPath('src/app/sections/error/header-controller.js'), {
				appName: answers.appName
			}
		);
		this.fs.copy(
			this.templatePath('sections/error/oldbrowser.html'),
			this.destinationPath('src/app/sections/error/oldbrowser.html')
		);
		this.fs.copyTpl(
			this.templatePath('sections/error/oldbrowser-controller.js'),
			this.destinationPath('src/app/sections/error/oldbrowser-controller.js'), {
				appName: answers.appName
			}
		);
	},
	conflicts: function mergeTheConflicts() {
		this.log('conflicts');
	},
	install: function installThePackages() {
		this.log('installing dependencies...');
		this.npmInstall([
			'autoprefixer-core',
			'bower',
			'connect-modrewrite',
			'css-byebye',
			'grunt',
			'grunt-angular-templates',
			'grunt-bower-task',
			'grunt-cli',
			'grunt-contrib-clean',
			'grunt-contrib-concat',
			'grunt-contrib-connect',
			'grunt-contrib-copy',
			'grunt-contrib-jshint',
			'grunt-contrib-sass',
			'grunt-contrib-watch',
			'grunt-html-build',
			'grunt-notify',
			'grunt-postcss',
			'jit-grunt',
			'jshint-stylish',
			'load-grunt-config',
			'postcss-alias',
			'postcss-assets',
			'postcss-center',
			'postcss-size',
			'postcss-sprites',
			'postcss-svg',
			'postcss-verthorz',
			'postcss-vmin',
			'serve-static',
			'time-grunt'
		], {
			'saveDev': true
		});
		this.bowerInstall([
			'angular',
			'angular-ui-router',
			'foundation',
			'modernizr'
		], {
			'save': true
		});
		this.spawnCommand('bundle', ['install']);
	},
	end: function ItAintOverTillItsOver() {
		this.log(chalk.green('The End, All done!'));
	}
});
