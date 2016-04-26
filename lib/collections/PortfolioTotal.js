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

dataSchema = new SimpleSchema({
     total: {
        type: Number,
        label: "Total Value",
        optional: true,
        decimal: true
    },
    date: {
        type: Date,
        label: "Date",
        optional: true
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
    data: {
        type: [dataSchema],
        optional: true
    }
});

PortfolioTotal.attachSchema(PortfolioTotalSchema);
