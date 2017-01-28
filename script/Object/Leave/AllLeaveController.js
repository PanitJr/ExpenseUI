(function(){

  angular
       .module('layout')
       .controller('AllLeaveController', [
          '$http','$rootScope',
         AllLeaveController
       ]);


  function AllLeaveController($http,$rootScope) {
    var self = this;
      $http.get($rootScope.apiurl+'allleave').then(function (response) {
        console.log(response);
        self.leave = response.data.data;
      })
  }

})();
