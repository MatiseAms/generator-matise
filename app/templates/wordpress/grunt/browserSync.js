module.exports = {
	dev: {
		options: {
			files: [
				'public/content/themes/**/*.*'
			],
			proxy: 'localhost.<%= appName %>.com',
			watchTask: true
		}
	}
};
