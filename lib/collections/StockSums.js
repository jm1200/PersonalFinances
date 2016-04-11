StockSums = new Mongo.Collection('stockSums');

StockSums.allow({
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

StockSumsSchema = new SimpleSchema({
    owner: {
        type: String,
        label: "Owner",
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
     ticker: {
        type: String,
        label: "Ticker",
        autoform: {
            type: "hidden"
        }
    },
    shares: {
        type: Number,
        label: "Shares",
        optional: true
    },
    bookValue:{
        type: Number,
        label: "Book Values",
        optional: true,
        decimal: true
    },
    marketValue: {
        type: Number,
        label: "Market Value",
        optional: true,
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

    }
});

StockSums.attachSchema(StockSumsSchema);



TabularTables.StockSums = new Tabular.Table({
    selector: function (userId) {
        return {
            owner: userId
        }
    },
    name: "StockSums",
    collection: StockSums,
    columns: [
        {
            data: "ticker",
            title: "Ticker"
        },
        {
            data: "shares",
            title: "Shares"
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
        }
  ]
});