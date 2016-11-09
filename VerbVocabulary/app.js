angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })    
	.state('tabs.verb1', {
		  url: "/verb1",
		  views: {
			'verb1-tab': {
			  templateUrl: function (stateParams){			
				return "templates/verb1.html";
			  },		  
			  controller: 'verb1Ctrl'
			}
		  }
		})
		.state('tabs.verb2', {
		  url: "/verb2",
		  views: {
			'verb2-tab': {
			  templateUrl: function (stateParams){			
				return "templates/verb2.html";
			  },		  
			  controller: 'verb2Ctrl'
			}
		  }
		})
    
	
    

   $urlRouterProvider.otherwise("/tab/verb1");
});



