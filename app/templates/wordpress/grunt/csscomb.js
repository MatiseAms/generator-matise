module.exports = {
  options: {
		config: 'grunt/config/csscomb.json',
  },
	dynamic_mappings: {
		expand: true,
		cwd: '<%= config.src.app %>scss/',
		src: ['**/*.scss', '!*.resorted.css'],
		dest: '<%= config.src.app %>scss/',
	}
};
