module.exports = {
	options: {
		spawn: false
	},
	scss: {
		files: '<%= config.themesrc.root %>scss/*',
		tasks: ['sass', 'postcss']
	},
	images: {
		files: '<%= config.themesrc.root %>img/*',
		tasks: ['copy:images']
	},
	fonts: {
		files: '<%= config.themesrc.root %>fonts/*',
		tasks: ['copy:fonts']
	},
	theme: {
		files: [
			'<%= config.themesrc.root %>**/*',
			'!<%= config.themesrc.root %>scss/*',
			'!<%= config.themesrc.root %>fonts/*',
			'!<%= config.themesrc.root %>img/*'
		],
		tasks: ['copy:theme']
	}
};
