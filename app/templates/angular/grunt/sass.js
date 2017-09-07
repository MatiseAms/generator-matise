module.exports = {
	dev: {
		options: {
			includePaths: ['node_modules/foundation-sites'],
			sourceMap: true
		},
		files: {
			'<%= config.dist.root %>css/app.css': '<%= config.src.app %>scss/app.scss'
		},
	},
	dist: {
		options: {
			includePaths: ['node_modules/foundation-sites'],
			sourceMap: false
		},
		files: {
			'<%= config.dist.root %>css/app.css': '<%= config.src.app %>scss/app.scss'
		},
	}
};
