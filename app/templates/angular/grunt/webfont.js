var grunt = require('grunt');


function config() {
  var allConfigs = {};
  var fonts = [];
	grunt.file.expand('./src/app/icons/*').forEach(function(dirFull, index) {
    var dirArray = dirFull.split('/');
    var dir = dirArray[dirArray.length-1];
    if(dir.charAt(0) !== '_'){
      fonts.push(dir);
      allConfigs[dir] = {
    		src: dirFull+'/*.svg',
    		dest: '<%= config.src.app %>fonts',
    		destCss: '<%= config.src.app %>scss/icons/'+dir,
    		options: {
    			stylesheet: 'scss',
    			relativeFontPath: '',
    			fontFilename: dir,
          startCodepoint: parseInt("0x"+String.fromCharCode(97 + index) + "1001"),
    			types: 'eot,woff,ttf,svg',
    			stylesheets: ['scss'],
    			template: '<%= config.src.root %>app/icons/_templates/iconFile.css',
    			htmlDemoTemplate: '<%= config.src.root %>app/icons/_templates/iconList.html',
    			templateOptions: {
    				baseClass: dir,
    				classPrefix: dir+'-'
    			}
    		}
    	};
    }
	});
  importFile(fonts);
	return allConfigs;
}
function importFile(fonts){
  // grunt.log.write(fonts);
  var options = {
    template: './src/app/icons/_templates/importFile.css',
    dest: './src/app/scss/icons/icons.scss',
    src: 'icons/',
    templateOptions: {
      fonts: fonts,
      test: 'testje'
    }
  };
  var imports = grunt.template.process(grunt.file.read(options.template),{data: options.templateOptions});
  grunt.file.write(options.dest,imports);
}

module.exports = config();
