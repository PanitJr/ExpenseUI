(function(){
    angular
        .module('layout')
        .controller('DashboardController', [
            'helperService','editService','listService','$routeParams','$location','$http','DashboardService','$cookies',
            DashboardController
        ]);

    function DashboardController(helperService,editService,listService,$location,$rootScope,$http,DashboardService,$cookies) {
        var self = this;
        self.showItemlList = true;
        self.defaultVal = false;
        self.defaultItemName = '';
        self.defaultOpportunity = '';
        self.defaultDate = new Date();
        self.limitoption =[25,50,100];
        self.objectname = '';
        self.tempcost = 0.0;
        self.objectList = [];
        self.selected = [];
        self.record = '';
        self.headsItem ={};self.totalItem = 0;self.listdatasItem =[];

        self.queryItem ={search: "", order:null, limit : 25, page : 1};
        self.queryselectOption ={search: "", order:null, limit : 100, page : 1};
        //self.selected = [ ];
        self.promiseItem = {};
        self.loadList = loadList;
        //construct
        loadList('Item',self.queryItem);
        //list function
        self.cancleSearch = function () {
            self.queryItem.search = "";
            loadList('Item',self.queryItem);
        }
        self.onReorder = function (order)
        {
            self.queryItem = angular.extend({},self.queryItem,{order:order});
            loadList('Item',self.queryItem);
        }
        self.onPaginate = function (page, limit)
        {
            self.queryItem = angular.extend({},self.queryItem,{page:page,limit:limit});
            loadList('Item',self.queryItem);
        }
        self.getDetail = function (record)
        {
            $location.path('/Item/detail/'+record);
        }
        self.submitToExpense = function () {
            DashboardService.submit('Item',self.record,self.record,function(response){
                loadList('Item',self.queryItem);
            });
        }
        //add function
        self.getitemcost = function (object) {
            if(object.travel.origination != undefined && object.travel.destination != undefined) {
                $http
                    .get($rootScope.apiurl + 'TravelUtil/'+ object.travel.travelsubtype +'/' + object.travel.origination +
                        '/' + object.travel.destination+'?token='+$cookies.get('auth_token'))
                    .then(function (res) {
                        object.item.cost = parseFloat(res.data[0]['cost']);
                    });
            }
        }
        self.onChangeSubtravel = function (object) {
            if(object.travel.origination != undefined && object.travel.destination != undefined) {
                $http
                    .get($rootScope.apiurl + 'TravelUtil/'+ object.travel.travelsubtype +'/?token='+$cookies.get('auth_token'))
                    .then(function (res) {
                        self.subTravelType = res.data;
                    });
            }
        }
        self.addObject = function (objectType) {
            editService.getEdit('Item',self.record,{},function(response){
                response.objectname = 'Item';
                if(response.data.item == null){response.data.item = {};}
                response.data.itemname =  self.defaultItemName;
                response.data.opportunity = self.defaultOpportunity;
                response.data.date = self.defaultDate;
                response.data.category = objectType;
                // console.log('item date is :'+response.data.item.item_date);
                self.objectList.push(response);
            },helperService.error_page);
        }
        self.removeObject = function (index) {
            self.objectList.splice(index,1);
        }
        self.clone =function () {
            for (var i = 0, len = self.selected.length; i < len; i++) {
                console.log(self.selected[i][self.selected[i].category.toLowerCase()].id);
                //console.log(self.selected[i]);
                editService.getEdit(self.selected[i].category,self.selected[i][self.selected[i].category.toLowerCase()].id,{},function(response){
                    if(response.data.item == null){response.data.item = {};}
                    response.data.item_date = new Date();
                    response.data.item_date = self.defaultDate;
                    response.data.item.item_date = '';
                    response.data.item.item_date = self.defaultDate.getFullYear()+"-"+(self.defaultDate.getMonth()+1)+"-"+self.defaultDate.getDate();
                    self.objectList.push(response);
                },helperService.error_page);
            }
        }
        self.save = function (object,index)
        {
            object.data.item.id = '';
            if (object.data.item.item_date == undefined){
                object.data.item.item_date = '';
                object.data.item.item_date = self.defaultDate.getFullYear()+"-"+(self.defaultDate.getMonth()+1)+"-"+self.defaultDate.getDate();
            }else {
                object.data.item.item_date = '';
                object.data.item.item_date = object.data.item_date.getFullYear()+"-"+(object.data.item_date.getMonth()+1)+"-"+object.data.item_date.getDate();
            }
            object.data.item.status = 'rejected';
            console.log('df date is :'+self.defaultDate);
            console.log('item date is :'+object.data.item.item_date);
            object.data.item.category = object.objectname;
            editService.saveEdit('Item',self.record,object.data.item,function(response){
                // console.log(response);
                object.data.item_id = response.id;
                editService.saveEdit(object.objectname,self.record,object.data,function(response){
                    self.objectList.splice(index,1);
                });

            });
            loadList('Item',self.queryItem);
        };

    }

})();