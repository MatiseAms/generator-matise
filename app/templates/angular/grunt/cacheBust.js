module.exports = {
	options: {
		assets: ['*', 'css/*'],
		createCopies: false,
		length: 6,
		queryString: true,
		baseDir: '<%= config.dist.root %>',
		outputDir: '<%= config.dist.root %>'
	},
	default: {
		files: [{
			expand: true,
			cwd: '<%= config.dist.root %>',
			src: ['index.html']
		}]
	}
};
