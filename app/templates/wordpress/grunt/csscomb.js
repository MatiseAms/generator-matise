module.exports = {
  options: {
		config: 'grunt/config/csscomb.json',
  },
	dynamic_mappings: {
		expand: true,
		cwd: '<%= config.themesrc.root %>scss/',
		src: ['**/*.scss', '!*.resorted.css'],
		dest: '<%= config.themesrc.root %>scss/app.scss',
	}
};
