Template.StocksMain.events({
    'click .stock-submit': function () {
        Meteor.call('stock', "VCN.TO", function (err, result) {
            console.log(result);
            Session.set('stock', result);

        });
        // console.log(getStock(buildUrl("VCN.TO")));
    },
    'click .toggle-column-date': function (event) {
        var table = $('#table').DataTable();
        var column = table.column(0);
        column.visible(!column.visible());
    }
});

Template.StocksMain.helpers({
    stock: function () {
        return Session.get('stock');
    }
})