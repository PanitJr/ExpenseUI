(function(){

  angular
       .module('layout')
       .controller('UserDetailController', [
          '$q','$scope','$routeParams','UserdetailService','$timeout','$location','$mdDialog','$rootScope','helperService',
          UserDetailController
       ]);


  function UserDetailController($log,$scope,$routeParams,UserdetailService,$timeout,$location,$mdDialog,$rootScope,helperService) {
    var self = this;
    self.objectName = "user";
    self.record = $routeParams.record;
    self.deleteRecord = deleteRecord;
    self.errorStatus = false;
    self.role = [,"Admin","Supervisor","Employee"];
    self.profile = [,"Admin","Supervisor","Employee"];
    UserdetailService.getDetail(self.objectName,self.record,{"r":self.record},
        function(response){
          self.blocks = response.fieldname;
          self.labels = response.fieldfill;
          self.datas = response.object;
          self.datas.profilename = response.object.profile.profilewithpermission;
          self.datas.status = response.object.status.userstatusname;
          self.datas.supervisor =response.supervisor.nickname;
          self.datas.rolename =response.role.rolename;

        },
    helperService.error_page);

    function deleteRecord(ev)
    {
      var confirm = $mdDialog.confirm()
          .textContent('Are you sure you want to delete this Account?')
          .ariaLabel('delete record')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');

      $mdDialog.show(confirm).then(function() {
        UserdetailService.deleteRecord(self.objectName,self.record,function(response){
          console.log("delete success:"+response);
          $location.path('/'+self.objectName+'/list');
        });
      });

    }

  }

})();
