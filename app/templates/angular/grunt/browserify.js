module.exports = {
	options: {
		watch: true
	},
	default: {
		src: [
			'<%= config.src.app %><?= appName ?>.js'
		],
		dest: '<%= config.dist.browserify %><?= appName ?>.js'
	}
};
