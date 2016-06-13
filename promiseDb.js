var models = require('./db');

function findAll(query){
    var model = this;
    return new Promise(function(resolve, reject){
        model.findAll(query, function(error, result){
            if(error){
                return reject(error);
            }

            resolve(result);
        });
    });
}
function find(query){
    var model = this;
    return new Promise(function(resolve, reject){
        model.find(query, function(error, result){
            if(error){
                return reject(error);
            }

            resolve(result);
        });
    });
}
function update(query, newData){
    var model = this;
    return new Promise(function(resolve, reject){
        model.update(query, newData, function(error, result){
            if(error){
                return reject(error);
            }

            resolve(result);
        });
    });
}
function remove(query){
    var model = this;
    return new Promise(function(resolve, reject){
        model.remove(query, function(error, result){
            if(error){
                return reject(error);
            }

            resolve(result);
        });
    });
}
function create(item){
    var model = this;
    return new Promise(function(resolve, reject){
        model.create(item, function(error, result){
            if(error){
                return reject(error);
            }

            resolve(result);
        });
    });
}

function createPromiseModel(model, key){

    var promiseModel = {};
    promiseModel.create = create.bind(model);
    promiseModel.find = find.bind(model);
    promiseModel.update = update.bind(model);
    promiseModel.remove = remove.bind(model);
    promiseModel.findAll = findAll.bind(model);

    return promiseModel;
}

module.exports = Object.keys(models).reduce(function(result, key){
    result[key] = createPromiseModel(models[key], key);
    return result;
}, {});