var db = require('../db'),
    parallel = require('foreign').parallel;

module.exports = function(callback){

    function createUser1(done){
        parallel(
            function(task, done){
                task(done);
            },
            [
                db.Addresses.create.bind(null, {
                    address: '1 fake st placeyville'
                }),
                db.Profiles.create.bind(null, {
                    blurb: 'stuff'
                })
            ],
            function(error, results){
                if(error){
                    return done(error);
                }

                db.Users.create({
                    name: 'bob smith',
                    addressId: results[0].id,
                    profileId: results[1].id
                }, done);
            }
        );
    }

    function createUser2(done){
        parallel(
            function(task, done){
                task(done);
            },
            [
                db.Addresses.create.bind(null, {
                    address: '2 real pl streetytown'
                }),
                db.Profiles.create.bind(null, {
                    blurb: 'things'
                })
            ],
            function(error, results){
                if(error){
                    return done(error);
                }

                db.Users.create({
                    name: 'john down',
                    addressId: results[0].id,
                    profileId: results[1].id
                }, done);
            }
        );
    }

    parallel(
        function(task, done){
            task(done);
        },
        [
            createUser1,
            createUser2
        ],
        callback
    );
};