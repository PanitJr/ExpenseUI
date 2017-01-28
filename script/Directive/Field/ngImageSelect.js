(function(){
  angular
  .module('layout')
  .directive("ngImageSelect",['$compile','helperService',ngImageSelect]);

  function ngImageSelect($compile,helperService) {
    return {
      require:"ngModel",
      link: function($scope,el,attr,ngModel){
          var microTime = new Date().getTime();
          var id =  "__" + attr.ngModel.split(".").join("") + microTime;
          var imagePreview = $('<md-card flex="100"> <img  ng-hide="!'+attr.ngModel+'" /> </md-card>') 
          var mainBtn = $('<md-button class="md-raised" > <label class="block" ng-show="!'+attr.ngModel+'" for="'+id+'">Receipt</label> <label class="block" ng-hide="!'+attr.ngModel+'" for="'+id+'">Change</label> </md-button>');
          var clearBtn = $('<md-button class="md-raised" ng-hide="!'+attr.ngModel+'" ng-click="'+attr.ngModel+'=\'\'" >Clear</md-button>');
          var imgTag = $('img',imagePreview).data('setDefault',false);
          $(el)
            .attr('id',id)
            .addClass('ng-hide')
            .before($compile(imagePreview)($scope))
            .before($compile(clearBtn)($scope))
            .before($compile(mainBtn)($scope));
          
          $scope.$watch(function(){
            if(typeof ngModel.$viewValue =="string"  && !imgTag.data('setDefault'))
            {
              imgTag.attr('src',ngModel.$viewValue).data('setDefault',true);
            }
          });  
          
          el.bind("change", function(e){
            var file = (e.srcElement || e.target).files[0];
            var canvas = $('<canvas>').appendTo('body').hide();
            var ctx=canvas[0].getContext("2d");
            
            var img = new Image; 
            img.onload = function() {
              var iw=img.width;
              var ih=img.height;
              var maxW=Math.min(500,iw);
              var maxH=Math.min(500,ih);
              var scale=Math.min((maxW/iw),(maxH/ih));
              var iwScaled=iw*scale;
              var ihScaled=ih*scale;
              canvas[0].width=iwScaled;
              canvas[0].height=ihScaled;
              
              ctx.drawImage(img,0,0,iwScaled,ihScaled);


              var imgBase64 = canvas[0].toDataURL();
              var file = helperService.b64toBlob(imgBase64);
              var url = URL.createObjectURL(file);
              imgTag.attr('src',url);
              
              $scope.$apply(function(){
                ngModel.$setViewValue(file);
              });
              canvas.remove(); 
            }
            img.src = URL.createObjectURL(file);
          }); 
        }
      };
  }
})();
