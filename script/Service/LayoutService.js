(function(){
  'use strict';

  angular.module('layout')
         .service('layoutService', [
          '$q','apiService', 
          layoutService
          ]);

  function layoutService($q,apiService){
      return {
        loadObjectHome : function(callBack_fn) {
          apiService.authget('object_home').then(function(response){
            var objectAll = response.data.data;
            callBack_fn(objectAll);
          });
        }      
      };
  }
  
})();
