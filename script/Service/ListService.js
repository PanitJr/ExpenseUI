(function() {
    'use strict';

    angular
        .module('layout')
        .service('listService', [
            '$q', 'apiService',
            listService
        ]);

    function listService($q, apiService) {
        return {
            getList: function(objectName, data, callBack_fn) {
                return apiService.authget(objectName + '/list', data).then(function(response) {
                    var objectAll = response.data.data;
                    callBack_fn(objectAll);
                });
            },
            getAllExpense: function(objectName, data, callBack_fn) {
                return apiService.authget(objectName + '/AllExpense', data).then(function(response) {
                    var objectAll = response.data.data;
                    callBack_fn(objectAll);
                });
            },

            getPopupList: function(objectName, data, callBack_fn) {
                data.view = "popup";
                return apiService.authget(objectName + '/list', data).then(function(response) {
                    var objectAll = response.data.data;
                    callBack_fn(objectAll);
                });
            },
        };
    }

})();