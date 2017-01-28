(function() {
    'use strict';

    angular
        .module('layout')
        .service('helperService', [
            '$q','$mdDialog','$rootScope',
            helperService
        ]);

    function helperService($q,$mdDialog,$rootScope) {
        return {
            show_alert_error : false,
            b64toBlob: function(dataURI) {
                var byteString;
                if (dataURI.split(',')[0].indexOf('base64') >= 0)
                    byteString = atob(dataURI.split(',')[1]);
                else
                    byteString = unescape(dataURI.split(',')[1]);

                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

                var ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }

                return new Blob([ia], {type:mimeString});
            },

            error_page : function(response){
              $rootScope.error ={
                status:true,
                code:response.error_code,
                massage:response.error_massage
              };
            },

            alert_error : function(response) {
                var thisinit = this;
                if(!thisinit.show_alert_error){
                    thisinit.show_alert_error = true;
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(false)
                            .title(response.error_code)
                            .textContent(response.error_massage)
                            .ariaLabel(response.error_code)
                            .ok('OK')
                    ).then(function() {
                      thisinit.show_alert_error = false;
                    });
                } 
            },
        };
    }

})();
