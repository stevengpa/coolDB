var cuid = require('cuid');

cooldb = function cooldb() {
    
    var cdb = [];
    
    async: function async(fn, arguments, callback, ms){

			// Save Params in an Object
			var run = { fn: fn, arguments: arguments, callback: callback };

			// Execute Async
			setTimeout(function asyncF(){
				run.callback = run.callback || function () {};
				run.callback(run.fn.apply(undefined, run.arguments));
			}, (ms == undefined) ? 0 : ms);
	}
        
    updateProps : function updateProps(source, dest) {

        for (var key in source) {

            if(dest.hasOwnProperty(key)){
                if (key != 'cuid')
                    dest[key] = source[key];
            }

        }
	}

    dbClone : function dbClone() {

		var strObject = JSON.stringify(cdb);

		return JSON.parse(strObject);
	}
    
    return {
        
        add: function add(params, cb) {
            // >> Validations <<
            
            // default param array
            params  = params || {};
            cb      = cb || function() {};
            
            // item key prop
            if (!params.hasOwnProperty('item'))
                throw 'Key => [item] was not found';
            
            // async default false
            if (!params.hasOwnProperty('async')) params.async = false;
            if (!params.hasOwnProperty('ms')) params.ms = 0;
            if (!params.item.hasOwnProperty('cuid')) params.item.cuid = cuid();
            
            // add
            if (params.async) {
                setTimeout(function iasync(){ cdb.push(params.item); cb(params.item); }, params.ms);
            } else {
                cdb.push(params.item);
                cb(params.item);
            }
            
            return this;
        },
        
        del: function del(params, cb) {
            // >> Validations <<
            
            // default param array
            params  = params || {};
            cb      = cb || function() {};
            
            var key   = null,
                value = null;
            
            // item key prop
            if (!params.hasOwnProperty('key'))
                throw 'Key => [key] was not found';
            else {
                if (params.hasOwnProperty('key')) key = params.key;
            }
            
            // item value prop
            if (!params.hasOwnProperty('value') )
                throw 'Key => [value] was not found';
            else {
                if (params.hasOwnProperty('value')) value = params.value;
            }
            
            // async default false
            if (!params.hasOwnProperty('async')) params.async = false;
            if (!params.hasOwnProperty('ms')) params.ms = 0;
                        
            // delete
            if (params.async) {
                setTimeout(function iasync(){ 
                    
                    var loopCounter = this.get({ key: key, value: value}).count;
                    for (i = 0; i < loopCounter; i++) {
                        var index = cdb.map(function(item){ return item[key]; }).indexOf(value);
                        if (index >= 0)
                            cdb.splice(index, 1); 

                        cb(index);
                    }
                    
                }, params.ms);
                
            } else {
                var loopCounter = this.get({ key: key, value: value}).count;
                for (i = 0; i < loopCounter; i++) {
                    var index = cdb.map(function(item){ return item[key]; }).indexOf(value);
                    if (index >= 0)
                        cdb.splice(index, 1); 

                    cb(index);
                }
            }
            
            return this;
            
        },
        
        db: function db() {
            return cdb;
        },
        
        clone: function clone() {
            return dbClone();
        },
        
        get: function get(params, cb) {
            // >> Validations <<
            
            // default param array
            params  = params || {};
            cb      = cb || function() {};
            
            var key   = null,
                value = null;
            
            // item key prop
            if (!params.hasOwnProperty('key'))
                throw 'Key => [key] was not found';
            else {
                if (params.hasOwnProperty('key')) key = params.key;
            }
            
            // item value prop
            if (!params.hasOwnProperty('value') )
                throw 'Key => [value] was not found';
            else {
                if (params.hasOwnProperty('value')) value = params.value;
            }
            
            // async default false
            if (!params.hasOwnProperty('async')) params.async = false;
            if (!params.hasOwnProperty('ms')) params.ms = 0;
                        
            // get
            if (params.async) {
                setTimeout(function iasync(){ 
                    
                    var itemFound = cdb.filter(function(item){ return item[key] == value; });
                    var result = {
                        items: itemFound,
                        count: itemFound.length
                    };
                    
                    cb(result);
                    
                    return result;
                    
                }, params.ms);
                
            } else {
                
                var itemFound = cdb.filter(function(item){ return item[key] == value; });
                var result = {
                    items: itemFound,
                    count: itemFound.length
                };

                cb(result);

                return result;
            }
            
        },
        
        first: function first(params, cb) {
            // >> Validations <<
            
            // default param array
            params  = params || {};
            cb      = cb || function() {};
            
            var key   = null,
                value = null;
            
            // item key prop
            if (!params.hasOwnProperty('key'))
                throw 'Key => [key] was not found';
            else {
                if (params.hasOwnProperty('key')) key = params.key;
            }
            
            // item value prop
            if (!params.hasOwnProperty('value') )
                throw 'Key => [value] was not found';
            else {
                if (params.hasOwnProperty('value')) value = params.value;
            }
            
            // async default false
            if (!params.hasOwnProperty('async')) params.async = false;
            if (!params.hasOwnProperty('ms')) params.ms = 0;
                        
            // get
            if (params.async) {
                setTimeout(function iasync(){ 
                    
                    var itemFound = cdb.filter(function(item){ return item[key] == value; });
                    var result = {
                        item: (itemFound.length > 0) ? itemFound[0] : null,
                        count: itemFound.length
                    };
                    
                    cb(result);
                    
                    return result;
                    
                }, params.ms);
                
            } else {
                
                var itemFound = cdb.filter(function(item){ return item[key] == value; });
                var result = {
                    item: (itemFound.length > 0) ? itemFound[0] : null,
                    count: itemFound.length
                };

                cb(result);

                return result;
            }
            
            return this;
            
        },
        
        update: function update(params, cb) {
            // >> Validations <<
            
            // default param array
            params  = params || {};
            cb      = cb || function() {};
            
            var key   = null,
                value = null;
            
            // item key prop
            if (!params.hasOwnProperty('key'))
                throw 'Key => [key] was not found';
            else {
                if (params.hasOwnProperty('key')) key = params.key;
            }
            
            // item value prop
            if (!params.hasOwnProperty('value') )
                throw 'Key => [value] was not found';
            else {
                if (params.hasOwnProperty('value')) value = params.value;
            }
            
            // item key prop
            if (!params.hasOwnProperty('item'))
                throw 'Key => [item] was not found';
            
            // async default false
            if (!params.hasOwnProperty('async')) params.async = false;
            if (!params.hasOwnProperty('ms')) params.ms = 0;
                        
            // update
            if (params.async) {
                setTimeout(function iasync(){ 
                    
                    this.get({ key: key, value: value}).items.forEach(function(dbItem){
                        updateProps(params.item, dbItem);
                        cb(dbItem);
                    });
                    
                }, params.ms);
                
            } else {
                
                this.get({ key: key, value: value}).items.forEach(function(dbItem){
                    updateProps(params.item, dbItem);
                    cb(dbItem);
                });
                
            }
            
            return this;
            
        }
        
    };
    
};

module.exports = cooldb;