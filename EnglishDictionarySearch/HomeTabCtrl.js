angular.module('ionicApp')
	.directive('selectOnClick', function () {
    // Linker function
    return function (scope, element, attrs) {
      element.bind('click', function () {
        this.select();
      });
    };
  });

angular.module('ionicApp')
	.controller('HomeTabCtrl', function($scope) {
			
		$scope.Model={};	
		$scope.Model.txtEnglish = '';
		$scope.SearchDictionary = function(){
			var searchText=$scope.Model.txtEnglish;
			if(searchText=='')
			{
				return;
			}						
			searchText=searchText.toLowerCase();
			
			var history={"Text":searchText,"Time":new Date()};
			$scope.DictionaryHistory.splice(0, 0, history);
			angular.forEach($scope.DictionarySelect, function(item, index) {				
				if(item["checked"]==true)
				{
					var dictionaryType=item["DisplayText"];
					if(dictionaryType=='Collins' || dictionaryType=='Oxford Learner')
					{
						searchText=searchText.replace(/\ /g,'-');
					}
					if(dictionaryType=='Thesaurus[同義字]' )
					{
						searchText=searchText.replace(/\ /g,'%20');
					}
					var uri=item["Url"]+searchText;
					console.log(uri);
					window.open(uri);
				}
			}, searchText);
						
		};
		$scope.ClearHistory = function(){
			$scope.DictionaryHistory=[];						
		};
		
		$scope.SearchHistory = function(item){
			var historyText=item["Text"];					
			$scope.Model.txtEnglish=historyText;
		};
 	
		$scope.keyPressed = function(keyEvent) {   
			//代碼為enter鍵輸入
			if(keyEvent.keyCode ==13)
			{
			  console.log(keyEvent.keyCode);
			  console.log($scope.Model.txtEnglish);			  
			  $scope.SearchDictionary();
			}			
		  };

	
		$scope.DictionarySelect=[{"DisplayText":"Collins","Url":"https://www.collinsdictionary.com/dictionary/english/","checked":true}
							,{"DisplayText":"Oxford Learner","Url":"http://www.oxfordlearnersdictionaries.com/definition/english/","checked":true}
							,{"DisplayText":"Oxford","Url":"https://en.oxforddictionaries.com/definition/us/","checked":true}
							,{"DisplayText":"Thesaurus[同義字]","Url":"http://www.thesaurus.com/browse/","checked":true}];
		
		$scope.DictionaryHistory=[];
		
	console.log('HomeTabCtrl');
});
