(function(){
    angular
        .module('layout')
        .controller('DashboardController', [
            'helperService','editService','listService','$routeParams','$location','$rootScope','$http','DashboardService',
            DashboardController
        ]);

    function DashboardController(helperService,editService,listService,$routeParams,$location,$rootScope,$http,DashboardService) {
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
        self.headsTravelType ={};self.totalTravelType = 0;self.listdatasTravelType =[];
        self.headsTravelSubType ={};self.totalTravelSubType = 0;self.listdatasTravelSubType =[];
        self.headsServiceType ={};self.totalServiceType = 0;self.listdatasServiceType =[];
        self.headsBRTStation ={};self.totalBRTStation = 0;self.listdatasBRTStation =[];
        self.headsBTSStation ={};self.totalBTSStation = 0;self.listdatasBTSStation =[];
        self.headsMRTStation ={};self.totalMRTStation = 0;self.listdatasMRTStation =[];
        self.headsOpportunity ={};self.totalOpportunity = 0;self.listdatasOpportunity =[];
        self.headsAirPortRailLinkStation ={};self.totalAirPortRailLinkStation = 0;self.listdatasAirPortRailLinkStation =[];
        self.queryItem ={search: "", order:null, limit : 25, page : 1};
        self.queryselectOption ={search: "", order:null, limit : 100, page : 1};
        //self.selected = [ ];
        self.promiseItem = {}; self.promiseTravelType = {}; self.promiseTravelSubType = []; self.promiseServiceType = [];
        self.promiseBRTStation = {};self.promiseBTSStation = {};self.promiseMRTStation = {};self.promiseAirPortRailLinkStation = {};
        self.promiseOpportunity =[];
        self.loadList = loadList;
        //construct
        // loadList('TravelType',self.queryselectOption);
        // loadList('TravelSubType',self.queryselectOption);
        // loadList('ServiceType',self.queryselectOption);
        // loadList('BRTStation',self.queryselectOption);
        // loadList('BTSStation',self.queryselectOption);
        // loadList('MRTStation',self.queryselectOption);
        // loadList('AirPortRailLinkStation',self.queryselectOption);
        // loadList('Opportunity',self.queryselectOption);
        // loadList('Item',self.queryItem);
        //list function
        self.showHideTravelList = function (){self.showItemList = !self.showItemList;}
        function loadList(object, query)
        {
            self['promise'+object] = listService.getList(object,query,function (response) {
                var listInfo = response.listInfo;
                self['heads'+object] = response.header;
                self['total'+object] = listInfo.total;
                self['listdatas'+object] = listInfo.data;
            });
        }
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
            if(object.origination != undefined && object.destination != undefined) {
                $http
                    .get($rootScope.apiurl + 'getpublictransportcost/' + object.travel_sub_type + '/' + object.origination + '/' + object.destination)
                    .then(function (res) {
                        object.item.cost = parseFloat(res.data.data[0]['cost']);
                    });
            }
        }
        self.addObject = function (objectType) {
            editService.getEdit(objectType,self.record,{},function(response){
                response.objectname = objectType;
                if(response.data.item == null){response.data.item = {};}
                response.data.item.itemname =  self.defaultItemName;
                response.data.item.opportunity = self.defaultOpportunity;
                response.data.item_date = new Date();
                response.data.item_date = self.defaultDate;
                response.data.item.item_date = '';
                response.data.item.item_date = self.defaultDate.getFullYear()+"-"+(self.defaultDate.getMonth()+1)+"-"+self.defaultDate.getDate();
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