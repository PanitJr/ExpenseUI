(function(){
  'use strict';

  angular.module('layout')
         .service('UserdetailService', [
          '$q','apiService',
          UserdetailService
          ]);

  function UserdetailService($q,apiService){
      return {
        getDetail : function(objectName,record,data,callBack_fn,error_fn) {
          return apiService.authget('user/'+objectName+'/detail/'+record,data).then(function(response){
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
          return apiService.authpost('user/'+objectName+'/delete/'+record,{}).then(function(response){
            var objectAll = response.data.data;
            callBack_fn(objectAll);
          });
        },
        getList: function(objectName, data, callBack_fn) {
          return apiService.authget('user/'+objectName + '/list', data).then(function(response) {
            var objectAll = response.data.data;
            callBack_fn(objectAll);
          });
        }

      };
  }

})();
