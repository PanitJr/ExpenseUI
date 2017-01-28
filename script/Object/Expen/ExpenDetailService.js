(function(){
  'use strict';

  angular.module('layout')
         .service('ExpenDetailService', [
          '$q','apiService', 'detailService',
          ExpenDetailService
          ]);

  function ExpenDetailService($q,apiService,detailService){
      return angular.extend(detailService ,{
          getDetails : function(Expense,record,data,callBack_fn,error_fn) {
              return apiService.authget(Expense+'/detail/'+record,data).then(function(response){
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
          },

          //  getPDF : function()
          //{
          //  return apiService.authget('pdf').then(function(response){
          //
          //  })
          //}

        //  getUser : function(callBack_fn)
        //{
        //  apiService.authget('Expense/taxi/meter').then(function(response){
        //      callBack_fn(response.data.data);
        //  });
        //}

      });

  }

})();
