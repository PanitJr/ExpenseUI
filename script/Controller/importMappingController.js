(function(){

  angular
       .module('layout')
       .controller('importMappingController', [
          '$scope', '$mdDialog', 'importFn','importFnApprove', 'data_template',
          importMappingController
       ]);


  function importMappingController($scope, $mdDialog,importFn,importFnApprove,data_template) 
  {
    var self = this;
    self.cancel = cancel;
    self.save = save;
    self.sample = data_template.sample;
    self.fieldMapping = data_template.fieldMapping;
    self.sample = data_template.sample;
    self.progress = false;
    function save(ev) {
      self.progress = true;
      importFn(data_template,function(result){
        if(result.approve)
        {
          showImportApprove(ev ,result ,importFnApprove)
        }
        else
        {
          showImportResult(ev , result);  
        }     
      });
    }
    
    function cancel() {
      $mdDialog.cancel();
    }

    function showImportResult(ev , result)
    {
      $mdDialog.show({
          controller: 'importResultController',
          controllerAs: "import",
          templateUrl: 'views/layout/importResult.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: false,
          locals: {
            report : result
          }
      });
    }

    function showImportApprove(ev , result,importFnApprove)
    {
      $mdDialog.show({
          controller: 'importApproveController',
          controllerAs: "import",
          templateUrl: 'views/layout/importApprove.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: false,
          locals: {
            report : result,
            importFnApprove : importFnApprove
          }
      });
    }

  }

})();
