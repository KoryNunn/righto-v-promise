# Righto v Promise

I have several gripes with promises, so I made a lib called righto.

## Issues

### API

promises aren't horrible to work with
if you only deal with promises either side:

```javascript
function doAsyncThing(){
    var user = promiseDb.Users.get({id: 1});
    var profile = user.then(user => promiseDb.Profile.get({id: user.profileId}));

    // Totally not natively implemented or even specced
    // method that exists in bluebird
    //               v
    return Promise.join(user, profile, (user, profile) => ({...user, profile}));
}
```

But then here is the same solution using righto:

```javascript
function doAsyncThing(){
    var user = rightoDb.Users.get({id: 1});
    var profile = rightoDb.Profile.get({id: user.profileId});

    return righto.sync((user, profile) => ({...user, profile}), user, profile);
}
```

Ok, already a touch cleaner.

And once `Proxy` is supported everywhere (or now if you know it is), you can do:

```javascript
var righto = require('righto').proxy; // <- exists in chrome, node 6, etc..

function doAsyncThing(){
    var user = rightoDb.Users.get({id: 1});
    var profile = rightoDb.Profile.get({user.profileId});

    return righto.sync(user => ({...user, profile}), user);
}
```

But the real issues appear when you
hit the boundary between promises and not-promises.

For example, simply calling a CPS API with promises:

```javascript
var address = new Promise(function(resolve, reject){
    db.Addresses.get({ id: 3 }, function(error, result){
        if(error){
            return reject(error);
        }

        resolve(result);
    });
});
```

which is a mess of code, for no good reason.

The same solution in righto:

```javascript
var address = righto(db.Addresses.get, { id: 3 });
```

Because righto is designed to navigate the goat-tracks,
it feels much more at home.

### Weight

In theory promises should be extemely light-weight,
since they are natively supported by javascript.

In practice, they are not totally supported, and
runtimes implement different amounts of the API,
and some key features are missing (like Promise.join),
meaning you pretty much have to use a lib like Bluebird
to use promises.

Bluebird is enormous, 250kB for everything.

Righto, is 8kB.

### Performance

Again, something you would expect promises to excel at,
given they should be natively supported.

But even using native promises, performance is equivilent to,
or worse than using righto, due to the rightos simplified implementation.

### Errors

This is the killer 'feature'.

I could almost forgive the rest of the issues, but they way
promises handle errors absolutly shuts down any chance I'd
use or recommend them.

```javascript
var thing = new Promise(function(resolve, reject){

        catWalkingAcrossTheKeyboard();

        setTimeout(function(){
            if(Math.random() > 0.5){
                resolve('foo');
            }else{
                reject('bar');
            }
        }, 1000);
    });

thing.then(function(foo){
        console.log(foo);
    }, function(error){
        console.log(error);
    });
```

In the above example, the call to `catWalkingAcrossTheKeyboard`
will throw, be caught by the promise, and will appear in the
thing.then() error handler.

The same handler that handles normal business logic errors.

Want to know if you got a business error, or you just mashed the keyboard?
write code to try and differentiate them.

This is, in my opinion, horrible. If I make a code mistake, I want my process to crash.
I want to know about it BEFORE it deploy my code. before I even COMMIT my code!

I want it to halt execution, tell me the exact line number that has a problem,
and then dump me at the terminal as if to say "Oi! ya dun goofed RIGHT HERE!"

I don't want my users to get random 500's because I own keyboard-enthusiast pets.

Thrown errors should crash.

Righto!:

```javascript
var thing = righto(function(done){

        catWalkingAcrossTheKeyboard();

        setTimeout(function(){
            if(Math.random() > 0.5){
                done(null, 'foo');
            }else{
                done('bar');
            }
        }, 1000);
    });

thing(function(error, foo){
    console.log(error, foo);
});
```

In this example, execution will hit `catWalkingAcrossTheKeyboard` and
IMMEDIATELY kill the process. I'll get a nice detailed stack trace.

If I then fix my code, `thing` will either be retrieved successfully,
or unsuccessfuly. There is no ambiguity to the error I get when I ask for
`thing`, either I don't get one, because it worked, or I did, because of some
business-logicy reason that wasn't cats.

**Throws mic**

`Uncaught ReferenceError: mic is not defined(…)`

## Examples

I'll add to these over time, for now there is only one,

[createUsers](./createUsers)

```
node createUsers
```
