module.exports = {
  options: {
    apiKey: "xMF2xazwBJWzAUPEhpk_dFunLksjZuUg",
    checkSigs: true,
    sigFile: 'grunt/tinypng_file_sigs.json',
    summarize: true,
    showProgress: false,
    stopOnImageError: false
  },
  compressPNG: {
    expand: true,
    src: ['<%= config.src.app %>img/**/*.png', '<%= config.src.app %>img/**/*.jpg'],
    dest: ''
  }
};
