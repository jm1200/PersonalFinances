//dependencies
import cheerio from 'cheerio';

//Methods
Meteor.methods({
    stockLookup: function (symbol) {
        return getStockObject(buildUrlFromArray(symbol));
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