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
				'!img/**'
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
			cwd: '<%= config.themesrc.root %>',
			src: [
				'**/*.js'
			],
			dest: '<%= config.themedist.root %>'
		}]
	},
	config_dev: {
		files: [{
			expand: true,
			cwd: '<%= config.wpconfig.src %>dev/',
			src: [
				'**/*',
			],
			dest: '<%= config.wpconfig.dist %>'
		}]
	},
	config_staging: {
		files: [{
			expand: true,
			cwd: '<%= config.wpconfig.src %>staging/',
			src: [
				'**/*',
			],
			dest: '<%= config.wpconfig.dist %>'
		}]
	},
	config_live: {
		files: [{
			expand: true,
			cwd: '<%= config.wpconfig.src %>dist/',
			src: [
				'**/*',
			],
			dest: '<%= config.wpconfig.dist %>'
		}]
	}
};
