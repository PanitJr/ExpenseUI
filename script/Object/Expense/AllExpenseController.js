/**
 * Created by panit on 2/22/2017.
 */
(function(){

    angular
        .module('layout')
        .controller('AllExpenseController', [
            '$routeParams','listService','$location','$cookies','$http','$rootScope','helperService',
            AllExpenseController
        ]);


    function AllExpenseController ($routeParams,listService,$location,$cookies,$http,$rootScope,helperService) {
        var self = this;
        self.objectName = 'Expense';
        self.monthlis = [1,2,3,4,5,6,7,8,9,10,11,12];
        self.heads ={ };
        self.limitoption =[9999];
        self.total = 0;
        self.filterDate = undefined;
        self.query ={
            search: "",
            order:null,
            limit : 9999,
            page : 1,
            userPickList : {
                user:0,
                Opp:0,
                month:0,
                year:0,
                status:0
            }
        };
        self.listdatas = [];
        self.listSAppdatas = [];
        self.listPaiddatas = [];
        self.paidSelected=[];
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
            if(self.filterDate != undefined){
                query.userPickList.month = self.filterDate.getMonth() + 1;
                query.userPickList.year = self.filterDate.getFullYear();
            }
            self.promise = listService.getAllExpense(objectName,query,success);
        }

        function success(response)
        {
            var listInfo = response.listInfo;
            var listFilters = response.listFilters;
            self.heads  = response.header;
            self.total = 0;
            for (var i = 0, leng = listInfo.data.length; i < leng; i++) {
                if(listInfo.data[i].status == 1){
                    self.listdatas.push(listInfo.data[i]);
                }else if (listInfo.data[i].status == 4){
                    self.listSAppdatas.push(listInfo.data[i]);
                }else{
                    self.listPaiddatas.push(listInfo.data[i]);
                }
                self.total += parseFloat(listInfo.data[i].total_price);
            }
            self.userlis = listFilters.userlis;
            self.statuslis =listFilters.statuslis;
            self.opplis = listFilters.opplis;

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
        self.paidExpenses = function(){
            for (var i = 0, len = self.paidSelected.length; i < len; i++) {
            var postData = angular.extend({}, self.paidSelected[i] || {}, {
                token: $cookies.get('auth_token')});
            $http.post($rootScope.apiurl+'Expense/paid/'+self.paidSelected[i].id+'?token='+$cookies.get('auth_token'),postData , {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).error(error);
            }
            location.reload();
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
