FlowRouter.route('/', {
    action: function () {
        BlazeLayout.render("MainLayout", {
            content: "Home"
        });
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
        BlazeLayout.render("MainLayout", {
            content: "StocksMain"
        });
    }
});


