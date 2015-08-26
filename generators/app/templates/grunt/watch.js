module.exports = {
	options: {
		spawn: false
	},
	scripts: {
		options: {
			livereload: true
		},
		files: [
			'<%= config.src.app %>**/*.js'
		],
		tasks: [
			'jshint:src',
			'concat:scripts',
			'ngtemplates:dev'
		]
	},
	html: {
		options: {
			livereload: true
		},
		files: '<%= config.src.app %>*.html',
		tasks: [
			'copy:html',
			'htmlbuild:dev'
		]
	},
	htmlPartials: {
		options: {
			livereload: true
		},
		files: [
			'<%= config.src.app %>**/*.html',
			'!<%= config.src.app %>*.html'
		],
		tasks: [
			'concat:scripts',
			'ngtemplates:dev'
		]
	},
	images: {
		files: '<%= config.src.app %>img/*',
		tasks: ['copy:images'],
		options: {
			livereload: true
		}
	},
	fonts: {
		files: '<%= config.src.app %>fonts/*',
		tasks: ['copy:fonts'],
		options: {
			livereload: true
		}
	},
	scss: {
		files:  [
			'<%= config.src.app %>scss/*',
			'<%= config.src.app %>scss/**/*'
		],
		tasks: ['sass','postcss'],
		options: {
			livereload: true
		}
	}
};
