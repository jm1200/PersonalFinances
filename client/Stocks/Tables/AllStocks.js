Template.AllStocks.helpers({
    totalsChart: function () {
        return {
            title: {
                text: (function(){
                    if(Meteor.user()){
                       return Meteor.user().username + "'s performance";
                    } else {
                        return "Your Stocks";
                    }
                })()
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            plotOptions: {
                series: {
                    allowPointSelect: true
                }
            },
            series: [{
                name: "test1",
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            },{
                name: "test2",
                data: [32.9, 90.5, 132.4, 111.2, 56.0, 54.0, 87.6, 56.5, 45.4, 234.1, 123.6, 23.4]
            }]

        };
    }

})