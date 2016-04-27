//dependencies
import cheerio from 'cheerio';

//Methods
Meteor.methods({
    stockLookup: function (symbol) {
        return getStockObject(symbol);
    },

    updateStocks: function (owner) {
        //UPDATE STOCK ASK PRICES FIRST

        //get a list of stock symbols to get latest stock prices
        var stockArray = [];
        var stockObjs = [];
        if (Stocks.findOne()) {
            var result = Stocks.find({
                owner: owner
            }).fetch()
            for (var i = 0; i < result.length; i++) {
                stockArray.push(result[i].ticker);
            }
            //get latest prices
            var res = getStockObject(stockArray);
            for (var j = 0; j < result.length; j++) {
                for (var k = 0; k < res.length; k++) {
                    if (result[j].ticker == res[k].ticker) {
                        result[j].ask = res[k].ask;
                        console.log(result[j].shares);
                        result[j].marketValue = result[j].shares * res[k].ask;
                    }
                }
            }
            //update Stocks in database
            for (var i = 0; i < result.length; i++) {
                Stocks.update({
                    ticker: result[i].ticker,
                    account: result[i].account
                }, {
                    $set: {
                        ask: result[i].ask,
                        marketValue: result[i].marketValue
                    }
                }, {
                    multi: true
                });
            }
        }
        Meteor.call("updateTables", owner);
    },
    updateTables: function (owner) {

        //Get an array of every stock Transaction
        if (Stocks.findOne()) {
            var docs = Stocks.find({
                owner: owner
            }).fetch();

            //2 tables to update
            //get array of stock sums and stock accounts
            var stockSums = [];
            var stockAccounts = [];

            //build arrays
            docs.forEach(function (doc) {
                if (stockSums.indexOf(doc.ticker) == -1) {
                    stockSums.push(doc.ticker);
                }
                if (stockAccounts.indexOf(doc.account) == -1) {
                    stockAccounts.push(doc.account);
                }
            });

            //update the stock sums table data
            //initialize the object for each stock sum with values
            var StockSumsObjects = [];
            stockSums.forEach(function (ticker) {
                    StockSumsObjects.push({
                        owner: owner,
                        ticker: ticker,
                        shares: 0,
                        bookValue: 0,
                        marketValue: 0,
                        profitDollars: 0,
                        profitPercent: 0
                    });

                })
                //get total values for each stock

            StockSumsObjects.forEach(function (stock) {
                docs.forEach(function (doc) {
                    if (doc.ticker == stock.ticker) {
                        //console.log(doc.ticker + " " + doc.shares);
                        if (doc.action == "Sell") {
                            stock.shares -= doc.shares;
                            stock.bookValue -= doc.bookValue;
                            stock.marketValue -= doc.marketValue;

                        }
                        if (doc.action == "Buy") {
                            stock.shares += doc.shares;
                            stock.bookValue += doc.bookValue;
                            stock.marketValue += doc.marketValue;

                        }

                    }
                });
                stock.profitDollars = roundDollars(stock.marketValue - stock.bookValue);
                stock.profitPercent = roundPercent((stock.marketValue - stock.bookValue) / stock.bookValue)

            });

            //upsert the new stock sums data
            StockSumsObjects.forEach(function (obj) {
                StockSums.upsert({
                    ticker: obj.ticker,
                    owner: obj.owner
                }, {
                    $set: {
                        shares: obj.shares,
                        bookValue: obj.bookValue,
                        marketValue: obj.marketValue,
                        profitDollars: obj.profitDollars,
                        profitPercent: obj.profitPercent
                    }
                });
            });

            //console.log(StockSumsObjects);
            var stockAccountsObjects = [];
            stockAccounts.forEach(function (account, i) {
                stockAccountsObjects.push({
                    owner: owner,
                    account: account,
                    shares: 0,
                    bookValue: 0,
                    marketValue: 0,
                    profitDollars: 0,
                    profitPercent: 0
                });

            })
            stockAccountsObjects.forEach(function (account) {
                docs.forEach(function (doc) {
                    
                    if (doc.account == account.account) {
                        if (doc.action == "Sell") {
                            account.shares -= doc.shares;
                            account.bookValue -= doc.bookValue;
                            account.marketValue -= doc.marketValue;
                        }
                        if (doc.action == "Buy") {
                            account.shares += doc.shares;
                            account.bookValue += doc.bookValue;
                            account.marketValue += doc.marketValue;
                        }

                        account.profitDollars = roundDollars(account.marketValue - account.bookValue);
                        account.profitPercent = roundPercent((account.marketValue - account.bookValue) / account.bookValue);
                    }
                });

            });

            stockAccountsObjects.forEach(function (obj) {
                if (obj.shares == 0) {
                    StockAccounts.remove({
                        owner: obj.owner,
                        account: obj.account
                    });
                } else {
                    StockAccounts.upsert({
                        account: obj.account,
                        owner: obj.owner
                    }, {
                        $set: {
                            shares: obj.shares,
                            bookValue: obj.bookValue,
                            marketValue: obj.marketValue,
                            profitDollars: obj.profitDollars,
                            profitPercent: obj.profitPercent
                        }
                    });
                }

            });

            var stockTotal = {
                owner: owner,
                date: new Date,
                shares: 0,
                bookValue: 0,
                marketValue: 0,
                profitDollars: 0,
                profitPercent: 0
            };

            docs.forEach(function (doc) {
                stockTotal.shares += doc.shares;
                stockTotal.bookValue += doc.bookValue;
                stockTotal.marketValue += doc.marketValue;

            });
            stockTotal.profitDollars = roundDollars(stockTotal.marketValue - stockTotal.bookValue);
            stockTotal.profitPercent = roundPercent((stockTotal.marketValue - stockTotal.bookValue) / stockTotal.bookValue);

            StockTotal.upsert({
                owner: stockTotal.owner
            }, {
                $set: {
                    shares: stockTotal.shares,
                    bookValue: stockTotal.bookValue,
                    marketValue: stockTotal.marketValue,
                    profitDollars: stockTotal.profitDollars,
                    profitPercent: stockTotal.profitPercent
                }
            })
            console.log("stock prices up to date");
        }
    }
});

