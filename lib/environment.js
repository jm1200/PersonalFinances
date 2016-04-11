if (Meteor.isClient) {

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_EMAIL"
    });

    Session.set("toggle-stock-help", false);
    Session.set("toggle-add-stock", false);
    Session.set("toggle-add-details", false);
    Session.set("table", true);
    Session.set("table1", false);
    Session.set("table2", false);

}