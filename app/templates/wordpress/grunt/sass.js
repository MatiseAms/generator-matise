module.exports = {
	dist: {
		options: {
			includePaths: ['<%= config.themesrc.vendor %>'],
			sourcemap: false
		},
		files: {
			'<%= config.themedist.root %>css/app.css': '<%= config.themesrc.root %>scss/app.scss'
		},
	}
};
