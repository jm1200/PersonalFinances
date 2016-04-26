Template.DeleteStock.events({
    'click .delete-stock': function (event) {
        Stocks.remove(this._id);
    }
})