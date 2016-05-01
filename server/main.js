import {
    Meteor
}
from 'meteor/meteor';

Meteor.startup(() => {
     //Create admin user
    if (!Meteor.users.findOne()) {
        var userId = Accounts.createUser({
            username: "John",
            email: "jh_mcneill@yahoo.ca",
            password: "test123"
        });

        Meteor.users.update({
            _id: userId
        }, {
            $set: {
                roles: ["admin"]
            }
        });
        console.log("user created: " + userId);
        //initMyStocks(myStocks, userId);

    }
});

function initMyStocks(myStocks, user) {
    //console.log(myStocks);
    var stockArray = [];

    //get list of stocks to update
    myStocks.forEach(function (elem) {
        if(stockArray.indexOf(elem.ticker) < 0){
            stockArray.push(elem.ticker);
        }
        
    })

    console.log("stockarray: ", stockArray);
    //get latest prices
    var result = myStocks;
    var res = getStockObject(stockArray);
    //console.log(res);
    for (var j = 0; j < result.length; j++) {
        for (var k = 0; k < res.length; k++) {
            if (result[j].ticker == res[k].ticker) {
                result[j].owner = user;
                result[j].ask = res[k].ask;
                //console.log(result[j].shares);
                result[j].bookValue = result[j].shares * result[j].price;
                result[j].name = res[k].name;
                result[j].marketValue = result[j].shares * res[k].ask;
                if (result[j].action == "Buy") {
                    result[j].profitDollars = roundDollars(result[j].marketValue - result[j].bookValue);
                    result[j].profitPercent = roundPercent(result[j].profitDollars / result[j].bookValue);
                };
                if (result[j].action == "Sell") {
                    result[j].profitDollars = roundDollars(result[j].bookValue - result[j].marketValue);
                    result[j].profitPercent = roundPercent(result[j].profitDollars / result[j].bookValue);
                };

            }
        }
    }
    //console.log(result);
    for (var i = 0; i < result.length; i++) {
        Stocks.insert(result[i]);
    }
        
}

//initMyStocks(myStocks, "john");

