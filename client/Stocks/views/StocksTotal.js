Template.StocksTotal.onCreated(function(){
    Meteor.call("updateStockTotals", Meteor.userId(), function(error, result){
        Session.set("totals", result);
    })
});

Template.StocksTotal.helpers({
    totals: function(){
        return Session.get("totals");
    }
});
