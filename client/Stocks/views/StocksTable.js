Template.StocksTable.events({
    'click .toggle-column': function () {
        var table = $('#DataTables_Table_0_wrapper').DataTable();
        var column = table.column(0);
        column.visible(!column.visible());
    },
    'click .toggle-table': function (event) {
        var id = event.target.id;
        switch (id) {
            case "tabletoggle":
                Session.set("table", true);
                Session.set("table1", false);
                Session.set("table2", false);
                break;
            case "tabletoggle1":
                Session.set("table", false);
                Session.set("table1", true);
                Session.set("table2", false);
                break;
            case "tabletoggle2":
                Session.set("table", false);
                Session.set("table1", false);
                Session.set("table2", true);
                break;
        }
    },
    'click .toggle-column-vis': function(event){
        Session.set("toggle-column-vis", !Session.get("toggle-column-vis"));
    }
});

Template.StocksTable.helpers({
    bookValue: function () {
        return Session.get("totals").bookValue;
    },
    table1: function () {

    },
    table2: function () {

    }
})