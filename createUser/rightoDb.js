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

    function createUser1Data(address, profile, done){
        db.Users.create({
            name: 'bob smith',
            addressId: address.id,
            profileId: profile.id
        })(done);
    }

    function createUser2Data(address, profile, done){
        db.Users.create({
            name: 'john down',
            addressId: address.id,
            profileId: profile.id
        })(done);
    }

    var user1 = righto(createUser1Data, address1, profile1);

    var user2 = righto(createUser2Data, address2, profile2);

    righto.all(user1, user2)(callback);
};