function getPromise(){
    return new Promise(function(resolve, reject){
      // simulate event-loop delay
        setTimeout(function(){
            if(Math.random() > 0.5){
                return reject("failure case");
            }

            resolve("success case");
        }, 10);
    });
}

async function iExpectSomeSuccesses(){
    try {
        // This will throw, be caught by the handler, and the resolve the handled value.
        // In this case a type-checker *WILL* help, but that doesn't pardon
        // async-await being a bit crap.
        return await getPromse();
    } catch (error) {
        return 'Meh..'
    }
}

for(var i = 0; i < 10; i++){
    iExpectSomeSuccesses()
    .then(result => console.log('You will only see me'))
    .catch(error => console.log('You will never see me'));
}