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
      templateUrl: 'templates/home.html',
      controller: 'HomeTabCtrl'
    })
	.state('tabs.home2', {
      url: '/home2/:parentId',
      templateUrl: 'templates/home2.html',
      controller: 'DetailTabCtrl',
	  resolve: {		  
		  
	  }
    });
	
    
	//.state('tabs.home', {
    //  url: "/home",
    //  views: {
    //    'home-tab': {
	//	  templateUrl: function (stateParams){			
	//		return "templates/home.html";
	//	  },		  
    //      controller: 'HomeTabCtrl'
    //    }
    //  }
    //})
    

   $urlRouterProvider.otherwise("/tab/home");
});



