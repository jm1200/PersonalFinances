Template.StockGroups.helpers({
    graph: function () {
            //Get data for all accounts pie chart
            if (StockSums.findOne()) {
                var data = [];
                var result = StockSums.find({
                    owner: Meteor.userId()
                }).fetch().map(function (elem, i) {
                    return data[i] = [elem.ticker, elem.marketValue]
                });
                
                console.log(data);
                
                var graph = function (data, title) {
                    return {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false
                        },
                        title: {
                            text: title
                        },
                        tooltip: {
                            pointFormat: '<b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                    style: {
                                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                    },
                                    connectorColor: 'silver'
                                }
                            }
                        },
                        series: [{
                            type: 'pie',
                            name: 'genre',
                            data: data

                        }]
                    };
                }
                console.log(graph(data, "Stocks Summary"));
                return graph(data, "Stocks Summary");



            } //if StockSums.find  
        } //end graph method

})//Template Account helper