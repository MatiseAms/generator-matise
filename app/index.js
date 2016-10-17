var generators = require('yeoman-generator'),
	chalk = require('chalk'),
	git = require('simple-git')(),
	mkdirp = require('mkdirp'),
	updateNotifier = require('update-notifier'),
	pkg = require('../package.json'),
	notifier = updateNotifier({
		'pkg': pkg,
		updateCheckInterval: 0
	}),
	matiseArguments = [];

notifier.notify();

var consoleMatiseLogo = ' __  __   _ _____ ___ ___ ___   \n|  \\/  | /_|_   _|_ _/ __| __|  \n| |\\/| |/ _ \\| |  | |\\__ | _| _ \n|_|  |_/_/ \\_|_| |___|___|___(_)';
var wordpressRepo = 'git://github.com/WordPress/WordPress.git',
	wpDir = 'public/wordpress',
	latestVersion = '4.4',
	wpSaltKeys = '';

var answers = {
	appName: '',
	siteTitle: '',
	projectType: '',
};

var request = require('request');
request('https://api.wordpress.org/secret-key/1.1/salt/', function(error, response, body) {
	wpSaltKeys = body;
});

git.listRemote(['--tags', wordpressRepo], function(err, tagsList) {
	if (err) console.log(err);
	tagList = ('' + tagsList).split('\n');
	tagList.pop();
	lastTag = /\d\.\d(\.\d)?/ig.exec(tagList.pop());
	if (lastTag !== null) {
		latestVersion = lastTag[0];
	}
});

