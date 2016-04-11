//Meteor.call("totals", Meteor.userId(), function(err,res){
//            Session.set("totals", res);
//        });

Template.StocksTotal.helpers({
     bookValue: function () {
         if(StockTotal.findOne({owner: Meteor.userId()})){
             return formatDollars(StockTotal.findOne({owner: Meteor.userId()}).bookValue);
         } else {
             return "No data yet";
         }
    },
     marketValue: function () {
          if(StockTotal.findOne({owner: Meteor.userId()})){
             return formatDollars(StockTotal.findOne({owner: Meteor.userId()}).marketValue);
         } else {
             return "No data yet";
         }
        
    },
     profitDollars: function () {
          if(StockTotal.findOne({owner: Meteor.userId()})){
             return formatDollars(StockTotal.findOne({owner: Meteor.userId()}).profitDollars);
         } else {
             return "No data yet";
         }
        
    },
     profitPercent: function () {
          if(StockTotal.findOne({owner: Meteor.userId()})){
             return StockTotal.findOne({owner: Meteor.userId()}).profitPercent + "%";
         } else {
             return "No data yet";
         }
        
    },
})