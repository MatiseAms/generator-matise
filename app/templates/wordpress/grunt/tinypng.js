module.exports = {
  options: {
    apiKey: "<%= tinyPNGKey %>",
    checkSigs: true,
    sigFile: 'grunt/tinypng_file_sigs.json',
    summarize: true,
    showProgress: false,
    stopOnImageError: false
  },
  compressPNG: {
    expand: true,
    src: ['<%= config.themedist.root %>img/**/*.png', '<%= config.themedist.root %>img/**/*.jpg'],
    dest: ''
  }
};
