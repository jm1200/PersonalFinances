Meteor.methods({
    updateCashTotal: function(doc, amount){
        CashTotal.update({owner: doc.owner}, {$inc: {total: amount}});
    }
})

