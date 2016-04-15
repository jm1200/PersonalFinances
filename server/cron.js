SyncedCron.add({
    name: 'Insert new StockTotals',
    schedule: function (parser) {
        // parser is a later.parse object
        //return parser.text('at 5:30pm');
        //return parser.text('every 1 minute');
        return parser.text('every weekday every 1 hours after 9:00am before 6:00pm');
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
            //update stocks first
            Meteor.call("updateStocks", users[i]);

            var docs = Stocks.find({
                owner: users[i]
            }).fetch();

            var stockTotal = {
                owner: users[i],
                date: new Date,
                shares: 0,
                bookValue: 0,
                marketValue: 0,
                profitDollars: 0,
                profitPercent: 0
            };

            docs.forEach(function (doc) {
                stockTotal.shares += doc.shares;
                stockTotal.bookValue += doc.bookValue;
                stockTotal.marketValue += doc.marketValue;

            });
            stockTotal.profitDollars = roundDollars(stockTotal.marketValue - stockTotal.bookValue);
            stockTotal.profitPercent = roundPercent((stockTotal.marketValue - stockTotal.bookValue) / stockTotal.bookValue);

            StockTotalPerformanceData.upsert({
                owner: stockTotal.owner     
            }, {
                $push: {
                    data: stockTotal
                }
            })
        }

        console.log("cron job completed");
    }

});

SyncedCron.start();