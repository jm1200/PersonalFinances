SyncedCron.add({
  name: 'Insert new StockTotals',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 1 min');
  },
  job: function() {
    Meteor.call("");
    return numbersCrunched;
  }
});

//SyncedCron.start();