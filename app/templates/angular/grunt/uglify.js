module.exports = {
	demo: {
		options: {
			compress: {
				drop_console: true
			},
			sourceMap: false,
			report: 'gzip',
			banner: '/*! Created by Matise | https://www.matise.nl | <%= grunt.template.today("yyyy-mm-dd") %> */'
		},
		files: [{
			'<%= config.dist.root %><?= appName ?>.js': ['<%= config.dist.root %><?= appName ?>.js']
		}]
	}
};
