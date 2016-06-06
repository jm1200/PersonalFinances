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
            var marketValueData = [];
            var bookValueData = [];
            
            var result = StockTotalPerformanceData.findOne({
                owner: Meteor.userId()
            }).data;
            var result1 = StockTotalPerformanceData.findOne({
                owner: Meteor.userId()
            }).marketValue;
            var result2 = StockTotalPerformanceData.findOne({
                owner: Meteor.userId()
            }).bookValue;


            result.map(function (elem, i) {
                return data[i] = [Date.parse(elem.date), roundDollars(elem.total)];
            });
            result1.map(function (elem, i) {
                return marketValueData[i] = [Date.parse(elem.date), roundDollars(elem.total)];
            });
            result2.map(function (elem, i) {
                return bookValueData[i] = [Date.parse(elem.date), roundDollars(elem.total)];
            });

            var graph = function (data, marketValueData, bookValueData) {
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
                        name: 'Portfolio Value',
                        data: data

                    },{
                        name: 'Market Value',
                        data: marketValueData
                    },{
                        name: 'Book Value',
                        data: bookValueData
                    }]
                };
            }

            return graph(data,marketValueData, bookValueData);
        }
    }
})