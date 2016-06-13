var righto = require('righto'),
    db = require('../rightoDb');

module.exports = function(callback){
    var address1 = db.Addresses.create({
            address: '1 fake st placeyville'
        });

    var address2 = db.Addresses.create({
            address: '2 real pl streetytown'
        });

    var profile1 = db.Profiles.create({
            blurb: 'stuff'
        });

    var profile2 = db.Profiles.create({
            blurb: 'things'
        });

    var user1 = db.Users.create({
            name: 'bob smith',
            addressId: address1.get('id'),
            profileId: profile1.get('id')
        });

    var user2 = db.Users.create({
            name: 'john down',
            addressId: address2.get('id'),
            profileId: profile2.get('id')
        });

    righto.all(user1, user2)(callback);
};