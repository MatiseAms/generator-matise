module.exports = {
	options: {
		map: true,
		verbose: true,
		processors: [
			require('postcss-assets')({ loadPaths: ['./content/themes/<?= appName ?>/img/'] }),
			require('autoprefixer-core')({ browsers: ['last 2 versions'] }),
// 			require('postcss-sprites')({stylesheetPath: './content/themes/tourismvictoria/css', spritePath: './content/themes/tourismvictoria/img/sprite.png', retina: true}),
			require('postcss-svg')({ paths: ['content/themes/<?= appName ?>/img/svg/'] }),
			require('postcss-size')({}),
			require('postcss-alias')({}),
			require('postcss-center')({}),
			//require('postcss-verthorz')({}), ERROR!!!
			require('postcss-vmin')({}),
			require('css-byebye')({ rulesToRemove: [''], map: false })
		]
	},
	dist: { src: '<%= config.themedist.root %>css/app.css' }
};
