(function(){
  'use strict';

  angular.module('layout')
         .service('UsereditService', [
          '$q','apiService', 'helperService',
          UsereditService
          ]);

  function UsereditService($q,apiService,helperService){
      return {
        getEdit : function(objectName,record,data,callBack_fn,error_fn) {
          return apiService.authget('user/'+objectName+'/edit/'+record,data).then(function(response){
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
        getList: function(objectName, data, callBack_fn) {
          return apiService.authget('user/'+objectName + '/list', data).then(function(response) {
            var objectAll = response.data.data;
            callBack_fn(objectAll);
          });
        },
        getPickList: function(objectName, data, callBack_fn) {
          return apiService.authget('picklist/'+objectName + '/list', data).then(function(response) {
            var objectAll = response.data.data;
            callBack_fn(objectAll);
          });
        },
        getListCC: function(objectName, data, callBack_fn) {
          return apiService.authget(objectName + '/list', data).then(function(response) {
            var objectAll = response.data.data;
            callBack_fn(objectAll);
          });
        },
        saveEdit : function(objectName,record,data,callBack_fn) {
          return apiService.authpost('user/'+objectName+'/edit/'+record,data).then(function(response){
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
