module.exports = {
	options: {
		spawn: false
	},
	scripts: {
		files: [
			'<%= config.dist.browserify %><?= appName ?>.js'
		],
		tasks: [
			'copy:jsmodule',
			'ngtemplates:dev'
		]
	},
	html: {
		files: '<%= config.src.app %>*.html',
		tasks: [
			'copy:html',
			'htmlbuild:dev'
		]
	},
	htmlPartials: {
		files: [
			'<%= config.src.app %>**/*.html',
			'!<%= config.src.app %>*.html'
		],
		tasks: [
			'ngtemplates:dev'
		]
	},
	images: {
		files: '<%= config.src.app %>img/*',
		tasks: ['copy:images']
	},
	fonts: {
		files: '<%= config.src.app %>fonts/*',
		tasks: ['copy:fonts']
	},
	scss: {
		files: [
			'<%= config.src.app %>scss/*',
			'<%= config.src.app %>scss/**/*'
		],
		tasks: ['sass', 'postcss']
	}
};
