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
        label: "Ticker"   
    },
    name: {
        type: String,
        label: "Name",
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    action: {
        type: String,
        label: " ",
        allowedValues: ["Buy", "Sell"],
        autoform: {
            type: "select-radio-inline"
        }
    },
    price: {
        type: Number,
        label: "Share Price",
        decimal: true
    },
    shares: {
        type: Number,
        label: "Shares"
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
            data: "action",
            title: "Action",
        },
        {
            data: "price",
            title: "Price",
            render: function (val) {
                return formatDollars(val);
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
                return formatDollars(val);
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