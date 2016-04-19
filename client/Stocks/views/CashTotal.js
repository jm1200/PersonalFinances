Template.CashTotal.helpers({
    total: function(){
        if(CashTotal.findOne()){
            return formatDollars(CashTotal.findOne({owner: Meteor.userId()}).total);
        }
        
    }
})