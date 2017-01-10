module.exports = {
	dist: {
		options: {
			includePaths: ['node_modules/foundation-sites'],
			sourcemap: false
		},
		files: {
			'<%= config.dist.root %>css/app.css': '<%= config.src.app %>scss/app.scss'
		},
	}
};
