var righto = require('righto');

function plainOldCallback(callback){
    if(Math.random() > 0.5){
        return callback("failure case");
    }

    callback(null, "success case");
}

// Look you can even pretend your code isn't asyncronous!
function* iNeverExpectARejection(){
    var eventual = righto(painOldCallback);
    var handledRejection = yield righto.handle(eventual, (error, done) =>
        done(null, 'Meh..')
    );

    return `The result after I pretend this is sync code: ${handledRejection}`;
}

for(var i = 0; i < 10; i++){
    // This will throw instantly, the very first time you run it,
    // tell you what the error is, what line, and what character.
    // No type-checkers required.
    righto.iterate(iNeverExpectARejection)(function(error, result){
        console.log('Error: ', error);
        console.log('Result: ', result);
    })
}