(function(){
  'use strict';

  angular.module('layout')
         .service('LeaveEditService', [
          '$q','apiService', 'helperService',
          LeaveEditService
          ]);

  function  LeaveEditService($q,apiService,helperService){
      return {
        getEdit : function(objectName,record,data,callBack_fn,error_fn) {
          return apiService.authget(objectName+'/edit/'+record,data).then(function(response){
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
        getLeave : function(objectName,record,data,callBack_fn,error_fn) {
          return apiService.authget('individualleave',data).then(function(response){
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
        saveEdit : function(objectName,record,data,callBack_fn) {
          return apiService.authpost(objectName+'/edit/'+record,data).then(function(response){
            if(response.data.success)
            {
              callBack_fn(response.data.data);
              if(typeof response.data.data.___error != "undefined")
              {
                var error = response.data.data.___error;
                helperService.alert_error({
                  error_code : error.code,
                  error_massage : error.massage
                });
              }
            }
            else
            {
              helperService.alert_error(response.data);
            }
          });
        }      
      };
  }

})();
