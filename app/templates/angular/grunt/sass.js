module.exports = {
	dev: {
		options: {
			<? if (foundationInclude) { ?>
			includePaths: ['node_modules/foundation-sites','node_modules/matise-stack','node_modules/matise-grid'],
			<? } else { ?>
			includePaths: ['node_modules/matise-stack','node_modules/matise-grid'],
			<? } ?>
			sourceMap: true
		},
		files: {
			'<%= config.dist.root %>css/app.css': '<%= config.src.app %>scss/app.scss'
		},
	},
	dist: {
		options: {
			<? if (foundationInclude) { ?>
			includePaths: ['node_modules/foundation-sites','node_modules/matise-stack','node_modules/matise-grid'],
			<? } else { ?>
			includePaths: ['node_modules/matise-stack','node_modules/matise-grid'],
			<? } ?>
			sourceMap: false,
			omitSourceMapUrl: true
		},
		files: {
			'<%= config.dist.root %>css/app.css': '<%= config.src.app %>scss/app.scss'
		},
	}
};
