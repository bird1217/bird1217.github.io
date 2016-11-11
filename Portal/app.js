angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('signin', {
      url: '/sign-in',
      //templateUrl: 'sign-in.html',
      template: '<ion-view view-title="Sign-In"><ion-content><div class="list"><label class="item item-input"><span class="input-label">Username</span><input type="text" ng-model="user.username"></label><label class="item item-input"><span class="input-label">Password</span><input type="password" ng-model="user.password"></label></div><div class="padding"><button class="button button-block button-positive" ng-click="signIn(user)">Sign-In</button><p class="text-center"><a href="#/forgot-password">Forgot password</a></p></div></ion-content></ion-view>',
      controller: 'SignInCtrl'
    })
    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html'
    })
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'templates/home.html',
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.facts', {
      url: '/facts',
      views: {
        'home-tab': {
          templateUrl: 'templates/facts.html',
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.facts2', {
      url: '/facts2',
      views: {
        'home-tab': {
          templateUrl: 'templates/facts2.html'
        }
      }
    })
    .state('tabs.about', {
      url: '/about',
      views: {
        'about-tab': {
          templateUrl: 'templates/about.html'
        }
      }
    })
    .state('tabs.navstack', {
      url: '/navstack',
      views: {
        'about-tab': {
          templateUrl: 'templates/nav-stack.html'
        }
      }
    })
    ;


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


$scope.clientSideList = [
    { text: "Backbone", value: "bb" },
    { text: "工號", value: "ng" },
    { text: "中文姓名", value: "em" },
    { text: "英文姓名", value: "ko" },
    { text: "分機號碼", value: "bb2" }
  ];

  $scope.serverSideList = [
    { text: "Go", value: "go" },
    { text: "Python", value: "py" },
    { text: "Ruby", value: "rb" },
    { text: "Java", value: "jv" }
  ];
  
  $scope.data = {
    clientSide: 'bb'
  };
  
  


  
});
