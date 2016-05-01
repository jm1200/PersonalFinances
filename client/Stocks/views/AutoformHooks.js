AutoForm.hooks({
    cashForm: {
        before: {
            insert: function (doc) {
                doc.owner = Meteor.userId();
                
                return doc;
            }

        },
        after: {
            insert: function (error, result) {
                if (result) {
                    $('#cashModal').modal('hide');
                    Meteor.call("updateStockTotals", Meteor.userId(), function (error, result) {
                        Session.set("totals", result);
                    });
                }

            }
        }

    },
    insertStockTransactionForm: {
        before: {
            insert: function (doc) {
                doc.owner = Meteor.userId();
                doc.name = Session.get("stock").name;
                doc.ticker = Session.get("stock").ticker;
                doc.ask = Session.get("stock").ask;
                doc.bookValue = doc.price * doc.shares;

                doc.marketValue = doc.ask * doc.shares;
                doc.profitDollars = Math.round((doc.marketValue - doc.bookValue) * 100) / 100;
                doc.profitPercent = Math.round((doc.profitDollars / doc.bookValue) * 10000) / 100;

                if (!doc.account) {
                    doc.account = "Main";
                }
                


                //console.log(doc);
                return doc;
            }
        },
        after: {
            insert: function (error, result) {
                //MAYBE update stocks and cash?
                
                if (result) {
                    Meteor.call("stockTransaction", result);
                    $('#sellStockModal').modal('hide');
                    Meteor.call("updateTables", Meteor.userId());
                    Meteor.call("updateStockTotals", Meteor.userId(), function (error, result) {
                        Session.set("totals", result);
                    })
                }
            }
        }
    }
});