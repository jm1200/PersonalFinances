import {
    Meteor
}
from 'meteor/meteor';

Meteor.startup(() => {
     //Create admin user
    if (!Meteor.users.findOne()) {
        var userId = Accounts.createUser({
            username: "John",
            email: "jh_mcneill@yahoo.ca",
            password: "test123"
        });
        Meteor.users.update({
            _id: userId
        }, {
            $set: {
                roles: ["admin"]
            }
        });
        console.log("user created: " + userId);
    }
});



