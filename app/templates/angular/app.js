// require('modernizr');

var angular = require('angular');

require('@uirouter/angularjs');
require('angulartics');
<%- requires %>

var app = angular.module('<%= appName %>', [
	'ui.router',
	'<%- ngModules %>',
	require('angulartics-google-analytics')
]);

require('./components');
require('./controllers');

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	'$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		'use strict';

		// For any unmatched url, redirect to /state1
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('root', {
				'abstract': true,
				views: {
					header: {
						templateUrl: 'sections/root/header.html',
						controller: 'HeaderController as headerCtrl'
					},
					content: {
						template: '<main ui-view></main>'
					},
					footer: {
						templateUrl: 'sections/root/footer.html',
						controller: 'FooterController as footerCtrl'
					}
				}
			})
			.state('home', {
				url: '/',
				parent: 'root',
				templateUrl: 'sections/home/home.html',
				controller: 'HomeController as homeCtrl'
<<<<<<< HEAD
			})
			.state('about', {
				url: '/about',
				parent: 'root',
				views: {
					'': {
						templateUrl: 'sections/about/about.html',
						controller: 'AboutController as aboutCtrl'
					},
					'top@about': {
						templateUrl: 'sections/about/top.html',
						controller: 'TopController as topCtrl'
					},
					'middle@about': {
						templateUrl: 'sections/about/middle.html',
						controller: 'MiddleController as middleCtrl'
					},
					'bottom@about': {
						templateUrl: 'sections/about/bottom.html',
						controller: 'BottomController as bottomCtrl'
					}
				}
			})
			.state('kitchensink', {
				url: '/kitchensink',
				parent: 'root',
				templateUrl: 'sections/kitchensink/kitchensink.html',
				controller: 'KitchensinkController as kitchensinkCtrl'
=======
>>>>>>> master
			});

		// use the HTML5 History API
		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	}
]);

app.run([
	'$rootScope',
	'$document',
	function($rootScope, $document) {
		'use strict';

		$document.on('keydown', function(e) {
			if (e.which === 8) {
				if (e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA') {
					e.preventDefault();
				}
			}
		});
	}
]);
