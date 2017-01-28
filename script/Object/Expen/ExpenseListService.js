(function() {
    'use strict';

    angular
        .module('layout')
        .service('ExpenseListService', [
            '$q', 'apiService',
            ExpenseListService
        ]);

    function ExpenseListService($q, apiService) {
        return {
            getList: function(objectName, data, callBack_fn) {
                return apiService.authget(objectName + '/expenseList', data).then(function(response) {
                    var objectAll = response.data.data;
                    callBack_fn(objectAll);
                });
            },

            getPopupList: function(objectName, data, callBack_fn) {
                data.view = "popup";              
                return apiService.authget(objectName + '/expenseList', data).then(function(response) {
                    var objectAll = response.data.data;
                    callBack_fn(objectAll);
                });
            },
        };
    }

})();
