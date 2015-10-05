module.exports = {
	dist: {
		options: {
			style: 'expanded',
			loadPath: ['<%= config.src.vendor %>foundation/scss/']
		},
		files: {
			'<%= config.dist.root %>css/app.css': '<%= config.src.app %>scss/app.scss'
		},

	}
};
