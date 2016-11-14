angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
var signin = {name:'signin',url: '/sign-in',templateUrl: 'templates/sign-in.html',controller: 'SignInCtrl'};

var forgotpassword = {name:'forgotpassword',url: '/forgot-password',templateUrl: 'templates/forgot-password.html'};

var tabs = {name:'tabs',url: '/tab',templateUrl: 'templates/tabs.html',abstract: true};

var tabsHome = {name:'tabs.home',url: '/home',views: {'home-tab': {templateUrl: 'templates/home.html',controller: 'HomeTabCtrl'}}};

var tabsFact = { name: 'tabs.facts'
					, url: '/facts'
					, views: { 
							'home-tab': { 										
										templateUrl: function (stateParams){			
											alert('templates/facts.html')
											return "templates/facts.html";
										}
										, controller: 'FactCtrl' 
										} 
							 } 
				 };

//var tabsfacts2 = {name:'tabs.facts2',url: '/facts2',views: {'home-tab': {templateUrl: 'templates/facts2.html'}}};

var tabsabout = {name:'tabs.about',url: '/about',views: {'about-tab': {templateUrl: 'templates/about.html'}}};

var tabsnavstack = {name:'tabs.navstack',url: '/navstack',views: {'about-tab': {templateUrl: 'templates/nav-stack.html'}}};

$stateProvider
            .state(signin)
            .state(forgotpassword)
            .state(tabs)
			.state(tabsHome)
			.state(tabsFact)			
			.state(tabsabout)
			.state(tabsnavstack);
	 //.state(tabsfacts2)
  


   $urlRouterProvider.otherwise('/sign-in');

})

.controller('SignInCtrl', function($scope, $state) {
  
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('tabs.home');
  };
  
  			$scope.activeTemplate = 'content.html';

})

.controller('HomeTabCtrl', function($scope) {
	console.log('HomeTabCtrl');

	$scope.clientSideList = [{ text: "Backbone", value: "bb" },{ text: "工號", value: "ng" },{ text: "中文姓名", value: "em" },{ text: "英文姓名", value: "ko" },{ text: "分機號碼", value: "bb2" }];

	$scope.serverSideList = [{ text: "Go", value: "go" },{ text: "Python", value: "py" },{ text: "Ruby", value: "rb" },{ text: "Java", value: "jv" }];
  
	$scope.data = {clientSide: 'bb'};
})
.controller('FactCtrl', function($scope) {
	alert('FactCtrl');	
});
