//dependencies
import cheerio from 'cheerio';

//Methods
Meteor.methods({
    stockLookup: function (symbol) {
        return getStockObject(buildUrlFromArray(symbol));
    },
    
    updateStocks: function (owner) {
        //UPDATE STOCK ASK PRICES FIRST
        //get array of all stock symbols in collection
        var stocksArray = [];
        var stockDocsCursor = Stocks.find({owner: owner});
        stockDocsCursor.forEach(function (doc) {
            if (stocksArray.indexOf(doc.ticker) == -1) {
                stocksArray.push(doc.ticker);
            }
        });
        //Build Url and do yahoo query
        var res = getStockObject(buildUrlFromArray(stocksArray));
        //console.log(res);

        //update Stocks in database
        for (var i = 0; i < res.length; i++) {
            //console.log(res[i].symbol);
            Stocks.update({
                ticker: res[i].ticker
            }, {
                $set: {
                    ask: (parseInt(res[i].ask * 100)) / 100
                }
            }, {
                multi: true
            });
        }
        
        Meteor.call("updateTables", owner);



    },
    updateTables: function (owner) {
        var docs = Stocks.find({
            owner: owner
        }).fetch();

        //3 tables to update
        var stockSums = [];
        var stockAccounts = [];

        docs.forEach(function (doc) {
            if (stockSums.indexOf(doc.ticker) == -1) {
                stockSums.push(doc.ticker);
            }
            if (stockAccounts.indexOf(doc.account) == -1) {
                stockAccounts.push(doc.account);
            }
        });

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

        StockSumsObjects.forEach(function (stock) {
            docs.forEach(function (doc) {
                if (doc.ticker == stock.ticker) {
                    //console.log(doc.ticker + " " + doc.shares);
                    stock.shares += doc.shares;
                    stock.bookValue += doc.bookValue;
                    stock.marketValue += doc.marketValue;
                    stock.profitDollars = roundDollars(doc.marketValue - doc.bookValue);
                    stock.profitPercent = roundPercent((doc.marketValue - doc.bookValue) / doc.bookValue)
                }
            });

        });
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
                    //console.log(doc.ticker + " " + doc.shares);
                    account.shares += doc.shares;
                    account.bookValue += doc.bookValue;
                    account.marketValue += doc.marketValue;
                    account.profitDollars = roundDollars(doc.marketValue - doc.bookValue);
                    account.profitPercent = roundPercent((doc.marketValue - doc.bookValue) / doc.bookValue);
                }
            });

        });
        
        stockAccountsObjects.forEach(function (obj) {
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
        });

        var stockTotal = {
            owner: owner,
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
});

//Helpers
buildUrlFromArray = function (symbols) {
    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(";
    var endUrl = ")%0A%09%09&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env";
    var str;
    var arr = [];
    for (var i = 0; i < symbols.length; i++) {
        str = "%22" + symbols[i] + "%22"
        arr.push(str);
    }
    var s = arr.join("%2C");
    return url + s + endUrl;
}

getStockObject = function (url) {
    var stocks = [];
    var stockAsks = [];
    var result = HTTP.call('GET', url);
    var $ = cheerio.load(result.content);
    $('quote').each(function (i, elem) {
        stocks.push({
            ticker: $(elem).find('symbol').text(),
            ask: $(elem).find('ask').text(),
            //ask: (parseInt($('ask').text() * 100)) / 100,
            name: $(elem).find('name').text()
        });
    });
    //console.log(stocks);
    if (!stocks[0].ask || stocks[0].ticker == stocks[0].name) {
        stocks[0].error = true;
        return stocks;
    } else {
        return stocks;
    }
}