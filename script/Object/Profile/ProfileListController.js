(function(){

  angular
       .module('layout')
       .controller('ProfileListController', [
          '$q','$scope','$routeParams','ProfileListService','$timeout','$location',
          ProfileListController
       ]);


  function ProfileListController($log,$scope,$routeParams,ProfileListService,$timeout,$location) {
    var self = this;
    self.objectName = "profilewithpermission";
    self.heads ={ };
    self.limitoption =[10,25,50,100];
    self.total = 0;

    self.query ={
      search: "",
      order:null,
      limit : 10,
      page : 1
    };

    self.selected = [ ];
    self.onPaginate = onPaginate;
    self.onReorder = onReorder;
    self.getDetail = getDetail;

    self.loadList = loadList;
    self.cancleSearch = cancleSearch;


    //load List
    loadList(self.objectName,self.query);

    /**
     *  Internal Function
     **/

    function cancleSearch() {
         self.query.search = "";
         loadList(self.objectName, self.query);
     }

    function loadList(objectName,query)
    {
      self.promise = ProfileListService.getList(objectName,query,success);
    }

    function success(response)
    {
      var listInfo = response.listInfo;
      self.heads  = response.header;
      self.total = listInfo.total;
      self.listdatas = listInfo.data;
    }

    function onPaginate(page, limit)
    {
      self.query = angular.extend({},self.query,{page:page,limit:limit});
      loadList(self.objectName,self.query);
    }

    function onReorder(order)
    {
      self.query = angular.extend({},self.query,{order:order});
      loadList(self.objectName,self.query);
    }

    function getDetail(record)
    {
       $location.path('/'+self.objectName+'/profiledetail/'+record);
    }

  }

})();
