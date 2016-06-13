function later(fn){
    setTimeout(fn, 0);
}

function findAll(query, callback){
    var model = this;

    later(function(){
        callback(null, model._items.filter(function(item){
            return !Object.keys(query).some(function(key){
                return item[key] !== query[key];
            });
        }));
    });
}

function find(query, callback){
    this.findAll(query, function(error, results){
        if(error){
            return callback(error);
        }

        callback(null, results[0]);
    });
}

function update(query, newData, callback){
    this.find(query, function(error, item){
        if(error){
            return callback(error);
        }

        for(var key in newData){
            item[key] = newData[key];
        }

        callback(null, item);
    });
}

function remove(query, callback){
    var model = this;

    this.find(query, function(error, item){
        if(error){
            return callback(error);
        }

        if(item){
            model._items.splice(model._items.indexOf(item), 1);
            return callback();
        }

        callback();
    });
}

function create(item, callback){
    var model = this;

    later(function(){
        item.id = model._id++;
        model._items.push(item);
        callback(null, item);
    });
}

var models = {};

function makeFakeModel(name){
    var model = {
        _id: 0,
        _items: []
    };

    model.create = create.bind(model);
    model.find = find.bind(model);
    model.update = update.bind(model);
    model.remove = remove.bind(model);
    model.findAll = findAll.bind(model);

    models[name] = model;
}

var righto = require('righto');

makeFakeModel('Users');
makeFakeModel('Addresses');
makeFakeModel('Profiles');

module.exports = models;