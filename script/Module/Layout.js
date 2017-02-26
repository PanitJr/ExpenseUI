(function(){
  'use strict';

  // Prepare the 'users' module for subsequent registration of controllers and delegates
  angular
  .module('layout', [ 
  		'ngRoute',
  		'ngMaterial' 
  	])
  .config(['$routeProvider','$mdDateLocaleProvider',function($routeProvider,$mdDateLocaleProvider){
    layout_custom_route($routeProvider);
    layout_basic_route($routeProvider);

    $mdDateLocaleProvider.formatDate = function(date) {
      return moment(date).format('YYYY-MM-DD'); 
    };

  }])
  .run(['$rootScope','$controller'
    ,function($rootScope,$controller){
      $rootScope.errorTemplate = 'views/layout/error.html';
      $rootScope.history = window.history;
      $rootScope.$on( "$routeChangeSuccess", function(event, next, current) {
        $rootScope.error = {
          status : false,
          code : null,
          massage : null
        };
      });
  }]);
  
  function layout_basic_route($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/objects/Item/dashboard.html',
        controller: 'DashboardController as dashboard'
    });
    $routeProvider.when('/:objectname/list', {
          templateUrl: 'views/layout/list.html',
          controller: 'ListController as list'
    });

     $routeProvider.when('/:objectname/detail/:record', {
           templateUrl: 'views/layout/detail.html',
           controller: 'DetailController as detail'
     });

    $routeProvider.when('/:objectname/edit/:record', {
          templateUrl: 'views/layout/edit.html',
          controller: 'EditController as edit'
    });
    
    $routeProvider.when('/:objectname/edit', {
          templateUrl: 'views/layout/edit.html',
          controller: 'EditController as edit'
    });
  }

  function layout_custom_route($routeProvider) {
      $routeProvider.when('/Users/list', {
          templateUrl: 'views/objects/Users/list.html',
          controller: 'UserListController as list'
      });
      $routeProvider.when('/Users/detail/:record', {
          templateUrl: 'views/objects/Users/detail.html',
          controller: 'UserDetailController as detail'
      });
      $routeProvider.when('/Users/edit/:record?', {
          templateUrl: 'views/objects/Users/edit.html',
          controller: 'UserEditController as edit'
      });

      //item and dashboard
      $routeProvider.when('/', {
          templateUrl: 'views/objects/Item/dashboard.html',
          controller: 'DashboardController as dashboard'
      });
      $routeProvider.when('/Item/list', {
          templateUrl: 'views/objects/Item/dashboard.html',
          controller: 'DashboardController as dashboard'
      });
      $routeProvider.when('/Item/detail/:record', {
          templateUrl: 'views/objects/Item/detail.html',
          controller: 'ItemDetailController as detail'
      });
      //Expense
      $routeProvider.when('/Expense/list', {
          templateUrl: 'views/objects/Expense/list.html',
          controller: 'ExpenseListController as list'
      });
      $routeProvider.when('/Expense/detail/:record', {
          templateUrl: 'views/objects/Expense/detail.html',
          controller: 'ExpenseDetailController as detail'
      });
      $routeProvider.when('/AllExpense/list', {
          templateUrl: 'views/objects/Expense/AllExpense.html',
          controller: 'AllExpenseController as list'
      });

  }



})();
