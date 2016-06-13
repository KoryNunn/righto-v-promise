var righto = require('righto'),
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

    var user1 = righto(function(address, profile, done){
            db.Users.create({
                name: 'bob smith',
                addressId: address.id,
                profileId: profile.id
            }, done);
        }, address1, profile1);

    var user2 = righto(function(address, profile, done){
            db.Users.create({
                name: 'john down',
                addressId: address.id,
                profileId: profile.id
            }, done);
        }, address2, profile2);

    righto.all(user1, user2)(callback);
};