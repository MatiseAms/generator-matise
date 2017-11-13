module.exports = {
	images: {
		files: [{
			expand: true,
			cwd: '<%= config.themesrc.root %>img/',
			src: [
				'*.jpg',
				'*.jpeg',
				'*.png',
				'*.gif',
				'*.svg',
				'*.ico'
			],
			dest: '<%= config.themedist.root %>img/'
		}]
	},
	fonts: {
		files: [{
			expand: true,
			cwd: '<%= config.themesrc.root %>fonts/',
			src: [
				'*.eot',
				'*.ttf',
				'*.otf',
				'*.svg',
				'*.woff'
			],
			dest: '<%= config.themedist.root %>fonts/'
		}]
	},
	vendor: {
		files: [{
			expand: true,
			cwd: '<%= config.themesrc.root %>vendor/',
			src: [
				'*.js'
			],
			dest: '<%= config.themedist.root %>vendor/'
		}]
	},
	theme: {
		files: [{
			expand: true,
			cwd: '<%= config.themesrc.root %>',
			src: [
				'**/*',
				'!scss/**',
				'!vendor/**',
				'!fonts/**',
				'!img/**',
				'!js/**'
			],
			dest: '<%= config.themedist.root %>'
		}]
	},
	php: {
		files: [{
			expand: true,
			cwd: '<%= config.themesrc.root %>',
			src: [
				'**/*.php'
			],
			dest: '<%= config.themedist.root %>'
		}]
	},
	js: {
		files: [{
			expand: true,
			cwd: '<%= config.themedist.browserify %>',
			src: [
				'app.js'
			],
			dest: '<%= config.themedist.root %>js/'
		}]
	},
	config_dev: {
		files: [{
			expand: true,
			cwd: '<%= config.wpconfig.src %>dev/',
			src: [
				'.htaccess',
				'**/*'
			],
			dest: '<%= config.wpconfig.dist %>'
		}]
	},
	config_staging: {
		files: [{
			expand: true,
			cwd: '<%= config.wpconfig.src %>staging/',
			src: [
				'.htaccess',
				'**/*'
			],
			dest: '<%= config.wpconfig.dist %>'
		}]
	},
	config_live: {
		files: [{
			expand: true,
			cwd: '<%= config.wpconfig.src %>dist/',
			src: [
				'.htaccess',
				'**/*'
			],
			dest: '<%= config.wpconfig.dist %>'
		}]
	}
};
