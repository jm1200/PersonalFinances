Meteor.methods({
    updateCashTotal: function(doc){
        CashTotal.update({owner: doc.owner}, {$inc: {total: doc.amount}});
    }
})

