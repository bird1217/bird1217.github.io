﻿angular.module('ionicApp', ['ionic'])

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

});
