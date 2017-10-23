module.exports = {
	dev: {
		options: {
			includePaths: ['node_modules/matise-stack','node_modules/matise-grid'],
			sourceMap: true
		},
		files: {
			'<%= config.dist.root %>css/app.css': '<%= config.src.app %>scss/app.scss'
		},
	},
	dist: {
		options: {
			includePaths: ['node_modules/matise-stack','node_modules/matise-grid'],
			sourceMap: false
		},
		files: {
			'<%= config.dist.root %>css/app.css': '<%= config.src.app %>scss/app.scss'
		},
	}
};
