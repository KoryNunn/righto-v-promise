var db = require('../promiseDb'),
    Promise = require('bluebird');

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

    function createUser1Data(address, profile){
        return db.Users.create({
            name: 'bob smith',
            addressId: address.id,
            profileId: profile.id
        });
    }

    function createUser2Data(address, profile){
        return db.Users.create({
            name: 'john down',
            addressId: address.id,
            profileId: profile.id
        });
    }

    var user1 = Promise.join(address1, profile1, createUser1Data);

    var user2 = Promise.join(address2, profile2, createUser2Data);

    Promise.all([user1, user2])
    .then(function(result){
        callback(null, result);
    })
    .catch(callback);
};