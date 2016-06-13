var models = require('./db'),
    righto = require('righto');

function createRightoMethod(model, key){
    return function(){
        return righto.apply(null, [model[key]]
            .concat(Array.prototype.slice.call(arguments))
        );
    };
}

function createRightoModel(model, key){
    return Object.keys(model).reduce(function(result, key){
        result[key] = createRightoMethod(model, key);
        return result;
    }, {});
}

module.exports = Object.keys(models).reduce(function(result, key){
    result[key] = createRightoModel(models[key], key);
    return result;
}, {});