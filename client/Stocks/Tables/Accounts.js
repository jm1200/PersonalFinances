Template.Accounts.helpers({
    graphs: function () {
        //Get data for all accounts pie chart
        var allAccounts = function () {
                if (StockAccounts.findOne()) {
                    var results = StockAccounts.find({
                        owner: Meteor.userId()
                    }).fetch();

                    var data = [];
                    for (var i = 0; i < results.length; i++) {
                        data.push([results[i].account, results[i].marketValue]);
                    }
                    return data;
                }
            }
            //get data for each individual account
        var getdata2 = function () {
            //accounts array will contain account objects with each stock and their percentages
            //initialize the accounts array
            //                accounts.push({
            //                        account: stocks[0].account,
            //                        totalMarketValue: stocks[0].marketValue,
            //                        stocks: [{
            //                            stock: stocks[0].ticker,
            //                            marketValue: stocks[0].marketValue
            //                        }]
            //                    })
            //get all stock data
            if (StockAccounts.findOne()) {
                var accounts = StockAccounts.find({
                    owner: Meteor.userId()
                }).fetch();
                if (Stocks.findOne()) {
                    var stocks = Stocks.find({
                        owner: Meteor.userId()
                    }).fetch();



                    var accountsData = [];
                    stocks.reduce(function (res, value) {
                        if (!res[value.account]) {
                            res[value.account] = {
                                account: value.account,
                                totalMarketValue: 0,
                                stocks: []
                            }

                            accountsData.push(res[value.account]);

                        }
                        if (value.action == "Buy") {
                            res[value.account].totalMarketValue += value.marketValue;
                        }
                        if (value.action == "Sell") {
                            res[value.account].totalMarketValue -= value.marketValue;
                        }

                        return res;
                    }, {});

                    accountsData.forEach(function (elem, i) {
                        stocks.reduce(function (res, value) {
                            if (value.account == accountsData[i].account) {
                                if (!res[value.ticker]) {
                                    res[value.ticker] = {
                                        stock: value.ticker,
                                        marketValue: 0
                                    }
                                    accountsData[i].stocks.push(res[value.ticker]);
                                }
                                if (value.action == "Buy") {
                                    res[value.ticker].marketValue += value.marketValue;
                                }
                                if (value.action == "Sell") {
                                    res[value.ticker].marketValue -= value.marketValue;
                                }
                            }
                            return res;

                        }, {});
                    });
                    console.log(accountsData);
                } //Stocks.findOne()
            } //StockAccounts.findOne()

            //object returned is: [{data: ["stock", percent], id: account name}] 
            var accounts = accountsData;
            var graphData = [];
            for (var i = 0; i < accounts.length; i++) {
                if (accounts[i].totalMarketValue != 0) {
                    var data = [];
                    for (var j = 0; j < accounts[i].stocks.length; j++) {
                        data.push([accounts[i].stocks[j].stock, accounts[i].stocks[j].marketValue]);
                    }
                    graphData.push({
                        data: data,
                        graphId: accounts[i].account
                    });
                }

            }
            console.log(graphData);
            return graphData;


        }



        var graph = function (data, title) {
            return {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: title
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            },
                            connectorColor: 'silver'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'genre',
                    data: data

                    }]
            };
        }
        
        var graphs = [
            {
                chartObject: graph(allAccounts(), "All Accounts"),
                graphId: "allAccounts"
            }
        ];
        var accGraphs = getdata2();
        //console.log(accGraphs);

        for (var i = 0; i < accGraphs.length; i++) {
            graphs.push({
                
                chartObject: graph(accGraphs[i].data, accGraphs[i].graphId),
                graphId: accGraphs[i].graphId
            })
        }
        //console.log(graphs);


        return graphs;

    }
})