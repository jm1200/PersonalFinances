AutoForm.hooks({
    stocksForm: {
        before: {
            insert: function (doc) {
                doc.owner = Meteor.userId();
                doc.name = Session.get("stock").name;
                doc.ticker = Session.get("stock").ticker;
                doc.ask = Session.get("stock").ask;
                doc.marketValue = Math.round((Session.get("stock").ask * doc.shares) * 100) / 100;
                doc.bookValue = Math.round((doc.buyPrice * doc.shares) * 100) / 100;
                doc.profitPercent = Math.round(((doc.marketValue - doc.bookValue) / doc.bookValue) * 10000) / 100;
                doc.profitDollars = Math.round((doc.marketValue - doc.bookValue) * 100) / 100;
                if(!doc.account){
                    doc.account = "Main";
                }
                return doc;
            }
        },
        after: {
            insert: function (doc) {
                Session.set("toggle-add-stock", false);
                Session.set("toggle-add-details", false);
                Meteor.call("updateTables", Meteor.userId());
            }
        }
    },
    cashForm: {
        before:{
            insert: function(doc){
                doc.owner = Meteor.userId();
                if(doc.action == "Withdrawl"){
                    doc.amount = doc.amount * -1;
                }
                if(CashTotal.findOne({owner: doc.owner})){
                    Meteor.call("updateCashTotal", doc);
                    
                } else {
                    CashTotal.insert({owner: doc.owner, date: new Date(), total: doc.amount});
                }
                return doc;
            }
            
        },
        after:{
            insert:function(doc){
                $('#cashModal').modal('hide');
            }
        }
        
    }
});