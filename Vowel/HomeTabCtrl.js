angular.module('ionicApp')
	.controller('HomeTabCtrl', function($scope) {
	
	var getRandomInt=function(min, max){
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		};

	var chooseDictionary=function (){
		    var randomIndex=getRandomInt($scope.randomStart,$scope.randomEnd);
		    while($scope.chooseIndex.indexOf(randomIndex)!=-1)
		    {
		    	  randomIndex=getRandomInt($scope.randomStart,$scope.randomEnd);
		    }
		    $scope.chooseIndex.push(randomIndex);
		    
		    var randomTitle =  $scope.vocabulary.filter(function(item) {
		    	return item.number == randomIndex
				});
		    randomTitle[0]["randomFlag"]=true;
		    
		    var currentTitle =  $scope.vocabulary.filter(function(item) {
		    	return item.number == $scope.vocabulary2[0]["number"];
				});
		    
		    if(currentTitle.length>0)
		    {
		    	currentTitle[0]["randomFlag"]=true;
		    }
		    
		    if(randomTitle.length==0)
		    {
		    	return undefined;
		    }
		    else
		    {
		    	return randomTitle[0];
		    }
		};

		
		var initDictionary=function (){
		    var randomIndex=getRandomInt($scope.randomStart,$scope.randomEnd);
		    
		    $scope.chooseIndex.push(randomIndex);
		    
		    var randomTitle =  $scope.vocabulary.filter(function(item) {
		    	return item.number == randomIndex
				});
		    randomTitle[0]["randomFlag"]=true;
		    
		    $scope.vocabulary2.push(randomTitle[0]);
		    
		    
		};
		
	$scope.nextDictionary = function(){
		    var randomDictionary = chooseDictionary();	
		    if(randomDictionary!=undefined){
		    	//$scope.title2=randomTitle[0];
		    	$scope.vocabulary2=[];
		    	$scope.vocabulary2.push(randomDictionary);
		    	$scope.showEnglish=false; 
			    var exist =  $scope.vocabulary.filter(function(item) {
			       return item["randomFlag"] == false;
			    });
			      
			    setTimeout(function(){ 
			    	angular.element(document.querySelector('#txtEnglish').focus()); 
				}, 1);		  
				if(exist.length==0){
				$scope.finishFlag=true;
				}
		    }else{
		    	alert('undefine');
		    }
	   	};

 	
	$scope.vocabulary2=[];
	$scope.vocabulary = [{"number":1,"eg":"a","ch":"be動詞","txtEnglish":"","txtChinese":"","randomFlag":false}
,{"number":2,"eg":"e","ch":"be動詞","txtEnglish":"","txtChinese":"","randomFlag":false}
,{"number":3,"eg":"i","ch":"be動詞","txtEnglish":"","txtChinese":"","randomFlag":false}
,{"number":4,"eg":"o","ch":"be動詞","txtEnglish":"","txtChinese":"","randomFlag":false}
,{"number":5,"eg":"u","ch":"任何","txtEnglish":"","txtChinese":"","randomFlag":false}
,{"number":6,"eg":"y","ch":"任何","txtEnglish":"","txtChinese":"","randomFlag":false}
,{"number":7,"eg":"a","ch":"be動詞","txtEnglish":"","txtChinese":"","randomFlag":false}
,{"number":8,"eg":"e","ch":"be動詞","txtEnglish":"","txtChinese":"","randomFlag":false}
,{"number":9,"eg":"i","ch":"be動詞","txtEnglish":"","txtChinese":"","randomFlag":false}
,{"number":10,"eg":"o","ch":"be動詞","txtEnglish":"","txtChinese":"","randomFlag":false}
,{"number":11,"eg":"u","ch":"任何","txtEnglish":"","txtChinese":"","randomFlag":false}
,{"number":12,"eg":"y","ch":"任何","txtEnglish":"","txtChinese":"","randomFlag":false}
		];
	
	$scope.randomStart=1;
	$scope.randomEnd=12;
	
	$scope.chooseIndex=[];
	$scope.finishFlag=false;	
	
	console.log('HomeTabCtrl');
	$scope.displaySetting='eg';
	initDictionary();
	//$scope.nextDictionary();
	
})
;
