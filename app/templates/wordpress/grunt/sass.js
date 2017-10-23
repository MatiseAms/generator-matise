module.exports = {
	dist: {
		options: {
			<? if (foundationInclude) { ?>
			includePaths: ['node_modules/foundation-sites','node_modules/matise-stack','node_modules/matise-grid'],
			<? } else { ?>
			includePaths: ['node_modules/matise-stack','node_modules/matise-grid'],
			<? } ?>
			sourcemap: false
		},
		files: {
			'<%= config.themedist.root %>css/app.css': '<%= config.themesrc.root %>scss/app.scss'
		},
	}
};
