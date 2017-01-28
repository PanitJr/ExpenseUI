(function(){

  angular
       .module('layout')
       .controller('LeaveEditController', [
          '$q','$scope','$routeParams','LeaveEditService','$timeout','$location','helperService',
          LeaveEditController
       ]);


  function LeaveEditController($log,$scope,$routeParams,LeaveEditService,$timeout,$location,helperService) {
    var self = this;
    self.objectName = 'Leave';
    self.record = $routeParams.record; 
    self.save = save; 
    self.data ={ };
      
    LeaveEditService.getEdit(self.objectName,self.record,{},function(response){
      console.log(response);
      self.blocks = response.blocks;
      self.label = response.label;
      self.data = response.data;

    }
    ,helperService.error_page);

    //Internal Function
    function save()
    {
      LeaveEditService.saveEdit(self.objectName,self.record,self.data,function(response){
      $location.path('/'+self.objectName+'/leavedetail/'+response.id);
      });
    }
    
  }

})();
