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
        var getdata2 = function () {
            if (Stocks.findOne()) {
                var stocks = Stocks.find({
                    owner: Meteor.userId()
                }).fetch();
                var accounts = [];
                accounts.push({
                        account: stocks[0].account,
                        totalMarketValue: stocks[0].marketValue,
                        stocks: [{
                            stock: stocks[0].ticker,
                            marketValue: stocks[0].marketValue
                        }]
                    })
                    //if account doesn't exist in array, create it
                for (var doc = 1; doc < stocks.length; doc++) {
                    //check if stock account is in accounts array
                    var inAccounts = false
                    for (var acc = 0; acc < accounts.length; acc++) {
                        if (accounts[acc].account == stocks[doc].account) {
                            inAccounts = true;
                            accounts[acc].totalMarketValue += stocks[doc].marketValue;
                            var inStocks = false;
                            for (var stock = 0; stock < accounts[acc].stocks.length; stock++) {
                                if (accounts[acc].stocks[stock].stock == stocks[doc].ticker) {

                                    inStocks = true;
                                    accounts[acc].stocks[stock].marketValue += stocks[doc].marketValue;
                                }
                            }
                            if (!inStocks) {
                                accounts[acc].stocks.push({
                                    stock: stocks[doc].ticker,
                                    marketValue: stocks[doc].marketValue,
                                });
                            }
                        }
                    }
                    if (!inAccounts) {
                        accounts.push({
                            account: stocks[doc].account,
                            totalMarketValue: stocks[doc].marketValue,
                            stocks: [{
                                stock: stocks[doc].ticker,
                                marketValue: stocks[doc].marketValue
                        }]
                        })
                    }
                }
                //if stock doesn't exist in account object, create it
                for (var i = 0; i < accounts.length; i++) {
                    for (var j = 0; j < accounts[i].stocks.length; j++) {
                        accounts[i].stocks[j].percentage = Math.round(accounts[i].stocks[j].marketValue / accounts[i].totalMarketValue * 100);
                    }
                }

            }
            //return [{data: ["stock", percent], id: account name}] 
            var graphData = [];
            for (var i = 0; i < accounts.length; i++) {
                var data = [];
                for (var j = 0; j < accounts[i].stocks.length; j++) {
                    data.push([accounts[i].stocks[j].stock, accounts[i].stocks[j].marketValue]);
                }
                graphData.push({data: data, graphId: accounts[i].account});
            }
            
            //console.log(graphData);
            //console.log(accounts[0].stocks);
            return graphData;


        }



        var graph = function (data) {
            return {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: Meteor.user().username + "'s Accounts"
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
                chartObject: graph(allAccounts()),
                graphId: "allAccounts"
            }
        ];
        var accGraphs = getdata2();
        console.log(accGraphs);

        for (var i = 0; i < accGraphs.length; i++) {
            graphs.push({
                chartObject: graph(accGraphs[i].data),
                graphId: accGraphs[i].graphId
            })
        }
        console.log(graphs);


        return graphs;

    }
})