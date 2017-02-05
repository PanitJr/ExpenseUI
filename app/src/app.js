(function(){
  'use strict';
  
  angular
  .module('customerconnect-ui', [
    'ngRoute',
    'ngMaterial',
    'md.data.table',
    'config',
    'auth', 
    'layout',
    'ui.sortable',
    'angular-loading-bar'
  ])
  .config(['$routeProvider','$mdThemingProvider', '$mdIconProvider','$mdDateLocaleProvider',function($routeProvider,$mdThemingProvider, $mdIconProvider,$mdDateLocaleProvider){
    $mdIconProvider
          .defaultIconSet("./assets/svg/avatars.svg", 128)
          .icon("menu"       , "./assets/svg/menu.svg"        , 24)
          .icon("share"      , "./assets/svg/share.svg"       , 24)
          .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
          .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
          .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
          .icon("phone"      , "./assets/svg/phone.svg"       , 512);

          $mdThemingProvider.theme('default')
              .primaryPalette('indigo')
              .accentPalette('red');
    $mdDateLocaleProvider.formatDate = function(date) {
      return moment(date).format('DD-MM-YYYY');
    };

      $routeProvider.otherwise({redirectTo: '/'});  
  }]);

  angular
  .module('config', [ 
      'ngRoute',
    ])
  .run(['$rootScope',function($rootScope)
  {
    $rootScope.apiurl = "http://localhost:8000/api/";
    // $rootScope.apiurl = "http://ccecms.demosolution.com:8080/api/";
  }]);

})();

