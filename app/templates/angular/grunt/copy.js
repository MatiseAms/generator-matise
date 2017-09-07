module.exports = {
	html: {
		files: [{
			expand: true,
			cwd: '<%= config.src.app %>',
			src: [
				'*.html',
				'.htaccess'
			],
			dest: '<%= config.dist.root %>'
		}]
	},
	images: {
		files: [{
			expand: true,
			cwd: '<%= config.src.app %>img/',
			src: [
				'*.jpg',
				'*.jpeg',
				'*.png',
				'*.gif',
				'*.svg',
				'*.ico'
			],
			dest: '<%= config.dist.root %>img/'
		}]
	},
	fonts: {
		files: [{
			expand: true,
			cwd: '<%= config.src.app %>fonts/',
			src: [
				'*.eot',
				'*.ttf',
				'*.otf',
				'*.svg',
				'*.woff'
			],
			dest: '<%= config.dist.root %>fonts/'
		}]
	},
	jsmodule: {
		files: [{
			expand: true,
			cwd: '<%= config.dist.browserify %>',
			src: [
				'*.js',
				'!*.min.js',
				'*/*.js'
			],
			dest: '<%= config.dist.root %>'
		}]
	}
};
