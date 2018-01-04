module.exports = {
	minify: {
		options: {
      svgoPlugins: [{removeViewBox: false}]
    },
		files: [{
			expand: true,
			cwd: '<%= config.themesrc.root %>img',
			src: ['**/*.{png,jpg,gif,svg}'],
			dest: '<%= config.themesrc.root %>img',
		}]
  }
};
