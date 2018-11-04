function getPromise(){

    return new Promise(function(resolve, reject){
      // simulate event-loop delay
        setTimeout(function(){
            if(Math.random() > 0.5){
                return reject("failure case");
            }

            resolve("success case");
        }, 10);
    })
}

async function iNeverExpectARejection(){
    try {
        // Missing await means this "error handling" does nothing.
        // and actually works fine in the happy path.
        // Why this occurs is clear without a strong knowledge of how async/await works.
        return getPromise();
    } catch (error) {
        return handledValue
    }
}

for(var i = 0; i < 10; i++){
    iNeverExpectARejection()
    .then(console.log)
    .catch(error => console.log('And yet...'));
}