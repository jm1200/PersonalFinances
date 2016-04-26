Template.SellStock.onRendered(function() {
    $('.step1').hide();
    $('.step2').hide();
    $('.error').hide();
})

Template.SellStock.onDestroyed(function(){
    Session.set('stock', {});
})

Template.SellStock.events({
    'click .stock-lookup': function () {
        event.preventDefault;
        
        //only uppercase symbols can be used in stock lookup
        var symbol = [$('#stockValue').val()];
        
        //if no symbol entered, don't submit
        if (symbol[0]== "") {
            return;
        } else {
            //show the confirmation modal and look up the stock symbol and set the stock session for the helper.
            Meteor.call('stockLookup', symbol, function (err, result) {
                Session.set('stock', result[0]);
            });  
            $('.error').hide();
            $('.step1').show();
        }
    },
    'click .correct-stock': function() {
        $('.step2').show();
        $('.error').hide();
    },
    'click .wrong-stock': function() {
        $('.error').show();
        $('.step2').hide();
        $('.step1').hide();
    }
})

Template.SellStock.helpers({
    //display stock inside modal
    stock: function () {
        if (Session.get('stock')) {
            return Session.get('stock');
        }

    }
})
    
    