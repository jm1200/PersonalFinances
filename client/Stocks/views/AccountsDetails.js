Template.AccountsDetails.events({
    'click .accounts-details-graph': function (event) {
        Session.set("accountDetailsGraph", this.account);
        $('#accountsDetailsGraphModal').modal('show');
        setTimeout(function () {
            console.log("reflow");
            $("#accountsDetails").highcharts().reflow();
        }, 200);


    },
    'click .accounts-details-table': function (event) {
        Session.set("accountDetailsGraph", this.account);
        $('#accountsDetailsTableModal').modal('show');
        $('#DataTables_Table_0').addClass("table-striped");
        $('#DataTables_Table_0').addClass("table-bordered");



    },
    'click .on-close': function () {
        Session.set('accountDetailsGraph', false);
    }
});

Template.DetailsModals.events({
    'click .on-close': function () {
        Session.set('accountDetailsGraph', false);
    }
});
dataTableData = function () {
    var account = Session.get("accountDetailsGraph");
    return Stocks.find({
        owner: Meteor.userId(),
        account: account
    }).fetch(); // or .map()
};

Template.AccountsTable.helpers({
    reactiveDataFunction: function () {
        return dataTableData;
    },
    optionsObject: {
        columns: [{
            title: 'Ticker',
            data: 'ticker'
        }, {
            title: 'Shares',
            data: 'shares'
        }]

    }
})

Template.AccountsGraph.helpers({
    accountsGraph: function () {
        if (Session.get("accountDetailsGraph")) {
            var account = Session.get("accountDetailsGraph");
            if (Stocks.findOne()) {
                var result = Stocks.find({
                    owner: Meteor.userId(),
                    account: account
                }).fetch();
                //console.log("Result: ", result);
                var data = result.map(function (elem) {
                        return {
                            ticker: elem.ticker,
                            marketValue: elem.marketValue,
                            account: elem.account
                        }
                    }).reduce(function (res, value) {
                        //console.log(res);
                        if (!res[value.ticker]) {
                            res[value.ticker] = {
                                ticker: value.ticker,
                                marketValue: 0,
                                account: value.account
                            }
                        }
                        res[value.ticker].marketValue += value.marketValue;
                        return res;
                    }, {})
                    //console.log("data: ", data);
                var graphData = [];

                for (obj in data) {
                    graphData.push([data[obj].ticker, data[obj].marketValue]);
                };
                //console.log(graphData);

                var graph = function (data, title) {
                    return {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            renderTo: "conatiner",
                            func: function (chart) {
                                setTimeout(function () {
                                    chart.reflow();
                                }, 0);
                            },
                            events: {
                                load: function () {
                                    $(window).resize();
                                }
                            }
                        },
                        func: function (chart) {
                            setTimeout(function () {
                                chart.reflow();
                            }, 0);
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

                //                var graph = {
                //                    chartObject: graph(graphData, account),
                //                    graphId: account
                //                }
                //console.log(graph);

                return graph(graphData, account);

            }
        }
        //var data = [];



    }
})