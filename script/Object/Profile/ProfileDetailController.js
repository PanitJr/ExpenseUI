(function(){

  angular
       .module('layout')
       .controller('ProfileDetailController', [
          '$q','$scope','$routeParams','ProfiledetailService','$timeout','$location','$mdDialog','$rootScope','helperService',
          ProfileDetailController
       ]);


  function ProfileDetailController($log,$scope,$routeParams,ProfiledetailService,$timeout,$location,$mdDialog,$rootScope,helperService) {
    var self = this;
    self.objectName = "profilewithpermission";
    self.record = $routeParams.record;
    self.deleteRecord = deleteRecord;
    self.errorStatus = false;
    ProfiledetailService.getDetail(self.objectName,self.record,{},
    function(response){
      self.blocks = response.blocks;
      self.label = response.label;
      self.data = response.data;
      self.data.item = JSON.parse(response.data.item);
      self.data.expense = JSON.parse(response.data.expense);
      self.data.leave = JSON.parse(response.data.leave);
      self.data.user = JSON.parse(response.data.user);
      self.data.setting = JSON.parse(response.data.setting);
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
        ProfiledetailService.deleteRecord(self.objectName,self.record,function(response){
          $location.path('/'+self.objectName+'/profilelist');
        });
      });

    }

  }

})();
