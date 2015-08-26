module.exports = {
	server: {
		options: {
			port: 1337,
			hostname: '*',
			base: [
				'<%= config.dist.root %>'
			],
			livereload: true,
			open: true,
			middleware: function(connect, options) {
				var serveStatic = require('serve-static');
				var optBase = (typeof options.base === 'string') ? [options.base] : options.base;
				return [require('connect-modrewrite')(['^[^\\.]*$ /index.html [L]'])].concat(
					optBase.map(function(path) {
						return serveStatic(path);
					})
				);
			}
		}
	}
};
