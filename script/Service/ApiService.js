(function() {
    'use strict';

    angular.module('auth')
        .service('apiService', [
            '$q', '$http', '$cookies', '$rootScope','helperService',
            ApiService
        ]);

    function ApiService($q, $http, $cookies, $rootScope,helperService) {
        var baseurl = $rootScope.apiurl;
        var showErrorMassage = false;
        var error = function(e) {
            helperService.alert_error({
                error_code:e.error_code,
                error_massage : e.error_massage
            });
        }

        var mergeAuthData = function(parameter) {
            return angular.extend({}, parameter || {}, {
                token: $cookies.get('auth_token')
            });
        }

        var objectToFormData = function(obj, form, namespace) {

            var fd = form || new FormData();

            var formKey;

            for (var property in obj) {
                if (obj.hasOwnProperty(property)) {
                    
                    if (namespace) {
                        formKey = namespace + '[' + property + ']';
                    } else {
                        formKey = property;
                    }

                    if (typeof obj[property] === 'object' && !(obj[property] instanceof File || obj[property] instanceof Blob)) {
                        objectToFormData(obj[property], fd, formKey);
                    } else {
                        if(obj[property] instanceof Blob)
                        {
                            fd.append(formKey, obj[property],formKey);
                        }   
                        else
                        {
                            fd.append(formKey, obj[property]);    
                        }
                    }
                }
            }
            return fd;
        };
 
        return {
            configAjax: {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            },
            post: function(url, parameter) {
                return $http.post(baseurl + url, $.param(parameter), this.configAjax).error(error);
            },
            get: function(url, parameter) {
                return $http.get(baseurl + url + "?" + $.param(parameter), this.configAjax).error(error);
            },
            authpost: function(url, parameter) {

                var allData = mergeAuthData(parameter);
                var formData = objectToFormData(allData);
                return $http.post(baseurl + url, formData, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }).error(error);
            },
            authget: function(url, parameter) {
                parameter = mergeAuthData(parameter);
                return $http.get(baseurl + url + "?" + $.param(parameter), this.configAjax).error(error);
            },
            authgetUrl: function(url, parameter) {
                parameter = mergeAuthData(parameter);
                return baseurl + url + "?" + $.param(parameter);
            },
            authpostFile: function(url, formData) {
                formData.append("token", $cookies.get('auth_token'));

                return $http.post(baseurl + url, formData, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }).error(error);

            }
        };
    }

})();