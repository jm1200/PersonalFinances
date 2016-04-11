Meteor.publish("StockSums", function(){
    return StockSums.find({owner: this.userId});
});

Meteor.publish("StockTotal", function(){
    return StockTotal.find({owner: this.userId});
});
Meteor.publish("StockAccounts", function(){
    return StockAccounts.find({owner: this.userId});
});
Meteor.publish("Stocks", function(){
    return Stocks.find({owner: this.userId});
});