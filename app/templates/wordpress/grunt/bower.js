module.exports = {
	dev: {
		dest: '<%= config.themesrc.vendor %>',
		options: {
			keepExpandedHierarchy: false,
			ignorePackages: [
				'what-input'
			],
			packageSpecific: {
				'foundation-sites': {
					dest: '<%= config.themesrc.vendor %>/foundation',
					stripGlobBase: true,
					keepExpandedHierarchy: true,
					files: [
						"**/*.scss"
					]
				},
				'jquery': {
					files: [
						'dist/jquery.js'
					]
				},
				'modernizr': {
					files: [
						'modernizr.js'
					]
				},
				'slick-carousel': {
					files: [
						'slick/slick.js'
					]
				}
			}
		}
	}
};
