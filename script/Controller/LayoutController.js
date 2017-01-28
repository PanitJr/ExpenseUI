(function(){

  angular
       .module('layout')
       .controller('LayoutController', [
           '$mdSidenav', '$mdBottomSheet', '$log', '$scope','$controller',
          LayoutController
       ]);

  function LayoutController( $mdSidenav, $mdBottomSheet, $log,$scope,$controller) {
    var self = this;
    self.toggleList   = toggleList;
    
    function toggleList() {
      $mdSidenav('left').toggle();
    }
  }

})();
