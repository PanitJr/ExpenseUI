(function(){
  'use strict';

  angular.module('layout')
         .service('SettingsService', [
          '$q','apiService', 
          SettingsService
          ]);

  function SettingsService($q,apiService){
      return {
        loadObject : function(callBack_fn) 
        {
          apiService.authget('Settings/Layout/objectAll').then(function(response){
            var objectAll = response.data.data;
            callBack_fn(objectAll);
          });
        },
        loadLayout : function(object,callBack_fn)
        {
          apiService.authget('Settings/Layout/object/'+object).then(function(response){
            var objectAll = response.data.data;
            callBack_fn(objectAll);
          });
        }     
      };
  }

})();
