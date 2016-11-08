angular.module('<%= appName %>')
	.controller('KitchensinkController', ['$scope',function($scope) {
		'use strict';

		var self = this;
		self.hello = 'hello';

		$scope.addClass = function addClass(className,$event){
      $('.kitchensink').toggleClass(className);
		};

	}]);
