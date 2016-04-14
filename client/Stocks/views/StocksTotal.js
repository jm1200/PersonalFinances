Template.StocksTotal.helpers({
    bookValue: function () {
        return getTotals("bookValue");
    },
    marketValue: function () {
        return getTotals("marketValue");

    },
    profitDollars: function () {
        return getTotals("profitDollars");

    },
    profitPercent: function () {
        return getTotals("profitPercent");
    }
})

function getTotals(value) {
    if (StockTotal.findOne({
            owner: Meteor.userId()
        })) {
        return formatDollars(StockTotal.findOne({
            owner: Meteor.userId()
        }, {
            sort: {
                date: -1,
                limit: 1
            }
        })[value]);
    } else {
        return "No data yet";
    }
}