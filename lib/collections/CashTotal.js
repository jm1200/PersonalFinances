CashTotal = new Mongo.Collection('cashTotal');

CashTotal.allow({
    insert: function (userId, doc) {
        // only allow posting if you are logged in
        return !!userId;
    },
    update: function (userId, doc) {
        // only allow updating if you are logged in
        return !!userId;
    },
    remove: function (userId, doc) {
        //only allow deleting if you are owner
        return doc.owner === Meteor.userId();
    }
});

CashTotalSchema = new SimpleSchema({
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
        label: "Transaction date"
    },
    total: {
        type: Number,
        label: "Cash Total",
        decimal: true
    }
});

CashTotal.attachSchema(CashTotalSchema);