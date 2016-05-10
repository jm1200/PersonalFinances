SyncedCron.add({
    name: 'Insert new StockTotals',
    schedule: function (parser) {
        // parser is a later.parse object
        //return parser.text('at 5:30pm');
        //return parser.text('every 1 minute');
        //adjust for UTC
        return parser.text('every weekday every 1 hours after 1:00pm before 10:00pm');
    },
    job: function () {
        //get array of users
        var users = [];
        var cursor = Meteor.users.find();
        cursor.forEach(function (user) {
            users.push(user._id);
        })


        //update all users totals
        for (var i = 0; i < users.length; i++) {

            if (Stocks.findOne({
                    owner: users[i]
                }) || CashTransactions.findOne({
                    owner: users[i]
                })) {





                //get portfolioValue for each user
                var portfolioValue = 0;
                if (StockSums.findOne({
                        owner: users[i]
                    })) {
                    //update stocks first
                    Meteor.call("updateStocksCron", users[i]);

                    var stockSums = StockSums.find({
                        owner: users[i]
                    }).fetch();

                    stockSums.forEach(function (elem) {
                        portfolioValue += elem.marketValue;
                    });

                }

                //get cash Value for each user
                var cash = 0;
                if (CashTransactions.findOne({
                        owner: users[i]
                    })) {
                    var cashSums = CashTransactions.find({
                        owner: users[i]
                    }).fetch();

                    cashSums.forEach(function (elem) {
                        if (elem.action == "Deposit") {
                            cash += elem.amount;
                        }
                        if (elem.action == "Withdrawl") {
                            cash -= elem.amount;
                        }


                    })
                }




                var total = portfolioValue + cash;
                var graphData = {
                    total: total,
                    date: new Date()
                };
                
                StockTotalPerformanceData.upsert({owner: users[i]}, {
                    $push: {data: graphData}
                });

            }


        }
        console.log("cron job completed");
    }

});

SyncedCron.start();