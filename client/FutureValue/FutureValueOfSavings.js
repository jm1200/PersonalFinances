Template.futureValueOfSavingsInput.helpers({
        futureValue: function () {
            if (Session.get('fv')) {
                return "$" + Session.get('fv');
            } else {
                return "$0.00";
            }
        },
        interest: function () {
            if (Session.get("totalInterest")) {
                return "$" + Session.get("totalInterest");
            } else {
                return "$0.00";
            }
        }
    });

    Template.futureValueOfSavingsInput.events({
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

    for (var j = 0; j < n; j++) {
        totalInterest = Math.round((totalInterest + (pv * i)) * 100) / 100;
        pv = Math.round((pv + payment + (pv * i)) * 100) / 100;
        totalPayments = payment + (payment * j);

        d = new Date;
        m = d.getMonth();
        a = d.setMonth(m + j);

        //console.log(a);
        items.push({
            y: pv,
            x: a,
            group: 0,
            label: {
                content: "$" + pv,
                className: 'vis-label',
                xOffset: -15,
                yOffset: -15
            }
        });

        items.push({
            y: totalInterest,
            x: a,
            group: 1,
            label: {
                content: "$" + totalInterest,
                className: 'vis-label',
                xOffset: -15,
                yOffset: -15
            }
        })
        items.push({
            y: totalPayments,
            x: a,
            group: 2,
            label: {
                content: "$" + totalPayments,
                className: 'vis-label',
                xOffset: -15,
                yOffset: 15
            }
        })
    }

    
    Session.set('fv', commaSeparateNumber(pv));
    Session.set('totalInterest', commaSeparateNumber(totalInterest));

    //var dataset = new vis.DataSet(items);
    var graph = document.getElementById('graph');
    while (graph.firstChild) {
        graph.removeChild(graph.firstChild);
    }
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
                size:2
            }
        }
    })

    var container = document.getElementById('graph');
    var dataset = new vis.DataSet(items);
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
    var graph2d = new vis.Graph2d(container, dataset, groups, options);
    graph2d.fit();
}