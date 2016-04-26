Template.AllStocks.helpers({
    totalsChart: function () {
        if (PortfolioTotal.findOne()) {
            var results = PortfolioTotal.findOne({
                owner: Meteor.userId()
            });
            //console.log(results.data[0].marketValue);
           
            
            var data = [];
            for (var i = 0; i < results.data.length; i++) {
                data.push([Date.parse(results.data[i].date), results.data[i].total])

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