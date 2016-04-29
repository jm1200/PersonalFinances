Meteor.methods({
    updateCashTotal: function (doc, amount) {
        CashTotal.update({
            owner: doc.owner
        }, {
            $inc: {
                total: amount
            }
        });
    },
    stockTransaction: function (docId) {
        //docId is the stockTransaction id associated with this cash transaction
        var doc = Stocks.findOne(docId);
        var action = "";
        if (doc.action == "Buy") {
            action = "Withdrawl";
        }
        if (doc.action == "Sell") {
            action = "Deposit"
        }
        var note = doc.action + " " + doc.shares + " shares of " + doc.ticker + " for " + doc.bookValue;

        CashTransactions.insert({
            owner: doc.owner,
            stockTransaction: docId,
            action: action,
            actionFrom: "Personal Account",
            date: doc.date,
            amount: doc.price * doc.shares,
            notes: note
        })
    },
    deleteStock: function (id, type) {
        
        console.log("delete stock: ", id, type);
        if (type == "cash") {
            CashTransactions.remove({
                stockTransaction: id
            }, function (error, result) {
                if (error) console.log(error);
                console.log(result);
            });
        }
        if (type == "stock") {
            Stocks.remove(id, function(error, res){
                if(error)console.log(error);
                console.log(res);
            });
        }


    }
})