CashTransactions = new Mongo.Collection('cashTransactions');

CashTransactions.allow({
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

CashTransactionsSchema = new SimpleSchema({
    owner: {
        type: String,
        label: "Owner",
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
     action: {
        type: String,
        label: " ",
        allowedValues: ["Deposit", "Withdrawl"],
        autoform: {
            type: "select-radio-inline"
        }
    },
    date: {
        type: Date,
        label: "Transaction date"
    },
    amount: {
        type: Number,
        label: "Dollar Amount",
        decimal: true
    },
    notes: {
        type: String,
        label: "Notes",
        optional: true,
        autoform: {
            rows: 10
        }
    }
});

CashTransactions.attachSchema(CashTransactionsSchema);