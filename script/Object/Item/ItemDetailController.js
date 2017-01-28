(function(){

  angular
       .module('layout')
       .controller('ItemDetailController', [
          '$q','$scope','$routeParams','detailService','$timeout','$location','$mdDialog','$rootScope','helperService',
          ItemDetailController
       ]);


  function ItemDetailController($log,$scope,$routeParams,detailService,$timeout,$location,$mdDialog,$rootScope,helperService) {
    var self = this;
    self.objectName = 'Item';
    self.record = $routeParams.record; 
    self.deleteRecord = deleteRecord; 
    self.errorStatus = false;
    detailService.getDetail(self.objectName,self.record,{},
    function(response){
      self.blocks = response.blocks;
      self.label = response.label;
      self.data = response.data;
    },
    helperService.error_page);

    function deleteRecord(ev)
    {
      var confirm = $mdDialog.confirm()
          .textContent('Are you sure you want to delete this Account?')
          .ariaLabel('delate record')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');

      $mdDialog.show(confirm).then(function() {
        detailService.deleteRecord(self.objectName,self.record,function(response){
          $location.path('/'+self.objectName+'/list'); 
        });
      });

    }

  }

})();
