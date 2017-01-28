(function(){

  angular
       .module('layout')
       .controller('ProfileEditController', [
          '$q','$scope','$routeParams','ProfileeditService','$timeout','$location','helperService',
          ProfileEditController
       ]);


  function ProfileEditController($log,$scope,$routeParams,ProfileeditService,$timeout,$location,helperService) {
    var self = this;
    self.objectName = "profilewithpermission";
    self.record = $routeParams.record;
    self.save = save;
    self.data ={ };

    ProfileeditService.getEdit(self.objectName,self.record,{},function(response){
      self.blocks = response.blocks;
      self.label = response.label;
      self.data = response.data;
          self.data.item = JSON.parse(response.data.item);
          self.data.expense = JSON.parse(response.data.expense);
          self.data.leave = JSON.parse(response.data.leave);
          self.data.user = JSON.parse(response.data.user);
          self.data.setting = JSON.parse(response.data.setting);
    }
    ,helperService.error_page);

    //Internal Function
    function save()
    {
      ProfileeditService.saveEdit(self.objectName,self.record,self.data,function(response){
        console.log("added profile id " + response.id);
        $location.path('/'+self.objectName+'/profiledetail/'+response.id);
      });
    }



  }

})();
