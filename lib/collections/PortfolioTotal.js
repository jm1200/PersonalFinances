PortfolioTotal = new Mongo.Collection('portfolioTotal');


PortfolioTotal.allow({
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

PortfolioTotalSchema = new SimpleSchema({
    owner: {
        type: String,
        label: "Owner",
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    portfolioValue: {
        type: Number,
        optional: true,
        decimal: true
    },
    profit: {
        type: Number,
        optional: true,
        decimal: true
    },
    cash: {
        type: Number,
        optional: true,
        decimal: true
    },
    totalValue: {
        type: Number,
        optional: true,
        decimal: true
    }
});

PortfolioTotal.attachSchema(PortfolioTotalSchema);
