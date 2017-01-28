(function(){
  'use strict';

  angular.module('layout')
         .factory('DashboardService', [
          '$q','apiService', 'helperService',
          DashboardService
          ]);

  function DashboardService($q,apiService,helperService){
      return {
        submit : function(objectName,record,data,callBack_fn) {
          return apiService.authpost(objectName+'/submit/'+record,data).then(function(response){
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
