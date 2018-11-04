var righto = require('righto');

function plainOldCallback(callback){
    if(Math.random() > 0.5){
        return callback("failure case");
    }

    callback(null, "success case");
}

function iNeverExpectARejection(callback){
    var eventual = righto(plainOldCallback);
    var handledRejection = righto.handle(eventual, (error, done) =>
        done(null, 'Meh..')
    );

    handledRejection(callback)
}

for(var i = 0; i < 10; i++){
    iNeverExpectARejection(function(error, result){
        if(error){
            return console.log('Unexpected rejection');
        }

        console.log('I succeeded');
    })
}