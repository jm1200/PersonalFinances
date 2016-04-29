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
     stockTransaction: {
        type: String,
        label: "Stock Transaction",
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    action: {
        type: String,
        label: "Transaction Type",
        allowedValues: ["Deposit", "Withdrawl"],
        autoform: {
            type: "select-radio-inline"
        }
    },
    actionFrom: {
        type: String,
        label: "Transaction From",
        allowedValues: ["Personal Account", "Dividend", "Currency Exchange"],
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

TabularTables = {};

TabularTables.Stocks = new Tabular.Table({
    selector: function (userId) {
        return {
            owner: userId
        }
    },
    name: "CashTransactions",
    collection: CashTransactions,
    columns: [
        {
            data: "date",
            title: "Transaction Date",
            render: function (val, type, doc) {
                if (val instanceof Date) {
                    return moment.utc(val).format("LL");
                } else {
                    return "";
                }
            }
        },
        {
            data: "action",
            title: "Transaction"
        },
        {
            data: "actionFrom",
            title: "From"
        },
        {
            data: "amount",
            title: "Amount",
            render: function (val) {
                return formatDollars(val);
            }

        },
        {
            data: "notes",
            title: "Notes",
        },
        {
            tmpl: Meteor.isClient && Template.DeleteCash
        }
  ]
});