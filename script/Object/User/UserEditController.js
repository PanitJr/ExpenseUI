(function(){

  angular
       .module('layout')
       .controller('UserEditController', [
          '$routeParams','editService','$location','helperService',
          UserEditController
       ]);


    function UserEditController($routeParams,editService,$location,helperService) {
        var self = this;
        self.objectName = 'Users';
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
