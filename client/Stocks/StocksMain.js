Meteor.subscribe("StockSums");
Meteor.subscribe("StockTotal");
Meteor.subscribe("StockTotalPerformanceData");
Meteor.subscribe("StockAccounts");
Meteor.subscribe("Stocks");
Meteor.subscribe("CashTotal");
Meteor.subscribe("CashTransactions");
Meteor.subscribe("PortfolioTotal");




Template.StocksMain.events({
    'click .stock-submit': function () {
        Meteor.call('stock', "VCN.TO", function (err, result) {
            console.log(result);
            Session.set('stock', result);

        });
        // console.log(getStock(buildUrl("VCN.TO")));
    },
    'click .toggle-column-date': function (event) {
        var table = $('#table').DataTable();
        var column = table.column(0);
        column.visible(!column.visible());
    }
});

Template.StocksMain.helpers({
    stock: function () {
        return Session.get('stock');
    },
    helpDivToggle: function(){
        if(Stocks.findOne({owner: Meteor.userId()})){
            return false;
        } else {
            return true;
        }
        
    }
})





