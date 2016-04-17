Template.Accounts.helpers({
    Accounts: function () {

        var graph = (function () {
            if (StockAccounts.findOne()) {
                var results = StockAccounts.find({
                    owner: Meteor.userId()
                }).fetch();

                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push([results[i].account, results[i].marketValue]);
                }
                console.log(data);
                return {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: Meteor.user().username + "'s Accounts"
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
        })()
        return graph;

    },
    graphs: function () {
        var allAccounts = function () {
            if (StockAccounts.findOne()) {
                var results = StockAccounts.find({
                    owner: Meteor.userId()
                }).fetch();

                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push([results[i].account, results[i].marketValue]);
                }
                return data;
            }
        }

        var getdata2 = function () {
            return [
                ['TEST', 34],
                ['YUP', 66]
            ]
        }

        var graph = function (data) {
            return {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: Meteor.user().username + "'s Accounts"
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

        return [
            {
                chartObject: graph(getdata2()),
                graphId: "graph1"
            },
            {
                chartObject: graph(allAccounts()),
                graphId: "graph2"
            }
        ];

    }
})



function buildGraph() {
    if (StockAccounts.findOne()) {
        var results = StockAccounts.find({
            owner: Meteor.userId()
        }).fetch();

        var data = [];
        for (var i = 0; i < results.length; i++) {
            data.push([results[i].account, results[i].marketValue]);
        }
        return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: Meteor.user().username + "'s Accounts"
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
}