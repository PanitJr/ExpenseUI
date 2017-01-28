(function(){
  'use strict';

  angular.module('layout')
         .service('ProfiledetailService', [
          '$q','apiService',
          ProfiledetailService
          ]);

  function ProfiledetailService($q,apiService){
      return {
        getDetail : function(objectName,record,data,callBack_fn,error_fn) {
          return apiService.authget(objectName+'/detail/'+record,data).then(function(response){
            if(response.data.success)
            {
              callBack_fn(response.data.data);
            }
            else
            {
              error_fn(response.data);
            }
          });
        },
        deleteRecord : function(objectName,record,callBack_fn)
        {
          return apiService.authpost(objectName+'/delete/'+record,{}).then(function(response){
            var objectAll = response.data.data;
            callBack_fn(objectAll);
          });
        }
      };
  }

})();
