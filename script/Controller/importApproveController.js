(function(){

  angular
       .module('layout')
       .controller('importApproveController', [
          '$scope', '$mdDialog', 'report','importFnApprove', 
          importApproveController
       ]);


  function importApproveController($scope, $mdDialog,report,importFnApprove) 
  {
    var self = this;
    self.cancel = cancel;
    self.save = save;
    self.selectAll = selectAll;
    self.lineSelect = lineSelect;
    self.data_approve = report.data_approve;
    self.duplicate = report.duplicate;
    self.approveAll = true;
    self.progress = false;
    function save(ev) {
      self.progress = true;
      var data = formatData(report.data_approve.data);
      importFnApprove({
        data: data ,
        report :  report.report, 
        filename : report.filename,
        param : report.param,
      },
      function(result){
        var response = angular.extend({},report,result);
        showImportResult(ev , response);       
      });
    }

    function formatData(data)
    {
      var result = [];
      for(var i in data)
      {
        if(data[i]._a)
        {
          result.push(data[i]._l); 
        }
      }
      return result.join(":");
    }

    function selectAll(select)
    {
      angular.forEach(report.data_approve.data, function(itm){ itm._a = select; });
    }

    function lineSelect(select)
    {
      if(!select)
      {
        self.approveAll = false;
      }
    }
    
    function cancel(ev) {
      showImportResult(ev , report);
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

   

  }

})();
