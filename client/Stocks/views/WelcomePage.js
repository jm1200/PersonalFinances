Template.StocksWelcomePage.events({
    'click .preview': function (event) {
        console.log(event.target.src);
        Session.set("previewImage", event.target.src);
        $('#previewImage').on('shown.bs.modal', function () {
            console.log("event");
            $(this).find('.modal-dialog').css({
                width: '1000px',
                height: '400px'
                //,
               // 'max-height': '400px'
            });
        });
        $('#previewImage').modal('show');
    }
})
Template.StocksWelcomePage.helpers({
    image: function () {
        return Session.get("previewImage");
    }
})