
angular.module('ionicApp', ['ionic'])

  .config(function ($stateProvider, $urlRouterProvider) {

    var settings = {
      name: 'signin',
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    };

     var tabs = {
       name: 'tabs',
       url: '/tab',
       abstract: true,
       templateUrl: 'templates/tabs.html'
     };

    var tabHome = {
      name: 'tabs.home',
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'templates/home.html',
          controller: 'HomeTabCtrl'
        }
      }
    };



    var fact =
      {
        name: 'tabs.facts',
        url: '/facts',
        views: {
          'home-tab': {
            templateUrl: 'templates/facts.html',
            controller: 'HomeTabCtrl'
          }
        }
      };


    var fact2 =
      {
        name: 'tabs.facts2',
        url: '/facts2',
        views: {
          'home-tab': {
            templateUrl: 'templates/facts2.html'
          }
        }
      };


    var about =
      {
        name: 'tabs.about',
        url: '/about',
        views: {
          'about-tab': {
            templateUrl: 'templates/about.html'
          }
        }
      };


    var navstack =
      {
        name: 'tabs.navstack',
        url: '/navstack',
        views: {
          'about-tab': {
            templateUrl: 'templates/nav-stack.html'
          }
        }
      };



    $stateProvider
      .state(settings)
      .state(tabs)
      .state(tabHome)
      .state(fact2)
      .state(about)
      .state(navstack);


    $urlRouterProvider.otherwise('/sign-in');
  })

  .controller('SignInCtrl', function ($scope, $state) {

    $scope.signIn = function (user) {
      console.log('Sign-In', user);
      $state.go('tabs.home');
    };

    $scope.activeTemplate = 'content.html';

  })

  .controller('HomeTabCtrl', function ($scope) {
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
