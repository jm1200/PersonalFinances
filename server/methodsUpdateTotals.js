Meteor.methods({
    updateStockTotals: function (user) {
        var docs = Stocks.find({
            owner: user
        }).fetch();
        var sums = [];
        docs.reduce(function (res, value) {
            if (!res[value.ticker]) {
                res[value.ticker] = {
                    owner: value.owner,
                    ticker: value.ticker,
                    shares: 0,
                    bookValue: 0,
                    marketValue: 0,
                    profitDollars: 0,
                    profitPercent: 0
                }
                sums.push(res[value.ticker]);
            }
            if (value.action == "Buy") {
                res[value.ticker].shares += value.shares;
                res[value.ticker].bookValue += value.shares * value.price;
                res[value.ticker].marketValue += value.shares * value.ask;
            }
            if (value.action == "Sell") {
                res[value.ticker].shares -= value.shares;
                res[value.ticker].bookValue -= value.shares * value.price;
                res[value.ticker].marketValue -= value.shares * value.ask;
            }
            res[value.ticker].profitDollars = roundDollars(res[value.ticker].marketValue - res[value.ticker].bookValue);
            res[value.ticker].profitPercent = roundPercent(res[value.ticker].profitDollars / res[value.ticker].bookValue);
            return res;

        }, {});
        //console.log(sums);
        //upsert the new stock sums data
        sums.forEach(function (obj) {
            if (obj.shares == 0) {
                StockSums.remove({
                    owner: obj.owner,
                    ticker: obj.ticker
                });
            } else {
                StockSums.upsert({
                    ticker: obj.ticker,
                    owner: obj.owner
                }, {
                    $set: obj
                });
            }
        });
        var portfolioValue = 0;
        var totalBookValue = 0;
        var stockSums = StockSums.find({
            owner: user
        }).fetch();

        stockSums.forEach(function (elem) {
            portfolioValue += elem.marketValue;
            totalBookValue += elem.bookValue;
        });

        var profit = portfolioValue - totalBookValue;
        var cash = 0;
        var cashSums = CashTransactions.find({
            owner: user
        }).fetch();

        cashSums.forEach(function (elem) {
            if (elem.action == "Deposit") {
                cash += elem.amount;
            }
            if (elem.action == "Withdrawl") {
                cash -= elem.amount;
            }
            if (elem.actionFrom == "Dividend") {
                profit += elem.amount;
            }
            if (elem.actionFrom == "Currency Exchange") {
                if (elem.action == "Deposit") {
                    profit += elem.amount;
                }
                if (elem.action == "Withdrawl") {
                    profit -= elem.amount;
                }

            }

        })


        var total = portfolioValue + cash;
        var unrealizedProfit = portfolioValue - totalBookValue;
        var percent = roundPercent(unrealizedProfit / totalBookValue);


        return {
            portfolioValue: formatDollars(portfolioValue),
            totalValue: formatDollars(total),
            cash: formatDollars(cash),
            profit: formatDollars(profit),
            bookValue: formatDollars(totalBookValue),
            marketValue: formatDollars(portfolioValue),
            profitDollars: formatDollars(unrealizedProfit),
            profitPercent: percent + "%"
        }
    }
})