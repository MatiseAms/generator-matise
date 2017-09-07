module.exports = {
	options: {
		watch: true
	},
	default: {
		src: [
			'<%= config.themesrc.root %>js/app.js'
		],
		dest: '<%= config.themedist.browserify %>app.js'
	}
};
