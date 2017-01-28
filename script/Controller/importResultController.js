(function(){

  angular
       .module('layout')
       .controller('importResultController', [
          '$scope', '$mdDialog', '$route', 'report',
          importResultController
       ]);


  function importResultController($scope, $mdDialog,$route,report) {
    var self = this;
    self.done = done;
    self.report = report;

    function done() {
      $mdDialog.cancel();
      $route.reload();
    }
  }

})();
