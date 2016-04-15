Template.AllStocks.helpers({
    totalsChart: function () {
        if (StockTotalPerformanceData.findOne()) {
            var results = StockTotalPerformanceData.findOne({
                owner: Meteor.userId()
            });
            //console.log(results.data[0].marketValue);

            var data = [];
            for (var i = 0; i < results.data.length; i++) {
                data.push([results.data[i].date, results.data[i].marketValue])

            }
            return {
                title: {
                    text: (function () {
                        if (Meteor.user()) {
                            return Meteor.user().username + "'s performance";
                        } else {
                            return "Your Stocks";
                        }
                    })()
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
                    name: "test1",
                    data: data
            }]

            };
        }
    }

})