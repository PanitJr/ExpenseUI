(function(){

  angular
       .module('layout')
       .controller('ExpenDetailController', [
          '$q','$scope','$routeParams','ExpenDetailService','$timeout','$location','$mdDialog','$rootScope','helperService','$window',
          ExpenDetailController
       ]);

  function ExpenDetailController($log,$scope,$routeParams,ExpenDetailService,$timeout,$location,$mdDialog,$rootScope,helperService,$window) {
    var self = this;
    self.objectName = 'Expense';
    self.record = $routeParams.record; 
    self.deleteRecord = deleteRecord;
    self.showConfirm = showConfirm;
    self.showReject = showReject;
    self.showRejectItem = showRejectItem;
    self.getPdf = getPdf;
    self.errorStatus = false;

    ExpenDetailService.getDetails(self.objectName,self.record,{},
    function detailSuccess(response){
      console.log(response);
      self.blocks = response.blocks;
      self.label = response.data.label;
      self.data = response.data;
      self.expensename = response.data.expensename;
      self.status_id = response.data.status_id;
      //self.item_status = response.data.item.status_id;
      self.expenseid = response.data.id;
    },
    helperService.error_page);

    function getPdf() {
      $window.open('http://localhost:8000/api/pdf?token=jSp2kjkT5kmHNXnX3vYxamS5P6AJ2cffoZ1dbZ6HBmyhOHkGq9v13fWDEmyd', '_blank');
      //ExpenDetailService.getPDF(function (response) {
      //
      //});
    }

    function deleteRecord(ev){
      var confirm = $mdDialog.confirm()
          .textContent('Are you sure you want to delete this Account?')
          .ariaLabel('delete record')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        ExpenDetailService.deleteRecord(self.objectName,self.record,function(response){
          $location.path('/'+self.objectName+'/list'); 
        });
      });
    }

    function showConfirm(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
          .title('Do you want to Approve ' + self.data.expensename + ' ?')
          .textContent('Some detail')
          .ariaLabel('Approved')
          .targetEvent(ev)
          .ok('Approve')
          .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        self.data.status_id = 1;
        //console.log(self.data.status_id);
        ExpenDetailService.saveEdit(self.objectName,self.record,self.data,function(response){
          //console.log("Status Edit " + self.data.status_id+  "expense name "+ self.data.expensename);
          $location.path('/'+self.objectName+'/list');
        });
      });
    }

    function showReject(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var reject = $mdDialog.confirm()
          .title('Do you want to Reject ' + self.data.expensename + ' ?')
          .textContent('Some detail')
          .ariaLabel('Approved')
          .targetEvent(ev)
          .ok('Reject')
          .cancel('Cancel');

      $mdDialog.show(reject).then(function() {
        self.data.status_id =2;
        ExpenDetailService.saveEdit(self.objectName,self.record,self.data,function(response){
          //console.log("Status Edit " + self.data.status_id+  "expense name "+ self.data.expensename);
          $location.path('/'+self.objectName+'/list');
        });
      });
    }

    function showRejectItem(ev,data) {
      // Appending dialog to document.body to cover sidenav in docs app
      var reject = $mdDialog.confirm()
          .title('Do you want to Reject ' + data.itemname +' ?')
          .textContent('Some detail')
          .ariaLabel('Approved')
          .targetEvent(ev)
          .ok('Reject')
          .cancel('Cancel');
      //console.log(data.status_id);
      //console.log("Clickedddddddddddddddddddddddddddddd");

      $mdDialog.show(reject).then(function() {
        //console.log("Changeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        data.status_id =1;
        console.log(data.id + "Error");
        ExpenDetailService.saveEdit('Item',data.id,data,function(response){
          $location.path('/' + self.objectName+'/detail/'+self.expenseid);
        });
      });
    }

  }

})();