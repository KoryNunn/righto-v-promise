var righto = require('righto').proxy,
    db = require('../db');

module.exports = function(callback){
    var address1 = righto(db.Addresses.create, {
            address: '1 fake st placeyville'
        });

    var address2 = righto(db.Addresses.create, {
            address: '2 real pl streetytown'
        });

    var profile1 = righto(db.Profiles.create, {
            blurb: 'stuff'
        });

    var profile2 = righto(db.Profiles.create, {
            blurb: 'things'
        });

    var user1 = righto(db.Users.create, righto.resolve({
            name: 'bob smith',
            addressId: address1.id,
            profileId: profile1.id
        }));

    var user2 = righto(db.Users.create, righto.resolve({
            name: 'john down',
            addressId: address2.id,
            profileId: profile2.id
        }));

    righto.all(user1, user2)(callback);
};