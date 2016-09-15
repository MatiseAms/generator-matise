module.exports = {
	options: {
		apiKey: "<%= tinyPNGKey %>",
		checkSigs: true,
		sigFile: 'grunt/tinypng_file_sigs.json',
		sigFileSpace: 2,
		summarize: true,
		showProgress: false,
		stopOnImageError: false
	},
	compressPNG: {
		expand: true,
		src: ['<%= config.themesrc.root %>img/**/*.png', '<%= config.themesrc.root %>img/**/*.jpg'],
		dest: ''
	}
};
