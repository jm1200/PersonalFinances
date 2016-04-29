Template.DeleteCash.events({
    'click .delete-cash': function (event) {

        var doc = CashTransactions.findOne(this._id);
       

        //delete stock transaction
        Meteor.call("deleteStock", doc.stockTransaction, "stock");

        //delete cash transaction
        CashTransactions.remove(this._id);

        //update tables and once that is finished update stock totals
        Meteor.call("updateTables", Meteor.userId(), function (error, result) {
            if (result) {
                Meteor.call("updateStockTotals", Meteor.userId(), function (error, result) {
                    Session.set("totals", result);
                })
            }
        });
    }
})