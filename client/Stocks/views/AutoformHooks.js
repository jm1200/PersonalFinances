AutoForm.hooks({
//    stocksForm: {
//        before: {
//            insert: function (doc) {
//                //console.log(doc);
//                doc.owner = Meteor.userId();
//                doc.name = Session.get("stock").name;
//                doc.ticker = Session.get("stock").ticker;
//                doc.ask = Session.get("stock").ask;
//                doc.sellPrice = 0;
//
//
//
//                doc.marketValue = Math.round((Session.get("stock").ask * doc.shares) * 100) / 100;
//                doc.bookValue = Math.round((doc.buyPrice * doc.shares) * 100) / 100;
//                doc.profitPercent = Math.round(((doc.marketValue - doc.bookValue) / doc.bookValue) * 10000) / 100;
//                doc.profitDollars = Math.round((doc.marketValue - doc.bookValue) * 100) / 100;
//                if (!doc.account) {
//                    doc.account = "Main";
//                }
//
//                CashTransactions.insert({
//                    owner: doc.owner,
//                    action: "Withdrawl",
//                    date: new Date(),
//                    amount: doc.bookValue,
//                    notes: "Bought " + doc.shares + " shares of " + doc.ticker + " at " + doc.buyPrice + " for a total of " + doc.bookValue
//                })
//                Meteor.call('updateCashTotal', doc, doc.bookValue * -1);
//
//                return doc;
//
//
//
//            }
//        },
//        after: {
//            insert: function (error, result) {
//                Session.set("toggle-add-stock", false);
//                if (result) {
//                    $('#buyStockModal').modal('hide');
//                }
//
//                Meteor.call("updateTables", Meteor.userId());
//            }
//        }
//    },
    cashForm: {
        before: {
            insert: function (doc) {
                doc.owner = Meteor.userId();
                if (doc.action == "Withdrawl") {
                    doc.amount = doc.amount * -1;
                }
                if (CashTotal.findOne({
                        owner: doc.owner
                    })) {
                    Meteor.call("updateCashTotal", doc, doc.amount);

                } else {
                    CashTotal.insert({
                        owner: doc.owner,
                        date: new Date(),
                        total: doc.amount
                    });
                }
                return doc;
            }

        },
        after: {
            insert: function (doc) {
                $('#cashModal').modal('hide');
            }
        }

    },
//    sellStockForm: {
//        before: {
//            insert: function (doc) {
//                console.log("sell stock");
//                return doc;
//            }
//        },
//        after: {
//            insert: function (doc) {
//                $('#sellStockModal').modal('hide');
//            }
//        }
//    },
    insertStockTransactionForm: {
        before: {
            insert: function (doc) {
                
                console.log("stock transaction");
                //console.log(error);
                console.log("user ", Meteor.userId());
                doc.owner = Meteor.userId();
                doc.name = Session.get("stock").name;
                doc.ticker = Session.get("stock").ticker;
                doc.ask = Session.get("stock").ask;
                doc.bookValue = doc.price * doc.shares;
                
                doc.marketValue = doc.ask * doc.shares;
                doc.profitDollars = Math.round((doc.marketValue - doc.bookValue)*100)/100;
                doc.profitPercent = Math.round((doc.profitDollars/doc.bookValue)*10000)/100;
                
                if (!doc.account) {
                    doc.account = "Main";
                }
                

                console.log(doc);
                return doc;
            }
        },
        after: {
            insert: function (error, result) {
                //MAYBE update stocks and cash?
                if (result) {
                    $('#sellStockModal').modal('hide');
                    Meteor.call("updateTables", Meteor.userId());
                }
            }
        }
    }
});