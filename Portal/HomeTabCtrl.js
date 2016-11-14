angular.module('ionicApp')
	.controller('HomeTabCtrl', function($scope) {

	console.log('HomeTabCtrl');

	$scope.clientSideList = [{ text: "Backbone", value: "bb" },{ text: "工號", value: "ng" },{ text: "中文姓名", value: "em" },{ text: "英文姓名", value: "ko" },{ text: "分機號碼", value: "bb2" }];

	$scope.serverSideList = [{ text: "Go", value: "go" },{ text: "Python", value: "py" },{ text: "Ruby", value: "rb" },{ text: "Java", value: "jv" }];
  
	$scope.data = {clientSide: 'bb'};
    
});