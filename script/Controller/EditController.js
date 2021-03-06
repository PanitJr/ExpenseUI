(function(){

  angular
       .module('layout')
       .controller('EditController', [
          '$q','$scope','$routeParams','editService','$timeout','$location','helperService',
          EditController
       ]);


  function EditController($log,$scope,$routeParams,editService,$timeout,$location,helperService) {
    var self = this;
    self.objectName = $routeParams.objectname; 
    self.record = $routeParams.record; 
    self.save = save; 
    self.data ={ };
      
    editService.getEdit(self.objectName,self.record,{},function(response){
      self.blocks = response.blocks;
      self.label = response.label;
      self.data = response.data;
    }
    ,helperService.error_page);

    //Internal Function
    function save()
    {
      editService.saveEdit(self.objectName,self.record,self.data,function(response){
        $location.path('/'+self.objectName+'/detail/'+response.id); 
      });
    }
    
  }

})();
