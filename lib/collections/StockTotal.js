StockTotal = new Mongo.Collection('stockTotal');

StockTotal.allow({
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

StockTotalSchema = new SimpleSchema({
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
        label: "Date",
        optional: true
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

StockTotal.attachSchema(StockTotalSchema);