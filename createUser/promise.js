var db = require('../db'),
    Promise = require('bluebird');

module.exports = function(callback){
    var address1 = new Promise(function(resolve, reject){
            db.Addresses.create({
                address: '1 fake st placeyville'
            }, function(error, result){
                if(error){
                    return reject(error);
                }

                resolve(result);
            });
        });

    var address2 = new Promise(function(resolve, reject){
            db.Addresses.create({
                address: '2 real pl streetytown'
            }, function(error, result){
                if(error){
                    return reject(error);
                }

                resolve(result);
            });
        });

    var profile1 = new Promise(function(resolve, reject){
            db.Profiles.create({
                blurb: 'stuff'
            }, function(error, result){
                if(error){
                    return reject(error);
                }

                resolve(result);
            });
        });

    var profile2 = new Promise(function(resolve, reject){
            db.Profiles.create({
                blurb: 'things'
            }, function(error, result){
                if(error){
                    return reject(error);
                }

                resolve(result);
            });
        });

    function createUser1Data(address, profile){
        return new Promise(function(resolve, reject){
            db.Users.create({
                name: 'bob smith',
                addressId: address.id,
                profileId: profile.id
            }, function(error, result){
                if(error){
                    return reject(error);
                }

                resolve(result);
            });
        });
    }

    function createUser2Data(address, profile){
        return new Promise(function(resolve, reject){
            db.Users.create({
                name: 'john down',
                addressId: address.id,
                profileId: profile.id
            }, function(error, result){
                if(error){
                    return reject(error);
                }

                resolve(result);
            });
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