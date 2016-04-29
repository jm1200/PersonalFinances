Meteor.methods({
    updateStockTotals: function (user) {
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
        var percent = roundPercent(unrealizedProfit/totalBookValue);
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