(function() {
    'use strict';

    angular
        .module('layout')
        .service('LeaveListService', [
            '$q', 'apiService',
            LeaveListService
        ]);

    function LeaveListService($q, apiService) {
        return {
            getList: function(objectName, data, callBack_fn) {
                return apiService.authget(objectName + '/list', data).then(function(response) {
                    var objectAll = response.data.data;
                    callBack_fn(objectAll);
                });
            },

            getPopupList: function(objectName, data, callBack_fn) {
                data.view = "popup";
                return apiService.authget(objectName + '/detail', data).then(function(response) {
                    var objectAll = response.data.data;
                    callBack_fn(objectAll);
                });
            },
        };
    }

})();