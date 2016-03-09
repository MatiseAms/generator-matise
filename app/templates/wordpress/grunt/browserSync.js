module.exports = {
	dev: {
		options: {
			files: [
				'public/content/themes/**/*.*'
			],
			proxy: '<%= appName %>.dev',
			watchTask: true
		}
	}
};
