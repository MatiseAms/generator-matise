angular.module('<%= appName %>', [
		'ui.router',
		'angulartics',
		'angulartics.google.analytics',
		'ngHipsum'
	])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
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
			});

		// use the HTML5 History API
		$locationProvider.html5Mode(true);
	}])
	.run(['$rootScope', '$document', function($rootScope, $document) {
		'use strict';


		$document.on('keydown', function(e) {
			if (e.which === 8) {
				if (e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA') {
					e.preventDefault();
				}
			}
		});

		/* global $ */
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
			$('body')
				.removeClass('state-' + fromState.name)
				.addClass('state-' + toState.name);
			window.scrollTo(0, 0);
		});

	}]);
