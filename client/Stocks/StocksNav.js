Template.StocksNav.events({
    'click .overview': function () {
        Session.set("table", true);
        Session.set("table1", false);
        Session.set("table2", false);
        Session.set("table3", false);
    },
    'click .sortByStock': function () {
        Session.set("table", false);
        Session.set("table1", true);
        Session.set("table2", false);
        Session.set("table3", false);
    },
    'click .sortByAccount': function () {
        Session.set("table", false);
        Session.set("table1", false);
        Session.set("table2", true);
        Session.set("table3", false);
    },
    'click .transactions': function () {
        Session.set("table", false);
        Session.set("table1", false);
        Session.set("table2", false);
        Session.set("table3", true);
    }
})