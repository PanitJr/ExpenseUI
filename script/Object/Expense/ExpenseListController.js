(function(){

  angular
       .module('layout')
       .controller('ExpenseListController', [
          '$routeParams','listService','$location',
           ExpenseListController
       ]);


  function ExpenseListController ($routeParams,listService,$location) {
    var self = this;
    self.objectName = 'Expense';
    self.heads ={ };
    self.limitoption =[10,25,50,100];
    self.total = 0;
    self.query ={
      search: "",
      order:null,
      limit : 10,
      page : 1
    };
    self.listdatas = [];
    self.listSAppdatas = [];
    self.listPaiddatas = [];
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
        self.listdatas = [];
        self.listSAppdatas = [];
        self.listPaiddatas = [];
        self.promise = listService.getList(objectName,query,success);
    }

    function success(response)
    {
      var listInfo = response.listInfo;
      self.heads  = response.header;        
      self.total = listInfo.total;

        for (var i = 0, leng = listInfo.data.length; i < leng; i++) {
          if(listInfo.data[i].status == 1){
              self.listdatas.push(listInfo.data[i]);
          }else if (listInfo.data[i].status == 4){
              self.listSAppdatas.push(listInfo.data[i]);
          }else{
              self.listPaiddatas.push(listInfo.data[i]);
          }
        }

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
