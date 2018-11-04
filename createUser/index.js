var db = require('../db'),
    series = require('foreign').series;

series(
    function(task, done){
        var start = Date.now();
        task[1](function(error, result){
            console.log(task[0], Date.now() - start);
            if(error){
                console.log(error);
            }
            done(error, result);
        });
    },
    [
        ['vanilla', require('./vanilla')],
        ['promiseDb', require('./promiseDb')],
        ['rightoDb', require('./rightoDb')],
        ['promise', require('./promise')],
        ['righto', require('./righto')]
    ],
    function(){
        db.Users.findAll({}, console.log);
        db.Profiles.findAll({}, console.log);
        db.Addresses.findAll({}, console.log);
    }
);