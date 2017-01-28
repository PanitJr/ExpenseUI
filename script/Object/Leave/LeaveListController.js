(function(){

  angular
       .module('layout')
       .controller('LeaveListController', [
          '$q','$scope','$routeParams','LeaveListService','$timeout','$location','LeaveEditService','helperService',
          LeaveListController
       ]);


  function LeaveListController($log,$scope,$routeParams,LeaveListService,$timeout,$location,LeaveEditService,helperService) {
    var self = this;
    self.objectName = 'Leave';
            self.heads ={ };
            self.limitoption =[10,25,50,100];
            self.total = 0;
            self.query ={search: "", order:null, limit : 5, page : 1};
            self.selected = [ ];
            self.start_date = new Date();self.end_date = new Date();
            self.allday = false;
            self.onPaginate = onPaginate;
            self.onReorder = onReorder;
            self.getDetail = getDetail;
            self.loadList = loadList;
            self.cancleSearch = cancleSearch;
      self.individualleave={};

      LeaveEditService.getLeave('','',{},function (response) {
          self.individualleave = response;
      });
                 self.record = '';
                 self.data ={ };

                 LeaveEditService.getEdit(self.objectName,self.record,{},function(response){
                   console.log(response);
                   self.blocks = response.blocks;
                   self.label = response.label;
                   self.data = response.data;
                 }
                 ,helperService.error_page);

                 //Internal Function
                 self.save = function ()
                 {
                     self.data.start_date = self.start_date.getFullYear()+"-"+(self.start_date.getMonth()+1)+"-"+self.start_date.getDate();
                     self.data.end_date = self.end_date.getFullYear()+"-"+(self.end_date.getMonth()+1)+"-"+self.end_date.getDate();
                     LeaveEditService.saveEdit('Leave',self.record,self.data,function(response){
                     self.loadList('Leave',self.query);
                         LeaveEditService.getLeave('','',{},function (response) {
                             self.individualleave = response;
                         });
                   });
                 }
            //load List
            loadList(self.objectName,self.query);
      self.calculateDuration = function () {
                  self.data.leave_duration = ((self.end_date.getDate() - self.start_date.getDate()) * 8)+8;
          // else{
          //     self.data.leave_duration += self.end_date.getTime() - self.end_date.getTime();
          // }
      }

            /**
             *  Internal Function
             **/

            function cancleSearch() {
                 self.query.search = "";
                 loadList(self.objectName, self.query);
             }

            function loadList(objectName,query)
            {
              self.promise = LeaveListService.getList(objectName,query,success);
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
               $location.path('/'+self.objectName+'/leavedetail/'+record);
            }
             function save()
                {
                 LeaveEditService.saveEdit(self.objectName,self.record,self.data,function(response){
                    $location.path('/'+self.objectName+'/list/'+response.id);

                  });
                }
              }

})();
