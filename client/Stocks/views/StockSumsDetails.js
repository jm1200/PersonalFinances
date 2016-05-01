Template.StockSumsDetails.events({
    'click .stock-sums-details-graph': function (event) {
        Session.set("stockSumsDetailsGraph", this.ticker);
                $('#stockSumsDetailsGraphModal').modal('show');
                setTimeout(function () {
                    //console.log("reflow");
                    $("#stockSumsDetails").highcharts().reflow();
                }, 200);


    },
    'click .stock-sums-details-table': function (event) {
        Session.set("stockSumsDetailsGraph", this.ticker);
        $('#stockSumssDetailsTableModal').modal('show');
        $('#DataTables_Table_2').addClass("table-striped");
        $('#DataTables_Table_2').addClass("table-bordered");



    },
    'click .on-close': function () {
        Session.set('stockSumsDetailsGraph', false);
    }
});

dataTableData2 = function () {
    var ticker = Session.get("stockSumsDetailsGraph");
    return Stocks.find({
        owner: Meteor.userId(),
        ticker: ticker
    }).fetch(); // or .map()
};

Template.StockSumsTable.helpers({
    reactiveDataFunction: function () {
        return dataTableData2;
    },
    optionsObject: {
        columns: [
            {
                title: 'Date',
                data: 'date',
                render: function (val, type, doc) {
                    if (val instanceof Date) {
                        return moment.utc(val).format("LL");
                    } else {
                        return "";
                    }
                }
        }, {
                title: 'Ticker',
                data: 'ticker'
        }, {
                title: 'Shares',
                data: 'shares'
        }, {
                title: 'Action',
                data: 'action'
        }, {
                title: 'Price',
                data: 'price'
        }]

    }
})

Template.StockSumsGraph.helpers({
    stockSumsGraph: function () {
        if (Stocks.findOne()) {

            var ticker = Session.get("stockSumsDetailsGraph");
            var data = [];
            var result = Stocks.find({
                owner: Meteor.userId(),
                ticker: ticker
            }).fetch().map(function (elem, i) {
                return data[i] = [Date.parse(elem.date), elem.price];
            });
            
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

                    xAxis: {
                        type: "datetime"
                    },
                    plotOptions: {
                        series: {
                            allowPointSelect: true
                        }
                    },
                    series: [{
                        name: 'Price',
                        data: data

                    }]
                };
            }
            
             return graph(data, ticker);
        }


    }
})