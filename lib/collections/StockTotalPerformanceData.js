StockTotalPerformanceData = new Mongo.Collection('stockTotalPerformanceData');

StockTotalPerformanceData.allow({
    insert: function (userId, doc) {
        // only allow posting if you are logged in
        return !!userId;
    },
    update: function (userId, doc) {
        // only allow updating if you are logged in
        return !!userId;
    },
    remove: function (userID, doc) {
        //only allow deleting if you are owner
        return doc.owner === Meteor.userId();
    }
});

//StockTotalsDataSchema = new SimpleSchema({
//    owner: {
//        type: String,
//        label: "Owner",
//        optional: true,
//        autoform: {
//            type: "hidden"
//        }
//    },
//    data: {
//        type: [Object],
//        optional: true
//    }
//})
//
//StockTotalPerformanceData.attachSchema(StockTotalsDataSchema);