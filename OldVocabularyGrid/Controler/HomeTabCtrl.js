angular.module('ionicApp')
	.controller('HomeTabCtrl', function($scope,TodosService) {
		
	$scope.nextDictionary = function(){
		$scope["SearchModel"]["Text"]='';
		//angular.element(document.querySelector('#modelText').focus()); 
		
		setTimeout(function()
					{document.querySelector('#modelText').focus();}
					,20
		);
	};

 	
	$scope.vocabulary2=[{"number":1,"eg":"are","ch":"be動詞","txtEnglish":"","txtChinese":"","randomFlag":false}];
	$scope.vocabulary = TodosService.getTodos();
	
	$scope.randomStart=1;
	$scope.randomEnd=150;
	
	$scope.chooseIndex=[1];
	$scope.finishFlag=false;	
	
	console.log('HomeTabCtrl');
	$scope.displaySetting='eg';
	
	$scope.SearchModel={"Text":"","Enable":false};
});



	
	
	