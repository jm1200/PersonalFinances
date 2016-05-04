Template.StocksTotal.onCreated(function () {
    Meteor.call("updateStockTotals", Meteor.userId(), function (error, result) {
        Session.set("totals", result);
    })
});

Template.StocksTotal.helpers({
    totals: function () {
        return Session.get("totals");
    },
    totalsGraph: function () {
        if (StockTotalPerformanceData.findOne()) {


            var data = [];
            var result = StockTotalPerformanceData.findOne({
                owner: Meteor.userId()
            }).data;


            result.map(function (elem, i) {
                return data[i] = [Date.parse(elem.date), roundDollars(elem.total)];
            });

            var graph = function (data) {
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
                        text: "Total Portfolio Value Over Time"
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

            return graph(data);
        }
    }
})