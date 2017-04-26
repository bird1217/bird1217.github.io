angular.module('ionicApp', ['ionic'])

  .config(function ($stateProvider, $urlRouterProvider) {

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
        url: '/:todoId',
        templateUrl: 'templates/home2.html',
        controller: 'DetailTabCtrl',
        resolve: {
          todo: function ($stateParams) {
            return $stateParams.todoId
          }
        }
      })
      .state('tabs.home3', {
        url: '/:todoId',
        templateUrl: 'templates/home3.html',
        controller: 'DetailTabCtrl',
        resolve: {
          todo: function ($stateParams) {
            return $stateParams.todoId
          }
        }
      });

    $urlRouterProvider.otherwise("/tab/home");
  });



