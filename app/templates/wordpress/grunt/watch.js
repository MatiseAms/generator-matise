module.exports = {
	options: {
		spawn: false
	},
	theme: {
		files: [
			'<%= config.themesrc.root %>**/*',
			'!<%= config.themesrc.root %>**/*.js',
			'!<%= config.themesrc.root %>**/*.php',
			'!<%= config.themesrc.root %>scss/**/*',
			'!<%= config.themesrc.root %>fonts/*',
			'!<%= config.themesrc.root %>img/*'
		],
		tasks: ['copy:theme']
	},
	scss: {
		files: '<%= config.themesrc.root %>scss/**/*',
		tasks: ['sass:dev', 'postcss:dev']
	},
	images: {
		files: '<%= config.themesrc.root %>img/**/*',
		tasks: ['copy:images']
	},
	fonts: {
		files: '<%= config.themesrc.root %>fonts/*',
		tasks: ['copy:fonts']
	},
	php: {
		files: [
			'<%= config.themesrc.root %>**/*.php'
		],
		tasks: ['copy:php']
	},
	js: {
		files: [
			'<%= config.themedist.browserify %>app.js'
		],
		tasks: ['copy:js']
	}
};
