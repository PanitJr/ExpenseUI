(function(){

  angular
       .module('layout')
       .controller('ExpenListController', [
          '$q','$scope','$routeParams','ExpenseListService','$timeout','$location',
          ExpenListController
       ]);

  function ExpenListController($log,$scope,$routeParams,ExpenseListService,$timeout,$location) {
    var self = this;
    self.objectName = 'Expense';
    self.heads ={ };
    self.limitoption =[10,25,50,100];
    self.total = 0;
    self.query ={
      search: "",
      order:null,
      limit : 20,
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
      self.promise = ExpenseListService.getList(objectName,query,success);
    }

    function success(response)
    {
      console.log(response);
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
       $location.path('/'+self.objectName+'/detail/'+record);
    }
  }
})();
