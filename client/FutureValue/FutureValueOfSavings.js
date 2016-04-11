Template.futureValueOfSavingsInput.helpers({
    futureValue: function () {
        if (Session.get('fv')) {
            return Session.get('fv');
        } else {
            return "$0.00";
        }
    },
    interest: function () {
        if (Session.get("totalInterest")) {
            return Session.get("totalInterest");
        } else {
            return "$0.00";
        }
    }
});

Template.futureValueOfSavingsInput.events({
    //On submit, get data from input fields and initialize the table data.
    'submit #inputForm': function (event) {
        var input = {
            pv: parseInt(event.target.presentValue.value),
            payment: parseInt(event.target.payment.value),
            i: parseInt(event.target.interestRate.value),
            n: parseInt(event.target.period.value)
        }
        event.preventDefault();
        initData(input);
    }
});

function initData(input) {
    //grab input data
    var i = input.i / 1200;
    var payment = input.payment;
    var pv = input.pv;
    var n = input.n;

    //initialize variables
    var items = [];
    var label;
    var totalInterest = 0;

//    build dataset for table. Format is 
//     {y: value to be charted,
//      x:date, 
//      group: for each line on graph, 
//      label: label for each point}
    
    
    //j = a single data point, n = total number of datapoints
    for (var j = 0; j < n; j++) {
        totalInterest = Math.round((totalInterest + (pv * i)) * 100) / 100;
        pv = Math.round((pv + payment + (pv * i)) * 100) / 100;
        totalPayments = payment + (payment * j);

        d = new Date;
        m = d.getMonth();
        a = d.setMonth(m + j);

        //present value line group
        items.push({
            y: pv,
            x: a,
            group: 0,
            label: {
                content: formatDollars(pv),
                className: 'vis-label',
                xOffset: -15,
                yOffset: -15
            }
        });

        //total interest bar group
        items.push({
            y: totalInterest,
            x: a,
            group: 1,
            label: {
                content: formatDollars(totalInterest),
                className: 'vis-label',
                xOffset: -15,
                yOffset: -15
            }
        })
        
        //total payments line group
        items.push({
            y: totalPayments,
            x: a,
            group: 2,
            label: {
                content: formatDollars(totalPayments),
                className: 'vis-label',
                xOffset: -15,
                yOffset: 15
            }
        })
    }

    //Set session values for Future Value and Interest Earned helpers
    Session.set('fv', formatDollars(pv));
    Session.set('totalInterest', formatDollars(totalInterest));

    //get graph element
    var graph = document.getElementById('graph');
    
    //If there is a graph element firstChild, remove it to make way for a new init.
    while (graph.firstChild) {
        graph.removeChild(graph.firstChild);
    }
    
    //Build the groups object for visjs.
    var groups = new vis.DataSet();
    groups.add({
        id: 0,
        content: 'Future Value',
        options: {
            drawPoints: {
                style: 'circle'
            }
        }
    });

    groups.add({
        id: 1,
        content: "Interest",
        options: {
            style: 'bar'
        }
    });
    groups.add({
        id: 2,
        content: "Total Payments",
        options: {
            drawPoints: {
                style: 'square',
                size: 2
            }
        }
    })

    //get graph element for visjs container
    var container = document.getElementById('graph');
    //instantiate dataset with data
    var dataset = new vis.DataSet(items);
    //specify options for visjs
    var options = {
        legend: true,
        dataAxis: {
            title: {
                left: {
                    text: "Future Value in $"
                }
            }
        }
    }
    //instantiate graph
    var graph2d = new vis.Graph2d(container, dataset, groups, options);
    //fit the graph inside the given container.
    graph2d.fit();
}