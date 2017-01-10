module.exports = {
	icons: {
		src: '<%= config.src.app %>icons/*.svg',
		dest: '<%= config.src.app %>fonts',
		destCss: '<%= config.src.app %>scss/icons',
		options: {
			stylesheet: 'scss',
			relativeFontPath: '',
			fontFilename: 'icons',
			types: 'eot,woff,ttf,svg',
			stylesheets: ['scss'],
			template: '<%= config.src.root %>app/icons/_templates/tmpl.css',
			htmlDemoTemplate: '<%= config.src.root %>app/icons/_templates/tmpl.html',
			templateOptions: {
				baseClass: 'icon',
				classPrefix: 'icon-'
			}
		}
	}
};
