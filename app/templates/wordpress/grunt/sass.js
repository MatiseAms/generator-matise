module.exports = {
	dist: {
		options: {
			includePaths: ['<%= config.themesrc.vendor %>','node_modules/matise-stack','node_modules/matise-grid'],
			sourcemap: false
		},
		files: {
			'<%= config.themedist.root %>css/app.css': '<%= config.themesrc.root %>scss/app.scss'
		},
	}
};
