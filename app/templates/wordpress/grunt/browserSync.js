module.exports = {
	dev: {
		options: {
			files: [
				'public/content/themes/**/*.*'
			],
			proxy: '<%= appName %>.matise',
			watchTask: true
		}
	}
};