module.exports = generators.Base.extend({
	// The name `constructor` is important here
	constructor: function() {
		// Calling the super constructor is important so our generator is correctly set up
		generators.Base.apply(this, arguments);
		matiseArguments = this.arguments;
	},
	initializing: function initialization() {
		this.log(consoleMatiseLogo);
		this.log(chalk.blue('Here we go, creating a new Matise project:'));
		if (notifier.update !== undefined) {
			this.log('\n' + chalk.yellow('----------------------------------------'));
			this.log(chalk.red('UPDATE AVAILABLE:'));
			this.log(chalk.red('Update your generator to ') + chalk.green(notifier.update.latest));
			this.log('Run: ' + chalk.cyan('npm i -g generator-matise') + ' to update');
			this.log(chalk.yellow('----------------------------------------') + '\n');
		}
	},
	prompting: function askThemEverything() {
		if (matiseArguments.length != 4) {
			var done = this.async();
			this.prompt([{
				type: 'list',
				name: 'projecttype',
				message: 'What kind of project are you looking for?',
				choices: ['angular', 'wordpress'],
				default: 0
			}, {
				type: 'input',
				name: 'appname',
				message: 'Your app/theme name (lowercase!)',
				default: this.appname.toLowerCase()
			}, {
				type: 'input',
				name: 'title',
				message: 'Your site title',
				default: 'Amazing website'
			}, {
				type: 'input',
				name: 'tinypng',
				message: 'Tiny png api key',
				default: ''
			}], function(promptAnswers) {
				answers.projectType = promptAnswers.projecttype;
				answers.appName = promptAnswers.appname.replace(' ', '');
				answers.siteTitle = promptAnswers.title;
				answers.tinyPNGKey = promptAnswers.tinypng;
				done();
			}.bind(this));
		} else{
			answers.projectType = matiseArguments[0];
			answers.appName = matiseArguments[1];
			answers.siteTitle = matiseArguments[2];
			answers.tinyPNGKey = matiseArguments[3];
		}
		console.log(answers);
	},
	configuring: function configure() {
		this.log(chalk.magenta('configuring...'));
	},
	default: function defaultThings() {
		this.log('Init Git');
		git.init().add('.').commit('First commit!');
		this.log('Git init complete');
	},
	wordpress: function installWordpress() {

		if (answers.projectType === 'wordpress') {
			var done = this.async();

			mkdirp.sync('public/');
			this.log('Installing WordPress ' + latestVersion + ' as a submodule (be patient)');
			git.submoduleAdd(wordpressRepo, wpDir, function(err) {
				this.log('Submodule added');

				var wpGit = require('simple-git')('public/wordpress');

				console.log('Checking out WP version ' + latestVersion);
				wpGit.checkout(latestVersion, function(err) {
					console.log('WordPress installed');
					done();
				}.bind(this));
			}.bind(this));
		}
	},
	writing: function writeItDown() {
		this.log(chalk.yellow('writing files...'));

		// ============= Config files ==============

		// ============= App scss files ==============
		var scssDestination = '';
		if (answers.projectType === 'angular') {
			scssDestination = 'src/app/';
		}
		if (answers.projectType === 'wordpress') {
			scssDestination = 'themesrc/';
		}
		// Mixins folder
		this.fs.copy(
			this.templatePath('scss/mixins/*'),
			this.destinationPath(scssDestination + 'scss/mixins')
		);
		// Zurb folder
		this.fs.copy(
			this.templatePath('scss/zurb/*'),
			this.destinationPath(scssDestination + 'scss/zurb')
		);
		//global sccss
		this.fs.copy(
			this.templatePath('scss/*'),
			this.destinationPath(scssDestination + 'scss')
		);

		// ============= Common project files ==============
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
			this.templatePath('Gruntfile.js'),
			this.destinationPath('Gruntfile.js'), {}
		);


		// ============= Angular only files ==============
		if (answers.projectType === 'angular') {

			this.fs.copyTpl(
				this.templatePath('angular/README.md'),
				this.destinationPath('README.md'), {
					appTitle: answers.siteTitle
				}
			);
			this.fs.copyTpl(
				this.templatePath('angular/gitignore'),
				this.destinationPath('.gitignore'), {}
			);

			// ============= Grunt files ==============
			this.fs.copy(
				this.templatePath('angular/grunt/config/jit-mapping.json'),
				this.destinationPath('grunt/config/jit-mapping.json')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/config/project.json'),
				this.destinationPath('grunt/config/project.json')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/config/csscomb.json'),
				this.destinationPath('grunt/config/csscomb.json')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/aliases.json'),
				this.destinationPath('grunt/aliases.json')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/bower.js'),
				this.destinationPath('grunt/bower.js')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/clean.js'),
				this.destinationPath('grunt/clean.js')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/shell.js'),
				this.destinationPath('grunt/shell.js')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/tinypng.js'),
				this.destinationPath('grunt/tinypng.js')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/cacheBust.js'),
				this.destinationPath('grunt/cacheBust.js')
			);
			this.fs.copyTpl(
				this.templatePath('angular/grunt/concat.js'),
				this.destinationPath('grunt/concat.js'), {
					appName: answers.appName
				}, {
					delimiter: '?'
				}
			);
			this.fs.copy(
				this.templatePath('angular/grunt/browserSync.js'),
				this.destinationPath('grunt/browserSync.js')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/copy.js'),
				this.destinationPath('grunt/copy.js')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/csscomb.js'),
				this.destinationPath('grunt/csscomb.js')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/cssnano.js'),
				this.destinationPath('grunt/cssnano.js')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/htmlbuild.js'),
				this.destinationPath('grunt/htmlbuild.js')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/jshint.js'),
				this.destinationPath('grunt/jshint.js')
			);
			this.fs.copyTpl(
				this.templatePath('angular/grunt/ngtemplates.js'),
				this.destinationPath('grunt/ngtemplates.js'), {
					appName: answers.appName
				}, {
					delimiter: '?'
				}
			);
			this.fs.copy(
				this.templatePath('angular/grunt/notify.js'),
				this.destinationPath('grunt/notify.js')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/postcss.js'),
				this.destinationPath('grunt/postcss.js')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/sass.js'),
				this.destinationPath('grunt/sass.js')
			);
			this.fs.copyTpl(
				this.templatePath('angular/grunt/uglify.js'),
				this.destinationPath('grunt/uglify.js'), {
					appName: answers.appName
				}, {
					delimiter: '?'
				}
			);
			this.fs.copy(
				this.templatePath('angular/grunt/watch.js'),
				this.destinationPath('grunt/watch.js')
			);
			// ============= App base files ==============
			this.fs.copyTpl(
				this.templatePath('angular/index.html'),
				this.destinationPath('src/app/index.html'), {
					title: answers.siteTitle,
					appName: answers.appName
				}
			);
			this.fs.copyTpl(
				this.templatePath('angular/app.js'),
				this.destinationPath('src/app/' + answers.appName + '.js'), {
					appName: answers.appName
				}
			);
			// ============= App default files ==============
			this.fs.copy(
				this.templatePath('angular/sections/error/footer.html'),
				this.destinationPath('src/app/sections/error/footer.html')
			);
			this.fs.copyTpl(
				this.templatePath('angular/sections/error/footer-controller.js'),
				this.destinationPath('src/app/sections/error/footer-controller.js'), {
					appName: answers.appName
				}
			);
			this.fs.copy(
				this.templatePath('angular/sections/error/header.html'),
				this.destinationPath('src/app/sections/error/header.html')
			);
			this.fs.copyTpl(
				this.templatePath('angular/sections/error/header-controller.js'),
				this.destinationPath('src/app/sections/error/header-controller.js'), {
					appName: answers.appName
				}
			);
			this.fs.copy(
				this.templatePath('angular/sections/error/oldbrowser.html'),
				this.destinationPath('src/app/sections/error/oldbrowser.html')
			);
			this.fs.copyTpl(
				this.templatePath('angular/sections/error/oldbrowser-controller.js'),
				this.destinationPath('src/app/sections/error/oldbrowser-controller.js'), {
					appName: answers.appName
				}
			);
			this.fs.copy(
				this.templatePath('angular/sections/root/footer.html'),
				this.destinationPath('src/app/sections/root/footer.html')
			);
			this.fs.copyTpl(
				this.templatePath('angular/sections/root/footer-controller.js'),
				this.destinationPath('src/app/sections/root/footer-controller.js'), {
					appName: answers.appName
				}
			);
			this.fs.copy(
				this.templatePath('angular/sections/root/header.html'),
				this.destinationPath('src/app/sections/root/header.html')
			);
			this.fs.copyTpl(
				this.templatePath('angular/sections/root/header-controller.js'),
				this.destinationPath('src/app/sections/root/header-controller.js'), {
					appName: answers.appName
				}
			);
			this.fs.copy(
				this.templatePath('angular/sections/home/home.html'),
				this.destinationPath('src/app/sections/home/home.html')
			);
			this.fs.copyTpl(
				this.templatePath('angular/sections/home/home-controller.js'),
				this.destinationPath('src/app/sections/home/home-controller.js'), {
					appName: answers.appName
				}
			);
			this.fs.copy(
				this.templatePath('angular/sections/about/about.html'),
				this.destinationPath('src/app/sections/about/about.html')
			);
			this.fs.copyTpl(
				this.templatePath('angular/sections/about/about-controller.js'),
				this.destinationPath('src/app/sections/about/about-controller.js'), {
					appName: answers.appName
				}
			);
			this.fs.copy(
				this.templatePath('angular/sections/about/top.html'),
				this.destinationPath('src/app/sections/about/top.html')
			);
			this.fs.copyTpl(
				this.templatePath('angular/sections/about/top-controller.js'),
				this.destinationPath('src/app/sections/about/top-controller.js'), {
					appName: answers.appName
				}
			);
			this.fs.copy(
				this.templatePath('angular/sections/about/middle.html'),
				this.destinationPath('src/app/sections/about/middle.html')
			);
			this.fs.copyTpl(
				this.templatePath('angular/sections/about/middle-controller.js'),
				this.destinationPath('src/app/sections/about/middle-controller.js'), {
					appName: answers.appName
				}
			);
			this.fs.copy(
				this.templatePath('angular/sections/about/bottom.html'),
				this.destinationPath('src/app/sections/about/bottom.html')
			);
			this.fs.copyTpl(
				this.templatePath('angular/sections/about/bottom-controller.js'),
				this.destinationPath('src/app/sections/about/bottom-controller.js'), {
					appName: answers.appName
				}
			);

		}

		// ============= Wordpress only files ==============
		if (answers.projectType === 'wordpress') {
			this.fs.copyTpl(
				this.templatePath('wordpress/gitignore'),
				this.destinationPath('.gitignore'), {
					appName: answers.appName
				}
			);
			this.fs.copyTpl(
				this.templatePath('wordpress/Vagrantfile'),
				this.destinationPath('Vagrantfile'), {
					appName: answers.appName
				}
			);
			this.fs.copyTpl(
				this.templatePath('wordpress/README.md'),
				this.destinationPath('README.md'), {
					appTitle: answers.siteTitle
				}
			);

			this.fs.copy(
				this.templatePath('wordpress/rsync_exclude.txt'),
				this.destinationPath('rsync_exclude.txt')
			);

			// ============= Grunt files ==============
			this.fs.copy(
				this.templatePath('wordpress/grunt/config/jit-mapping.json'),
				this.destinationPath('grunt/config/jit-mapping.json')
			);
			this.fs.copyTpl(
				this.templatePath('wordpress/grunt/config/project.json'),
				this.destinationPath('grunt/config/project.json'), {
					appName: answers.appName
				}
			);
			this.fs.copy(
				this.templatePath('wordpress/grunt/aliases.json'),
				this.destinationPath('grunt/aliases.json')
			);
			this.fs.copy(
				this.templatePath('wordpress/grunt/bower.js'),
				this.destinationPath('grunt/bower.js')
			);
			this.fs.copy(
				this.templatePath('wordpress/grunt/tinypng.js'),
				this.destinationPath('grunt/tinypng.js')
			);
			this.fs.copyTpl(
				this.templatePath('wordpress/grunt/browserSync.js'),
				this.destinationPath('grunt/browserSync.js'), {
					appName: answers.appName
				}
			);
			this.fs.copyTpl(
				this.templatePath('wordpress/grunt/clean.js'),
				this.destinationPath('grunt/clean.js'), {
					appName: answers.appName
				}, {
					delimiter: '?'
				}
			);
			this.fs.copy(
				this.templatePath('wordpress/grunt/copy.js'),
				this.destinationPath('grunt/copy.js')
			);
			this.fs.copy(
				this.templatePath('wordpress/grunt/notify.js'),
				this.destinationPath('grunt/notify.js')
			);
			this.fs.copyTpl(
				this.templatePath('wordpress/grunt/postcss.js'),
				this.destinationPath('grunt/postcss.js'), {
					appName: answers.appName
				}, {
					delimiter: '?'
				}
			);
			this.fs.copy(
				this.templatePath('wordpress/grunt/sass.js'),
				this.destinationPath('grunt/sass.js')
			);
			this.fs.copyTpl(
				this.templatePath('wordpress/grunt/shell.js'),
				this.destinationPath('grunt/shell.js'), {
					appName: answers.appName
				}
			);
			this.fs.copy(
				this.templatePath('wordpress/grunt/watch.js'),
				this.destinationPath('grunt/watch.js')
			);

			// ============= Theme php files ==============
			this.fs.copyTpl(
				this.templatePath('wordpress/theme/index.php'),
				this.destinationPath('themesrc/index.php'), {
					appName: answers.appName
				}
			);
			this.fs.copyTpl(
				this.templatePath('wordpress/theme/archive.php'),
				this.destinationPath('themesrc/archive.php'), {
					appName: answers.appName
				}
			);
			this.fs.copyTpl(
				this.templatePath('wordpress/theme/footer.php'),
				this.destinationPath('themesrc/footer.php'), {
					appName: answers.appName
				}
			);
			this.fs.copyTpl(
				this.templatePath('wordpress/theme/functions.php'),
				this.destinationPath('themesrc/functions.php'), {
					appName: answers.appName
				}
			);
			this.fs.copyTpl(
				this.templatePath('wordpress/theme/header.php'),
				this.destinationPath('themesrc/header.php'), {
					appName: answers.appName
				}
			);
			this.fs.copyTpl(
				this.templatePath('wordpress/theme/page.php'),
				this.destinationPath('themesrc/page.php'), {
					appName: answers.appName
				}
			);
			this.fs.copyTpl(
				this.templatePath('wordpress/theme/single.php'),
				this.destinationPath('themesrc/single.php'), {
					appName: answers.appName
				}
			);

			// ============= Theme css file ==============
			this.fs.copyTpl(
				this.templatePath('wordpress/theme/style.css'),
				this.destinationPath('themesrc/style.css'), {
					appTitle: answers.siteTitle
				}
			);

			// ============= Theme font files ==============
			this.fs.copyTpl(
				this.templatePath('wordpress/theme/fonts/placeholder.svg'),
				this.destinationPath('themesrc/fonts/placeholder.svg'), {}
			);

			// ============= Theme img files ==============
			this.fs.copyTpl(
				this.templatePath('wordpress/theme/img/placeholder.jpg'),
				this.destinationPath('themesrc/img/placeholder.jpg'), {}
			);

			// ============= Theme js files ==============
			this.fs.copyTpl(
				this.templatePath('wordpress/theme/js/app.js'),
				this.destinationPath('themesrc/js/app.js'), {}
			);

			// ============= public/ files ==============
			this.fs.copyTpl(
				this.templatePath('wordpress/wp-config.php'),
				this.destinationPath('public/wp-config.php'), {
					salts: wpSaltKeys
				}
			);
			this.fs.copy(
				this.templatePath('wordpress/local-config.php'),
				this.destinationPath('wpconfig/dist/local-config.php')
			);
			this.fs.copy(
				this.templatePath('wordpress/local-config.php'),
				this.destinationPath('wpconfig/dev/local-config.php')
			);
			this.fs.copy(
				this.templatePath('wordpress/local-config.php'),
				this.destinationPath('wpconfig/staging/local-config.php')
			);
			this.fs.copy(
				this.templatePath('wordpress/index.php'),
				this.destinationPath('public/index.php')
			);
			this.fs.copy(
				this.templatePath('wordpress/matiseisgolden.php'),
				this.destinationPath('public/content/index.php')
			);
			this.fs.copy(
				this.templatePath('wordpress/matiseisgolden.php'),
				this.destinationPath('public/content/themes/index.php')
			);
			this.fs.copy(
				this.templatePath('wordpress/index.php'),
				this.destinationPath('public/index.php')
			);
			this.fs.copy(
				this.templatePath('wordpress/htaccess'),
				this.destinationPath('public/.htaccess')
			);

		}

	},
	conflicts: function mergeTheConflicts() {
		this.log('conflicts? what conflicts?');
	},
	install: function installThePackages() {
		this.log('installing dependencies...');

		if (answers.projectType === 'angular') {
			this.npmInstall([
				'autoprefixer',
				'bower',
				'connect-modrewrite',
				'css-byebye',
				'grunt@^0.4.5',
				'grunt-angular-templates',
				'grunt-bower',
				'grunt-cache-bust',
				'grunt-browser-sync',
				'grunt-cli',
				'grunt-contrib-clean',
				'grunt-contrib-concat',
				'grunt-contrib-copy',
				'grunt-contrib-jshint',
				'grunt-contrib-uglify',
				'grunt-contrib-watch',
				'grunt-sass',
				'grunt-html-build',
				'grunt-notify',
				'grunt-postcss',
				'grunt-csscomb',
				'grunt-shell',
				'grunt-cssnano',
				'grunt-tinypng',
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
				'time-grunt',
				'postcss-custom-selectors'
			], {
				'saveDev': true
			});
			this.bowerInstall([
				'angular',
				'angular-ui-router',
				'foundation-sites',
				'modernizr#2.8.3',
				'angulartics-google-analytics'
			], {
				'save': true
			});
		}

		if (answers.projectType === 'wordpress') {
			this.npmInstall([
				'autoprefixer',
				'bower',
				'css-byebye',
				'grunt@^0.4.5',
				'grunt-bower',
				'grunt-browser-sync',
				'grunt-cli',
				'grunt-contrib-clean',
				'grunt-contrib-copy',
				'grunt-contrib-watch',
				'grunt-notify',
				'grunt-php',
				'grunt-postcss',
				'grunt-sass',
				'grunt-shell',
				'grunt-tinypng',
				'jit-grunt',
				'load-grunt-config',
				'postcss-alias',
				'postcss-assets',
				'postcss-center',
				'postcss-size',
				'postcss-sprites',
				'postcss-svg',
				'postcss-verthorz',
				'postcss-vmin',
				'time-grunt'
			], {
				'saveDev': true
			});
			this.bowerInstall([
				'foundation-sites',
				'modernizr#2.8.3'
			], {
				'save': true
			});
		}

	},
	end: function ItAintOverTillItsOver() {
		this.log(chalk.green('The End, All done!'));
	}
});
