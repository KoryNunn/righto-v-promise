var righto = require('righto');

function plainOldCallback(callback){
    if(Math.random() > 0.5){
        return callback("failure case");
    }

    callback(null, "success case");
}

function iNeverExpectARejection(callback){
    var eventual = righto(painOldCallback);
    var handledRejection = righto.handle(eventual, (error, done) =>
        done(null, 'Meh..')
    );

    handledRejection(callback)
}

for(var i = 0; i < 10; i++){
    // This will throw instantly, the very first time you run it,
    // tell you what the error is, what line, and what character.
    // No type-checkers required.
    iNeverExpectARejection(function(error, result){
        if(error){
            return console.log('Unexpected rejection');
        }

        console.log('I succeeded');
    })
}