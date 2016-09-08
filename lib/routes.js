FlowRouter.route('/', {
    action: function () {
        if (Meteor.userId()) {
            BlazeLayout.render("MainLayout", {
                content: "Home"
            });
        } else {
            BlazeLayout.render("MainLayout", {
                content: "Signup"
            });
        }

    }
});

FlowRouter.route('/fv', {
    action: function () {
        BlazeLayout.render("MainLayout", {
            content: "FutureValueOfSavings"
        });
    }
});

FlowRouter.route('/stocks', {
    action: function () {
        if (Meteor.userId()) {
            BlazeLayout.render("MainLayout", {
                content: "StocksMain"
            });
        } else {
            BlazeLayout.render("MainLayout", {
                content: "StocksWelcomePage"
            });
        }

    }
});

Accounts.onLogin(function () {
    FlowRouter.go('/');

});