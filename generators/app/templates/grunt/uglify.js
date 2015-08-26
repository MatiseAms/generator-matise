module.exports = {
	demo: {
		files: [{
			'<%= config.dist.root %><?= appName ?>.js': ['<%= config.dist.root %><?= appName ?>.js'],
			'<%= config.dist.root %>vendor.js': ['<%= config.dist.root %>vendor.js']
		}]
	}
};