getStockObject = function (symbols) {
    //BUILD URL
    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22";
    var endUrl = "%22)%0A%09%09&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=";
    var str;
    var stocks = [];
    var tries = 5;

    //make sure symbols are uppercase
    var stockSymbols = [];
    for (var i = 0; i < symbols.length; i++) {
        str = "" + symbols[i].toUpperCase();
        stockSymbols.push(str);
    }

    //QUERY -- This is really ugly. I ran into a problem where I was getting
    //null results back from Yahoo randomly. Maybe their servers were busy? 
    //The only solution that i could figure out was to keep querying until I finall got an ask price that wasn't null. 

    //do one run through and hopefully get the data I need, else loop while counter is less than 10 tries.
    for (var k = 0; k < tries; k++) {
        var symbolString = stockSymbols.join("%2C");
        var builtUrl = url + symbolString + endUrl;
        var result = HTTP.call('GET', builtUrl);
        var quotes = JSON.parse(result.content).query.results.quote;
        //YQL returns an object for one quote and an array for multiple quotes. Hence different methods depending on object or array.
        if (stockSymbols.length == 1) {
            if (quotes.Ask) {
                //console.log(quotes);
                //remove symbol from stockSymbols so I don't query for it again and loop breaks.
                var index = stockSymbols.indexOf(quotes.symbol);
                stockSymbols.splice(index, 1);
                stocks.push({
                        ticker: quotes.symbol,
                        ask: quotes.Ask,
                        name: quotes.Name
                    })
                    //console.log("One left ", stocks);

            } else {
                //console.log("no, luck. trying again", k);
                continue;
            }
        } else {
            for (var j = 0; j < quotes.length; j++) {
                if (quotes[j].Ask) {
                    //console.log(quotes[j]);
                    //remove symbol from stockSymbols so I don't query for it again and loop breaks.
                    var index = stockSymbols.indexOf(quotes[j].symbol);
                    stockSymbols.splice(index, 1);
                    stocks.push({
                            ticker: quotes[j].symbol,
                            ask: quotes[j].Ask,
                            name: quotes[j].Name
                        })
                        //console.log("Multi ", stocks);

                } else {
                    //console.log("no, luck. trying again", k);
                    continue;
                }

            }
        }
        if (stockSymbols.length == 0) {
            break;
        } else {
            continue;
        }
    }
    //Add error to stock if unable to find symbol.
    //console.log("Stock obj: ", stocks)

    if (!stocks[0] || !stocks[0].ask || stocks[0].ticker == stocks[0].name) {
        stocks.push({
            error: true
        });
        return stocks;
    } else {
        //console.log("From function", stocks);
        return stocks;
    }
}