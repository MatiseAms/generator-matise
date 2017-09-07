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
         '<%= config.src.app %>/fonts/*.otf',
         '<%= config.src.app %>/fonts/*.ttf'
       ],
       dest: '<%= config.src.app %>/fonts'
     }]
   };


  return config;
}

module.exports = convert();
