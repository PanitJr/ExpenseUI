(function(){
  'use strict';

  // Prepare the 'users' module for subsequent registration of controllers and delegates
  angular
  .module('auth', [ 
  		'ngRoute',
      'ngCookies'
  	])
  .run(['$rootScope','$controller'
    ,function($rootScope,$controller){

      $rootScope.Auth = $controller('AuthController');
      $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        $rootScope.Auth.setLayout();
      });
      
  }]);


})();
