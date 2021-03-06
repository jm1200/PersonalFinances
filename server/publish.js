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
Meteor.publish("StockTotalPerformanceData", function(){
    return StockTotalPerformanceData.find({owner: this.userId});
});
Meteor.publish("CashTotal", function(){
    return CashTotal.find({owner: this.userId});
});
Meteor.publish("CashTransactions", function(){
    return CashTransactions.find({owner: this.userId});
});
Meteor.publish("PortfolioTotal", function(){
    return PortfolioTotal.find({owner: this.userId});
});