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
    //   $routeProvider.when('/', {
    //       templateUrl: 'views/objects/testObject/edit.html',
    //       controller: 'testObjectEditController as edit'
    //   });
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
    // $routeProvider.when('/Setting/LayoutEditor', {
    //   templateUrl: 'views/objects/Settings/LayoutEditor.html',
    //   controller: 'SettingsLayoutEditorController as layout'
    // });
    //
    //   $routeProvider.when('/Expense/list', {
    //       templateUrl: 'views/objects/Expen/list.html',
    //       controller: 'ExpenListController as list'
    //   });
    //
    //   $routeProvider.when('/Expense/allList', {
    //       templateUrl: 'views/objects/Expen/allList.html',
    //       controller: 'ExpenListController as all'
    //   });
    //
    //   $routeProvider.when('/Expense/detail/:record', {
    //       templateUrl: 'views/objects/Expen/detail.html',
    //       controller: 'ExpenDetailController as detail'
    //   });
    //   $routeProvider.when('/Expense/edit/:record', {
    //       templateUrl: 'views/layout/edit.html',
    //       controller: 'ExpenseEditController as edit'
    //   });
    //   $routeProvider.when('/Expense/edit', {
    //       templateUrl: 'views/layout/edit.html',
    //       controller: 'ExpenseEditController as edit'
    //   });
    //
      //user
      $routeProvider.when('/user/list', {
          templateUrl: 'views/objects/User/list.html',
          controller: 'UserListController as list'
      });

      $routeProvider.when('/user/detail/:record', {
          templateUrl: 'views/objects/User/detail.html',
          controller: 'UserDetailController as detail'
      });
      $routeProvider.when('/user/edit/:record', {
          templateUrl: 'views/objects/User/edit.html',
          controller: 'UserEditController as edit'
      });
      $routeProvider.when('/user/edit', {
          templateUrl: 'views/objects/User/edit.html',
          controller: 'UserEditController as edit'
      });
    //
    //   //profile
    //   $routeProvider.when('/profilewithpermission/profilelist', {
    //       templateUrl: 'views/objects/Profile/list.html',
    //       controller: 'ProfileListController as list'
    //   });
    //
    //   $routeProvider.when('/profilewithpermission/profileedit/:record', {
    //       templateUrl: 'views/objects/Profile/edit.html',
    //       controller: 'ProfileEditController as edit'
    //   });
    //
    //   $routeProvider.when('/profilewithpermission/profileedit', {
    //       templateUrl: 'views/objects/Profile/edit.html',
    //       controller: 'ProfileEditController as edit'
    //   });
    //
    //   $routeProvider.when('/profilewithpermission/profiledetail/:record', {
    //       templateUrl: 'views/objects/Profile/detail.html',
    //       controller: 'ProfileDetailController as detail'
    //   });
    //
    //
    //   $routeProvider.when('/Item/detail/:record', {
    //       templateUrl: 'views/objects/Item/detail.html',
    //       controller: 'ItemDetailController as detail'
    // });
    //   //LEAVE MANAGEMENT SYSTEM
    //   $routeProvider.when('/Leave/leavelist', {
    //       templateUrl: 'views/objects/Leave/leaveList.html',
    //       controller: 'LeaveListController as leavelist'
    //   });
    //   $routeProvider.when('/Leave/leavedetail/:record', {
    //       templateUrl: 'views/objects/Leave/leaveDetail.html',
    //       controller: 'LeaveDetailController as leavedetail'
    //   });
    //   $routeProvider.when('/Leave/allLeave', {
    //       templateUrl: 'views/objects/Leave/allLeave.html',
    //       controller: 'AllLeaveController as allLeave'
    //   });
    //   //Chart
    //   $routeProvider.when('/chart', {
    //   templateUrl: 'views/layout/chart.html',
    //       controller: 'ChartController as chart'
  //});




  }



})();
