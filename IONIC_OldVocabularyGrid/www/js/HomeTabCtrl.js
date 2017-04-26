angular.module('ionicApp')
	.controller('HomeTabCtrl', function ($scope, TodosService) {

		$scope.nextDictionary = function () {
			$scope["SearchModel"]["Text"] = '';
			//angular.element(document.querySelector('#modelText').focus()); 

			setTimeout(function ()
			{ document.querySelector('#modelText').focus(); }
				, 20
			);
		};

		$scope.checkCondition = function () {
			return 'tabs.home3({todoId: data.number})';
		};

		$scope.checkCondition = function (transFerData) {
			if (transFerData["number"] % 2 == 0)
				return 'tabs.home2({todoId: data.number})';
			else
				return 'tabs.home3({todoId: data.number})';
		};

		$scope.vocabulary2 = [{ "number": 1, "eg": "are", "ch": "be動詞", "txtEnglish": "", "txtChinese": "", "randomFlag": false }];
		$scope.vocabulary = TodosService.getTodos();

		$scope.randomStart = 1;
		$scope.randomEnd = 150;

		$scope.chooseIndex = [1];
		$scope.finishFlag = false;

		console.log('HomeTabCtrl');
		$scope.displaySetting = 'eg';

		$scope.SearchModel = { "Text": "", "Enable": false };
	});





