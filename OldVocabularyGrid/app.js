angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: '/home',
      controller: 'HomeTabCtrl'
    })
	.state('tabs.home2', {
	  url: '/:todoId',
      templateUrl: 'templates/home2.html',
      controller: 'DetailTabCtrl',
	  resolve: {		  
		  todo: function($stateParams) {
			return $stateParams.todoId
		  }
	  }
    });
	   
   $urlRouterProvider.otherwise("/tab/home");
});



