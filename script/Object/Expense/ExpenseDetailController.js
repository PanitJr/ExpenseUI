(function(){

  angular
       .module('layout')
       .controller('ExpenseDetailController', [
          '$routeParams','detailService','$location','$mdDialog','$rootScope','helperService','$cookies','$http',
          ExpenseDetailController
       ]);


  function ExpenseDetailController($routeParams,detailService,$location,$mdDialog,$rootScope,helperService,$cookies,$http) {
    var self = this;
    self.objectName = 'Expense';
    self.record = $routeParams.record; 
    self.deleteRecord = deleteRecord; 
    self.errorStatus = false;
    detailService.getDetail(self.objectName,self.record,{},
    function(response){
      self.blocks = response.blocks;
      self.label = response.label;
      self.data = response.data;
        // console.log(self.data);
    },
    helperService.error_page);

      // self.confirm =  {};
      self.showPrompt = function(ev) {
          // Appending dialog to document.body to cover sidenav in docs app
          var confirm = $mdDialog.prompt()
              .title('What would you name your dog?')
              .textContent('Bowser is a common name.')
              .placeholder('Dog name')
              .ariaLabel('Dog name')
              .initialValue('Buddy')
              .targetEvent(ev)
              .ok('Okay!')
              .cancel('I\'m a cat person');

          $mdDialog.show(confirm).then(function(result) {
              self.comment = 'You decided to name your dog ' + result + '.';
          }, function() {
              self.comment = 'You didn\'t name your dog.';
          });
      };

    function deleteRecord(ev)
    {
      var confirm = $mdDialog.confirm()
          .textContent('Are you sure you want to delete this Account?')
          .ariaLabel('delate record')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');

      $mdDialog.show(confirm).then(function() {
        detailService.deleteRecord(self.objectName,self.record,function(response){
          $location.path('/'+self.objectName+'/list'); 
        });
      });

    }
      self.approveExpense= function (record) {
          var postData = angular.extend({}, self.data || {}, {
              token: $cookies.get('auth_token')});
          $http.post($rootScope.apiurl+'Expense/approve/'+record+'?token='+$cookies.get('auth_token'),postData , {
              transformRequest: angular.identity,
              headers: {
                  'Content-Type': undefined
              }
          }).error(error);
          $location.path('/'+self.objectName+'/list');
      };
      self.rejectExpense= function (record) {
          var postData = angular.extend({}, self.data || {}, {
              token: $cookies.get('auth_token')});
          $http.post($rootScope.apiurl+'Expense/reject/'+record+'?token='+$cookies.get('auth_token'),postData , {
              transformRequest: angular.identity,
              headers: {
                  'Content-Type': undefined
              }
          }).error(error);
          $location.path('/'+self.objectName+'/list');
      };
      self.rejectItem= function (record) {
          $http
              .get($rootScope.apiurl +'Item/reject/'+record+'?token='+$cookies.get('auth_token'))
              .then(function (res) {
                  location.reload();
              });
      };
      self.pdf= function () {
          var postData = angular.extend({}, self.data || {}, {
              token: $cookies.get('auth_token')});
          $http.post($rootScope.apiurl+'Expense/pdf?token='+$cookies.get('auth_token'),postData , {
              transformRequest: angular.identity,
              headers: {
                  'Content-Type': undefined
              }
          }).error(error);
      };
      self.getDetail = function(record)
      {
          $location.path('/Item/detail/'+record);
      };
      function error(e) {
          helperService.alert_error({
              error_code:e.error_code,
              error_massage : e.error_massage
          });
          window.history.back();
      }

  }

})();
