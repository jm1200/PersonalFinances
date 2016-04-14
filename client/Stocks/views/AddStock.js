Template.AddStock.events({
    //Look up stock to display inside modal
    'click .stock-lookup': function () {
        event.preventDefault;
        
        //only uppercase symbols can be used in stock lookup
        var symbol = [$('#stockValue').val()];
        
        //if no symbol entered, don't submit
        if (symbol[0]== "") {
            return;
        } else {
            //show the confirmation modal and look up the stock symbol and set the stock session for the helper.
            $('#myModal').modal('show');
            Meteor.call('stockLookup', symbol, function (err, result) {
                Session.set('stock', result[0]);
            });   
        }
    },
    //if correct stock found, toggle the add details template and hide modal
    'click .correct-stock': function () {
        Session.set("toggle-add-details", true);
        $('#myModal').modal('hide');
    },
    //if wrong stock, just hide the modal so user can try again
    'click .wrong-stock': function () {
        $('#myModal').modal('hide');
    },
    //toggle the stock lookup form
    'click .toggle-add-stock': function () {
        Session.set("toggle-add-stock", true);
    },
    //update the stock tables by calling a method
    'click .update-stocks': function () {
        Meteor.call('updateStocks', Meteor.userId());

    }
});

Template.AddStock.helpers({
    //display stock inside modal
    stock: function () {
        if (Session.get('stock')) {
            return Session.get('stock');
        }

    }
})