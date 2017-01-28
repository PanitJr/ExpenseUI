(function(){

    angular
        .module('layout')
        .controller('SidenavController', [
            'layoutService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
            SidenavController
        ]);

    function SidenavController( layoutService, $mdSidenav, $mdBottomSheet, $log) {
        var self = this;
        self.toggleList   = toggleUsersList;
        self.selectObject   = selectObject;
        self.object = [ ];
        self.managelist = [ ];


        layoutService
            .loadObjectHome(function(object){
                self.object = object.list;
                self.managelist = object.manage;
            });

        function toggleUsersList() {
            $mdSidenav('left').toggle();
        }

        function selectObject(object)
        {
            self.selected = object;
        }

    }

})();
