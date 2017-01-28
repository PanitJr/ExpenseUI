(function(){
  angular
  .module('layout')
  .directive("ngFileUpload",['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.ngFileUpload);
            var modelSetter = model.assign;
            var mdInput = $(element).parent();
            
            var nameFile = $('<input>',{
              "class":"md-input",
              "readonly":"readonly",
              "style":"width: 180px; margin-top: 10px;"
            });
            var btnUpload = $('<button>',{
              "type":"button",
              "aria-label":"import",
              "class":"md-fab md-button md-ink-ripple md-mini",
              "style" : "float: left;"
            })
            .html('<i class="material-icons">file_upload</i>')
            .click(function() {
              $(element).click(); 
            });


            $(element).hide().after(nameFile).after(btnUpload); 

            element.bind('change', function(){
                var file = element[0].files[0];
                nameFile.val(!file?"":file.name);
                mdInput
                  .addClass(!file?"":"md-input-has-value md-input-focused")
                  .removeClass(!file?"md-input-has-value md-input-focused":"");

                scope.$apply(function(){
                    modelSetter(scope, file);
                });
            });
        }
    };
}]);

})();
