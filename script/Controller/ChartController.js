/**
 * Created by Asus on 15/11/2559.
 */
(function(){

    angular
        .module('layout')
        .controller('ChartController', [
            'ChartService','$http','$rootScope',
            ChartController
        ]);
    function ChartController(ChartService,$http,$rootScope) {
        var self = this;
        self.columnchart =[];
        $http
            .get($rootScope.apiurl + 'columnchart')
            .then(function (res) {
                self.columnchart = res.data.data;
            });
        $http
            .get($rootScope.apiurl + 'piechart')
            .then(function (res) {
                self.piechart = res.data.data;
                console.log(self.piechart)
            });
        // Load Charts and the corechart and barchart packages.
        google.charts.load('current', {'packages':['corechart']});

// Draw the pie chart and bar chart when Charts is loaded.
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Topping');
            data.addColumn('number', 'Slices');
            data.addRows([
                ['Last 4 Month', self.columnchart[4]],
                ['Last 3 Month', self.columnchart[3]],
                ['Last 2 Month', self.columnchart[2]],
                ['Last Month', self.columnchart[1]],
                ['This Month', self.columnchart[0]]
            ]);
            var bardata = new google.visualization.DataTable();
            bardata.addColumn('string', 'Topping');
            bardata.addColumn('number', 'Slices');
            bardata.addRows([
                [self.piechart[0]['name'], self.piechart[0]['cost']],
                [self.piechart[1]['name'], self.piechart[1]['cost']],
                [self.piechart[2]['name'], self.piechart[2]['cost']],
                [self.piechart[3]['name'], self.piechart[3]['cost']]
            ]);

            var barchart_options = {title:'Bar Chart: company expenses by Opportunity',
                width:400,
                height:300};
            var barchart = new google.visualization.BarChart(document.getElementById('piechart_div'));
            barchart.draw(bardata, barchart_options);

            var columnchart_options = {title:'Column Chart: Company expense summary by month',
                width:400,
                height:300,
                legend: 'none'};
            var ColumnChart = new google.visualization.ColumnChart(document.getElementById('barchart_div'));
            ColumnChart.draw(data,columnchart_options);

            var piechart_options = {title:'Pie Chart: company expenses by Opportunity proportion',
                width:400,
                height:300};
            var piechart = new google.visualization.PieChart(document.getElementById('Pjune'));
            piechart.draw(bardata, piechart_options);
        }
    }

})();
