/**
 * Created by Asus on 15/11/2559.
 */
(function(){
    'use strict';

    angular.module('layout')
        .service('ChartService', [
            '$q','apiService', 'helperService',
            ChartService
        ]);

    function ChartService($q,apiService,helperService){
        return {
            getData : function(chartdata,data,callBack_fn) {
                return apiService.get(chartdata,data).then(function(response){
                    if(response.data.success)
                    {
                        callBack_fn(response.data.data);
                    }
                });
            },

        };
    }

})();
