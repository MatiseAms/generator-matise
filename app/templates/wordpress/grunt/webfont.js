module.exports = {
  icons: {
    src: '<%= config.themesrc.app %>icons/*.svg',
    dest: '<%= config.themesrc.app %>fonts',
    destCss: '<%= config.themesrc.app %>scss/icons',
    options: {
      stylesheet: 'scss',
      relativeFontPath: '',
      fontFilename: 'icons',
      types:'eot,woff,ttf,svg',
      stylesheets: ['scss'],
      template: '<%= config.themesrc.root %>icons/_templates/tmpl.css',
      htmlDemoTemplate: '<%= config.themesrc.root %>icons/_templates/tmpl.html',
      templateOptions: {
          baseClass: 'icon',
          classPrefix: 'icon-'
      }
    }
  }
};
