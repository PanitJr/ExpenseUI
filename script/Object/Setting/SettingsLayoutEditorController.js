(function(){

  angular
       .module('layout')
       .controller('SettingsLayoutEditorController', [
          'SettingsService', '$log', '$scope','$location',
          SettingsLayoutEditorController
       ]);

  function SettingsLayoutEditorController( SettingsService, $log,$scope,$location) {
   	var self = this;
    var search = $location.search();
    
   	self.objects = [ ];
    self.selectObject = selectObject;


    SettingsService.loadObject(function(objects){
      self.objects = objects;
      selectObject(!search.object ? objects[0].name : search.object);  
    });

    function selectObject(objectName)
    {
      self.selected = objectName;
      $location.search('object',objectName); 
      SettingsService.loadLayout(objectName,function(response){
        self.blocks = response;
      });
    }
  }

})();
