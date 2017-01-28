(function(){

  angular
       .module('layout')
       .controller('UserListController', [
          '$q','$scope','$routeParams','UserlistService','$timeout','$location',
          UserListController
       ]);


  function UserListController($log,$scope,$routeParams,UserlistService,$timeout,$location) {
    var self = this;
    self.objectName = "user";
    self.heads =[];
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
    self.getRole = getRole;
    self.userNameList = [];

    self.role = [,"Admin","Supervisor","Employee"];
    self.profile = [,"Admin","Supervisor","Employee"];
    self.status= [,"Active","Inactive"];
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
      self.promise = UserlistService.getList(objectName,query,success);
    }

    function success(response)
    {
      //var listInfo = response.listInfo;
      self.heads  = response.heads;
      self.total = response.object.total;
      self.listdatas = response.object;
    }

//     nameList(self.listdatas);
//
//     function nameList(userObjectList) {
// for(i=1;userObjectList.length();i++ ){
//   self.userNameList
// }
//
//     }

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
       $location.path('/'+self.objectName+'/detail/'+record);
    }

    function getRole() {
        self.role = UerlistService.get('Role/role');
      }
  }

})();
