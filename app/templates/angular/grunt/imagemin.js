module.exports = {
	minify: {
		options: {
      svgoPlugins: [{removeViewBox: false}]
    },
		files: [{
			expand: true,
			cwd: '<%= config.src.app %>img',
			src: ['**/*.{png,jpg,gif,svg}'],
			dest: '<%= config.src.app %>imgimg',
		}]
  }
};
