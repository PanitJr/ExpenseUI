(function(){

  angular
       .module('layout')
       .controller('testObjectEditController', [
          '$q','$scope','$routeParams','editService','$timeout','$location','helperService',
          testObjectEditController
       ]);


  function testObjectEditController($log,$scope,$routeParams,editService,$timeout,$location,helperService) {
    var self = this;
    self.objectName = 'testObject';
    self.record = '';
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
      editService.saveEdit('testObject',self.record,self.data,function(response){
        $location.path('/'+self.objectName+'/detail/'+response.id); 
      });
    }
    
  }

})();
