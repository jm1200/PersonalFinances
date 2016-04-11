Stocks = new Mongo.Collection('stocks');



Stocks.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId; 
  },
  update: function(userId, doc) {
    // only allow updating if you are logged in
    return !! userId; 
  },
  remove: function(userID, doc) {
    //only allow deleting if you are owner
    return doc.owner === Meteor.userId();
  }
});






StocksSchema = new SimpleSchema({
    owner: {
        type: String,
        label: "Owner",
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    date: {
        type: Date,
        label: "Date Bought"

    },
    ticker: {
        type: String,
        label: "Ticker",
        autoform: {
            type: "hidden"
        }
    },
    name: {
        type: String,
        label: "Name",
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    buyPrice: {
        type: Number,
        label: "Buy Price",
        optional: true,
        decimal: true
    },
    sellPrice: {
        type: Number,
        label: "Sell Price",
        optional: true,
        decimal: true
    },
    shares: {
        type: Number,
        label: "Shares",
        optional: true
    },
    ask: {
        type: Number,
        label: "Ask Price",
        optional: true,
        autoform: {
            type: "hidden"
        },
        decimal: true
    },
    bookValue: {
        type: Number,
        label: "Book Value",
        optional: true,
        autoform: {
            type: "hidden"
        },
        decimal: true
    },
    marketValue: {
        type: Number,
        label: "Market Value",
        optional: true,
        autoform: {
            type: "hidden"
        },
        decimal: true
    },
    profitPercent: {
        type: Number,
        label: "Market Value",
        optional: true,
        autoform: {
            type: "hidden"
        },
        decimal: true

    },
    profitDollars: {
        type: Number,
        label: "Market Value",
        optional: true,
        autoform: {
            type: "hidden"
        },
        decimal: true

    },
    account: {
        type: String,
        label: "Account",
        optional: true
    }
});

Stocks.attachSchema(StocksSchema);

//TabularTables = {};

TabularTables.Stocks = new Tabular.Table({
    selector: function (userId) {
        return {
            owner: userId
        }
    },
    name: "Stocks",
    collection: Stocks,
    columns: [
        {
            data: "date",
            title: "Date Bought",
            render: function (val, type, doc) {
                if (val instanceof Date) {
                    return moment.utc(val).format("LL");
                } else {
                    return "";
                }
            }
        },
        {
            data: "ticker",
            title: "Ticker"
        },
        {
            data: "name",
            title: "Name"
        },
        {
            data: "buyPrice",
            title: "Buy Price",
            render: function (val) {
                if (val) {
                    return "$" + val;
                } else {
                    return "";
                }
            }
        },
        {
            data: "sellPrice",
            title: "Sell Price",
            render: function (val) {
                if (val) {
                    return "$" + val;
                } else {
                    return "";
                }
            }
        },
        {
            data: "shares",
            title: "Shares"
        },
        {
            data: "ask",
            title: "Current Ask Price",
            render: function (val) {
                return "$" + val;
            }
        },
        {
            data: "bookValue",
            title: "Book Value",
            render: function (val) {
                return formatDollars(val);
            }
        },
        {
            data: "marketValue",
            title: "Market Value",
            render: function (val) {
                return formatDollars(val);
            }
        },
        {
            data: "profitDollars",
            title: "Profit/Loss($)",
            render: function (val) {
                return formatDollars(val);
            }
        },
        {
            data: "profitPercent",
            title: "Profit/Loss(%)",
            render: function (val) {
                return val + "%";
            }
        },
        {
            data: "account",
            title: "Account"
        },
        {
            tmpl: Meteor.isClient && Template.DeleteStock
        }
  ]
});