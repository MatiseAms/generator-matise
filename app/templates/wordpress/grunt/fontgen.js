function convert(){

  var config = {};


  config.options = {
     options: {
       // Task-specific options go here.
     },
   };
  config.all = {
    //  options: {
    //    path_prefix: '<%= config.src.app %>/fonts/',
    //    stylesheet: 'css/fonts.css',
    //  },
     files: [{
       src: [
         '<%= config.themesrc.app %>/fonts/*.otf',
         '<%= config.themesrc.app %>/fonts/*.ttf'
       ],
       dest: '<%= config.themesrc.app %>/fonts'
     }]
   };


  return config;
}

module.exports = convert();
