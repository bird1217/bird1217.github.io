angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          //templateUrl: "templates/home.html"
		  templateUrl: function (stateParams){			
			return "templates/home.html";
		  },		  
          controller: 'HomeTabCtrl'
        }
      }
    });
	
    
	
    

   $urlRouterProvider.otherwise("/tab/home");
});



