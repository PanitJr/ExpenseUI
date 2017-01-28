(function(){

  angular
       .module('layout')
       .controller('LeaveDetailController', [
          '$q','$scope','$routeParams','LeaveDetailService','$timeout','$location','$mdDialog','$rootScope','helperService',
          LeaveDetailController
       ]);


  function LeaveDetailController($log,$scope,$routeParams,LeaveDetailService,$timeout,$location,$mdDialog,$rootScope,helperService) {
    var self = this;
    self.objectName = 'Leave';
    self.record = $routeParams.record; 
    self.deleteRecord = deleteRecord; 
    self.errorStatus = false;
    LeaveDetailService.getDetail(self.objectName,self.record,{},
    function(response){
    console.log(response);
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
        LeaveDetailService.deleteRecord(self.objectName,self.record,function(response){
          $location.path('/'+self.objectName+'/leavelist');
        });
      });
    }

  }

})();
