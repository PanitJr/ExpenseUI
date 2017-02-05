(function(){
    angular
        .module('layout')
        .controller('DashboardController', [
            'helperService','editService','listService','$location','$rootScope','$http','$cookies',
            DashboardController
        ]);

    function DashboardController(helperService,editService,listService,$location,$rootScope,$http,$cookies) {
        var self = this;
        self.defaultVal = false;
        self.defaultOpportunity = 1;
        self.defaultDate = new Date();
        self.limitoption =[25,50,100];
        self.objectName = 'Item';
        self.tempcost = 0.0;
        self.objectList = [];
        self.selected = [];
        self.record = '';
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
            self.promise = listService.getList(objectName,query,success);
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
            $location.path('/'+self.objectName+'/detail/'+record);
        }
        //add function
        self.getitemcost = function (object) {
            if(object.travel.origination != undefined && object.travel.destination != undefined) {
                $http
                    .get($rootScope.apiurl + 'TravelUtil/'+ object.travel.travelsubtype +'/cost/' + object.travel.origination +
                        '/' + object.travel.destination+'?token='+$cookies.get('auth_token'))
                    .then(function (res) {
                        console.log(res.data.data[0]['cost']);
                        object.cost = parseFloat(res.data.data[0]['cost']);
                    });
            }
        }
        self.addObject = function (objectType) {
            editService.getEdit('Item',self.record,{},function(response){
                response.objectname = 'Item';
                if(response.data.item == null){response.data.item = {};}
                response.data.opportunity = self.defaultOpportunity;
                response.data.date = new Date();
                response.data.date = self.defaultDate;
                response.data.category = objectType;
                if(objectType == 1){response.data.travelField = true;}
                // console.log('item date is :'+response.data.item.item_date);
                self.objectList.push(response);
            },helperService.error_page);
        }
        self.removeObject = function (index) {
            self.objectList.splice(index,1);
        }
        self.clone = function () {
            for (var i = 0, len = self.selected.length; i < len; i++) {
                //console.log(self.selected[i].id);
                //console.log(self.selected[i]);
                editService.getEdit('Item',self.selected[i].id,{},function(response){
                    if(response.data.item == null){response.data.item = {};}
                    response.data.id = '';
                    response.data.status = 1;
                    response.data.attachment = '';
                    response.data.expense_id = '';
                    response.data.date = new Date();
                    response.data.date = self.defaultDate;
                    self.objectList.push(response);
                },helperService.error_page);
            }
        }
        self.save = function (object,index)
        {
            if (object.data.item.item_date == undefined){
                object.data.date = '';
                object.data.date = self.defaultDate.getFullYear()+"-"+(self.defaultDate.getMonth()+1)+"-"+self.defaultDate.getDate();
            }else {
                var tempdate = object.data.date;
                object.data.date = '';
                object.data.date = tempdate.getFullYear()+"-"+(tempdate.getMonth()+1)+"-"+tempdate.getDate();
            }
            //console.log(object.data.category);
            //console.log(object.data.date);
            object.data.itemname = '';
            editService.saveEdit('Item',object.data.id,object.data,function(response){
                // console.log(response);
                self.objectList.splice(index,1);
            });
            loadList('Item',self.query);
        };

        self.getStation = function (object){
            //console.log(object.travel.travelsubtype);
            if (object.travel.travelsubtype == 1 || object.travel.travelsubtype == 2 || object.travel.travelsubtype == 3 ||object.travel.travelsubtype == 4 ){
                $http
                    .get($rootScope.apiurl + 'TravelUtil/'+ object.travel.travelsubtype +'/?token='+$cookies.get('auth_token'))
                    .then(function (res) {
                        self.Ostations= res.data.data;
                        self.Dstations= res.data.data;
                    });
                object.travelField = false;
            }else {
                object.travelField = true;
            }
        }
        self.submitExpense = function () {
            editService.saveEdit('Expense', undefined, undefined, function (response) {
                // console.log(response);
            });
            loadList('Item', self.query);
        }

    }

})();