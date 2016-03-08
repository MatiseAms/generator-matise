module.exports = {
	dev: {
		options: {
			append: true,
			module: '<?= appName ?>'
		},
		cwd: '<%= config.src.app %>',
		src: [
			'**/*.html',
			'!*.html'
		],
		dest: '<%= config.dist.root %><?= appName ?>.js'
	},
	dist: {
		options: {
			append: true,
			module: '<?= appName ?>',
			htmlmin: {
				removeComments: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true
			}
		},
		cwd: '<%= config.src.app %>',
		src: [
			'**/*.html',
			'!*.html'
		],
		dest: '<%= config.dist.root %><?= appName ?>.js'
	}
};
