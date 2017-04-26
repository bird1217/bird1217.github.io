angular
	.module('ionicApp')
	.controller('DetailTabCtrl', function($scope, todo,TodosService) {		
		$scope.title="Detail word";		
		$scope.vocabulary2 =  TodosService.getById(todo);
		console.log($scope.vocabulary2);
	});