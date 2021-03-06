Template.DeleteStock.events({
    'click .delete-stock': function (event) {
        //        var stock = Stocks.findOne(this._id);
        //        console.log(stock);
        
        //delete cash transaction with transaction id of this._id
        Meteor.call("deleteStock", this._id, "cash");
        
        //delete stock transaction
        Stocks.remove(this._id);
        
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