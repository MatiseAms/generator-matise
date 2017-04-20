var Generator = require('yeoman-generator'),
	chalk = require('chalk'),
	figlet = require('figlet'),
	git = require('simple-git')(),
	mkdirp = require('mkdirp'),
	updateNotifier = require('update-notifier'),
	pkg = require('../package.json'),
	notifier = updateNotifier({
		'pkg': pkg,
		updateCheckInterval: 0
	}),
	shelljs = require('shelljs/global'),
	request = require('request'),
	matiseArguments = [];

notifier.notify();

var wordpressRepo = 'git://github.com/WordPress/WordPress.git',
	wpDir = 'public/wordpress',
	latestVersion = '4.7',
	wpSaltKeys = '';

var answers = {
	appName: '',
	siteTitle: '',
	projectType: '',
	tinyPNGKey: '',
	parse: false,
	hipsum: false,
	subviews: false
};

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

module.exports = class extends Generator {
	// The name `constructor` is important here
	constructor(args, opts) {
		// Calling the super constructor is important so our generator is correctly set up
		super(args, opts);
		matiseArguments = this.args;
	}

	initialization() {
		this.log(chalk.cyan(figlet.textSync('MATISE.', {
			font: 'Big Money-nw'
		})));
		this.log(chalk.blue('Here we go, creating a new Matise project:'));
		if (notifier.update !== undefined) {
			this.log('\n' + chalk.yellow('----------------------------------------'));
			this.log(chalk.red('UPDATE AVAILABLE:'));
			this.log(chalk.red('Update your generator to ') + chalk.green(notifier.update.latest));
			this.log('Run: ' + chalk.cyan('npm i -g generator-matise') + ' to update');
			this.log(chalk.yellow('----------------------------------------') + '\n');
		}
	}

	prompting() {
		if (matiseArguments.length != 7) {
			var self = this;
			return self.prompt([{
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
			}, {
				type: 'list',
				name: 'projecttype',
				message: 'What kind of project are you looking for?',
				choices: ['angular', 'wordpress'],
				default: 0
			}]).then((promptAnswers) => {
				answers.projectType = promptAnswers.projecttype;
				answers.appName = promptAnswers.appname.replace(' ', '');
				answers.siteTitle = promptAnswers.title;
				answers.tinyPNGKey = promptAnswers.tinypng;
				if (promptAnswers.projecttype === 'angular') {
					return self.prompt([{
						type: 'checkbox',
						name: 'projectfeatures',
						message: 'What features would you like to use?',
						choices: [{
							name: 'Parse',
							value: 'parse',
							checked: false
						}, {
							name: 'Hipsum',
							value: 'hipsum',
							checked: false
						}, {
							name: 'Subviews',
							value: 'subviews',
							checked: false
						}, {
							name: 'Foundation Zurb',
							value: 'foundation',
							checked: true
						}, ],
						default: 0
					}]).then((optionsAnswers) => {
						if (optionsAnswers.projectfeatures.indexOf('parse') >= 0) {
							answers.parse = true;
						}
						if (optionsAnswers.projectfeatures.indexOf('hipsum') >= 0) {
							answers.hipsum = true;
						}
						if (optionsAnswers.projectfeatures.indexOf('subviews') >= 0) {
							answers.subviews = true;
						}
						if (optionsAnswers.projectfeatures.indexOf('foundation') >= 0) {
							answers.foundation = true;
						}
					});
				} else {
					return;
				}
			});
		} else {
			answers.projectType = matiseArguments[0];
			answers.appName = matiseArguments[1];
			answers.siteTitle = matiseArguments[2];
			answers.tinyPNGKey = matiseArguments[3];
			answers.parse = matiseArguments[4] === 'true';
			answers.hipsum = matiseArguments[5] === 'true';
			answers.subviews = matiseArguments[6] === 'true';
			answers.foundation = matiseArguments[7] === 'true';
		}
	}

	configuring() {
		this.log(chalk.magenta('configuring...'));
	}

	default () {
		this.log('Init Git');
		git.init().add('.').commit('First commit!');
		this.log('Git init complete');
	}

	wordpress() {
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
	}

	writing() {
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
		// Icons folder
		this.fs.copy(
			this.templatePath('scss/icons/*'),
			this.destinationPath(scssDestination + 'scss/icons')
		);
		// Mixins folder
		this.fs.copy(
			this.templatePath('scss/mixins/*'),
			this.destinationPath(scssDestination + 'scss/mixins')
		);

		// Functions folder
		this.fs.copy(
			this.templatePath('scss/functions/*'),
			this.destinationPath(scssDestination + 'scss/functions')
		);

		if (answers.foundation) {
			// Zurb folder
			var utilPath = '@import \'scss/util/util\';';
			var foundationPath = '@import \'scss/foundation\';';
			if (answers.projectType === 'wordpress') {
				utilPath = '@import \'foundation/scss/util/util\';';
				foundationPath = '@import \'foundation/scss/foundation\';';
			}
			this.fs.copyTpl(
				this.templatePath('scss/zurb/_foundation.scss'),
				this.destinationPath(scssDestination + 'scss/zurb/_foundation.scss'), {
					foundationImport: foundationPath
				}
			);
			this.fs.copy(
				this.templatePath('scss/zurb/_global.scss'),
				this.destinationPath(scssDestination + 'scss/zurb/_global.scss')
			);
			this.fs.copy(
				this.templatePath('scss/zurb/_grid.scss'),
				this.destinationPath(scssDestination + 'scss/zurb/_grid.scss')
			);
			this.fs.copyTpl(
				this.templatePath('scss/zurb/_settings.scss'),
				this.destinationPath(scssDestination + 'scss/zurb/_settings.scss'), {
					utilImport: utilPath
				}
			);
		}

		//global sccss
		this.fs.copyTpl(
			this.templatePath('scss/*'),
			this.destinationPath(scssDestination + 'scss'), {
				foundationInclude: answers.foundation
			}
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
			this.templatePath('Gruntfile.js'),
			this.destinationPath('Gruntfile.js'), {}
		);

		if (answers.projectType === 'wordpress') {
			this.fs.copyTpl(
				this.templatePath('bower.json'),
				this.destinationPath('bower.json'), {
					appName: answers.appName
				}
			);
		}
		// ============= Webfont folders ==============
		this.fs.copy(
			this.templatePath('icons/**/*'),
			this.destinationPath(scssDestination + 'icons')
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
				this.templatePath('angular/grunt/config/beautifier.json'),
				this.destinationPath('grunt/config/beautifier.json')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/aliases.json'),
				this.destinationPath('grunt/aliases.json')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/clean.js'),
				this.destinationPath('grunt/clean.js')
			);
			this.fs.copyTpl(
				this.templatePath('angular/grunt/tinypng.js'),
				this.destinationPath('grunt/tinypng.js'), {
					tinyPNGKey: answers.tinyPNGKey
				}, {
					delimiter: '?'
				}
			);
			this.fs.copyTpl(
				this.templatePath('angular/grunt/browserify.js'),
				this.destinationPath('grunt/browserify.js'), {
					appName: answers.appName
				}, {
					delimiter: '?'
				}
			);
			this.fs.copy(
				this.templatePath('angular/grunt/cacheBust.js'),
				this.destinationPath('grunt/cacheBust.js')
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
				this.templatePath('angular/grunt/cssnano.js'),
				this.destinationPath('grunt/cssnano.js')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/htmlbuild.js'),
				this.destinationPath('grunt/htmlbuild.js')
			);
			this.fs.copy(
				this.templatePath('angular/grunt/jsbeautifier.js'),
				this.destinationPath('grunt/jsbeautifier.js')
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
			this.fs.copyTpl(
				this.templatePath('angular/grunt/watch.js'),
				this.destinationPath('grunt/watch.js'), {
					appName: answers.appName
				}, {
					delimiter: '?'
				}
			);
			this.fs.copy(
				this.templatePath('angular/grunt/webfont.js'),
				this.destinationPath('grunt/webfont.js')
			);
			// ============= App base files ==============
			var developScript = '',
				productionScript = '';

			if (answers.parse) {
				developScript = '// "grunt dev"\n		var localParse = true;';
				productionScript = '// "grunt staging" and "grunt dist"\n		var localParse = false;';
			}

			this.fs.copyTpl(
				this.templatePath('angular/index.html'),
				this.destinationPath('src/app/index.html'), {
					title: answers.siteTitle,
					appName: answers.appName,
					devScript: developScript,
					prodScript: productionScript
				}
			);

			var angularModules = 'angulartics';
			var requireLines = '';
			if (answers.hipsum) {
				requireLines += 'require(\'angular-hipsum\');\n';
				angularModules += '\',\n	\'ngHipsum';
			}
			if (answers.parse) {
				angularModules += '\',\n	\'ngParse';
				this.fs.copyTpl(
					this.templatePath('angular/app-parse.js'),
					this.destinationPath('src/app/' + answers.appName + '.js'), {
						appName: answers.appName,
						ngModules: angularModules,
						requires: requireLines
					}
				);
			} else {
				this.fs.copyTpl(
					this.templatePath('angular/app.js'),
					this.destinationPath('src/app/' + answers.appName + '.js'), {
						appName: answers.appName,
						ngModules: angularModules,
						requires: requireLines
					}
				);
			}

			this.fs.copy(
				this.templatePath('angular/htaccess'),
				this.destinationPath('src/app/.htaccess')
			);
			this.fs.copy(
				this.templatePath('angular/components.js'),
				this.destinationPath('src/app/components.js')
			);
			this.fs.copy(
				this.templatePath('angular/controllers.js'),
				this.destinationPath('src/app/controllers.js')
			);

			// ============= App default files ==============
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
			this.fs.copyTpl(
				this.templatePath('wordpress/grunt/tinypng.js'),
				this.destinationPath('grunt/tinypng.js'), {
					tinyPNGKey: answers.tinyPNGKey
				}, {
					delimiter: '?'
				}
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
				this.templatePath('wordpress/htaccess'),
				this.destinationPath('public/.htaccess')
			);
		}
	}

	conflicts() {
		this.log('conflicts? what conflicts?');
	}

	install() {
		this.log('installing dependencies...');
		let npmDevDeps = [];
		let npmDeps = [];
		let bowerDeps = [];

		if (answers.projectType === 'angular') {
			npmDevDeps.push('autoprefixer');
			npmDevDeps.push('connect-modrewrite');
			npmDevDeps.push('css-byebye');
			npmDevDeps.push('grunt');
			npmDevDeps.push('grunt-angular-templates');
			npmDevDeps.push('grunt-cache-bust');
			npmDevDeps.push('grunt-browser-sync');
			npmDevDeps.push('grunt-browserify');
			npmDevDeps.push('grunt-cli');
			npmDevDeps.push('grunt-contrib-clean');
			npmDevDeps.push('grunt-contrib-copy');
			npmDevDeps.push('grunt-contrib-jshint');
			npmDevDeps.push('grunt-contrib-uglify');
			npmDevDeps.push('grunt-contrib-watch');
			npmDevDeps.push('grunt-sass');
			npmDevDeps.push('grunt-html-build');
			npmDevDeps.push('grunt-notify');
			npmDevDeps.push('grunt-postcss');
			npmDevDeps.push('grunt-cssnano');
			npmDevDeps.push('grunt-tinypng');
			npmDevDeps.push('grunt-webfont');
			npmDevDeps.push('grunt-jsbeautifier');
			npmDevDeps.push('jit-grunt');
			npmDevDeps.push('jshint-stylish');
			npmDevDeps.push('load-grunt-config');
			npmDevDeps.push('postcss-alias');
			npmDevDeps.push('postcss-assets');
			npmDevDeps.push('postcss-center');
			npmDevDeps.push('postcss-size');
			npmDevDeps.push('postcss-sprites');
			npmDevDeps.push('postcss-svg');
			npmDevDeps.push('postcss-verthorz');
			npmDevDeps.push('postcss-vmin');
			npmDevDeps.push('serve-static');
			npmDevDeps.push('time-grunt');
			npmDevDeps.push('postcss-custom-selectors');

			npmDeps.push('modernizr');
			npmDeps.push('angular');
			npmDeps.push('angular-ui-router');
			npmDeps.push('angulartics');
			npmDeps.push('angulartics-google-analytics');

			if (answers.foundation) {
				npmDeps.push('foundation-sites');
			}
			if (answers.parse) {
				npmDeps.push('parse');
				npmDeps.push('angular-parse');
			}
			if (answers.hipsum) {
				npmDeps.push('angular-hipsum');
			}
		}

		if (answers.projectType === 'wordpress') {
			npmDevDeps.push('autoprefixer');
			npmDevDeps.push('bower');
			npmDevDeps.push('css-byebye');
			npmDevDeps.push('grunt');
			npmDevDeps.push('grunt-bower');
			npmDevDeps.push('grunt-browser-sync');
			npmDevDeps.push('grunt-cli');
			npmDevDeps.push('grunt-contrib-clean');
			npmDevDeps.push('grunt-contrib-copy');
			npmDevDeps.push('grunt-contrib-watch');
			npmDevDeps.push('grunt-notify');
			npmDevDeps.push('grunt-php');
			npmDevDeps.push('grunt-postcss');
			npmDevDeps.push('grunt-sass');
			npmDevDeps.push('grunt-shell');
			npmDevDeps.push('grunt-tinypng');
			npmDevDeps.push('grunt-webfont');
			npmDevDeps.push('jit-grunt');
			npmDevDeps.push('load-grunt-config');
			npmDevDeps.push('postcss-alias');
			npmDevDeps.push('postcss-assets');
			npmDevDeps.push('postcss-center');
			npmDevDeps.push('postcss-size');
			npmDevDeps.push('postcss-sprites');
			npmDevDeps.push('postcss-svg');
			npmDevDeps.push('postcss-verthorz');
			npmDevDeps.push('postcss-vmin');
			npmDevDeps.push('time-grunt');

			bowerDeps.push('modernizr#2.8.3');

			if (answers.foundation) {
				bowerDeps.push('foundation-sites');
			}
		}

		this.npmInstall(npmDeps, {
			'save': true
		});
		this.npmInstall(npmDevDeps, {
			'saveDev': true
		});

		if(answers.projectType === 'wordpress'){
			this.bowerInstall(bowerDeps, {
				'save': true
			});
		}
	}

	end() {
		this.log(chalk.green('The End, All done!'));
	}
};
