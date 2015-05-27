var cuid = require('cuid');

cooldb = function cooldb() {
    
    var cdb = [];
    var changeFeedCB = undefined;
    
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

        var $this = this;
        var currentDest = JSON.parse(JSON.stringify(dest));
        
        for (var key in source) {

            if(dest.hasOwnProperty(key)){
                if (key != 'cuid')
                    dest[key] = source[key];
            }

        }
        
        var updatedDest = Object.create(dest);
        
        return { before: currentDest, after: updatedDest };
	}

    dbClone : function dbClone() {

		var strObject = JSON.stringify(cdb);

		return JSON.parse(strObject);
	}
    
    return {
        
        changeFeed: function changeFeed(fn) {
            if (typeof fn === 'function')
            { changeFeedCB = fn; }
            
            return this;
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
            
            // add
            if (params.async) {
                setTimeout(function iasync(){ 
                    
                    if (!Array.isArray(params.item)) {
                        //>> add Object
                        if (!params.item.hasOwnProperty('cuid')) params.item.cuid = cuid();
                        // Added
                        cdb.push(params.item);
                        // Callback
                        cb({ old: null, new: Object.create(params.item), action: 'Inserted' });
                        // Change Feed
                        if (changeFeedCB != undefined) 
                        { changeFeedCB({ old: null, new: Object.create(params.item), action: 'Inserted' }); }

                    } else if (Array.isArray(params.item)){
                        //>> add Array
                        params.item.forEach(function(item) {
                            if (!item.hasOwnProperty('cuid')) item.cuid = cuid();
                            // Added
                            cdb.push(item);
                            // Callback
                            cb({ old: null, new: Object.create(item), action: 'Inserted' });
                            // Change Feed
                            if (changeFeedCB != undefined) 
                            { changeFeedCB({ old: null, new: Object.create(item), action: 'Inserted' }); }
                            
                        });
                    }
                    
                }, params.ms);
            } else {
                
                if (!Array.isArray(params.item)) {
                    //>> add Object
                    if (!params.item.hasOwnProperty('cuid')) params.item.cuid = cuid();
                    // Added
                    cdb.push(params.item); 
                    // Callback
                    cb({ old: null, new: Object.create(params.item), action: 'Inserted' });
                    // Change Feed
                    if (changeFeedCB != undefined) 
                    { changeFeedCB({ old: null, new: Object.create(params.item), action: 'Inserted' }); }
                    
                } else if (Array.isArray(params.item)){
                    //>> add Array
                    params.item.forEach(function(item) {
                        if (!item.hasOwnProperty('cuid')) item.cuid = cuid();
                        // Added
                        cdb.push(item); 
                        // Callback
                        cb({ old: null, new: Object.create(item), action: 'Inserted' });
                        // Change Feed
                        if (changeFeedCB != undefined) 
                        { changeFeedCB({ old: null, new: Object.create(item), action: 'Inserted' }); }
                    });
                }
                
            }
            
            return this;
        },
        
        del: function del(params, cb) {
            // >> Validations <<
            var $this = this;
            
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
                    
                    var loopCounter = $this.get({ key: key, value: value }).count;
                    for (i = 0; i < loopCounter; i++) {
                        
                        var item = cdb.filter(function(item){ return item[key] == value; });
                        var index = cdb.map(function(item){ return item[key]; }).indexOf(value);
                        
                        if (index >= 0) {
                            cdb.splice(index, 1); 
                        }
                        
                        var itemDeleted = (Array.isArray(item)) ? item[0] : item;
                        
                        // Callback
                        cb({ old: Object.create(itemDeleted), new: null, action: 'Deleted' });
                        // Change Feed
                        if (changeFeedCB != undefined) 
                        { changeFeedCB({ old: Object.create(itemDeleted), new: null, action: 'Deleted' }); }
                    }
                    
                }, params.ms);
                
            } else {
                
                var loopCounter = $this.get({ key: key, value: value}).count;
                for (i = 0; i < loopCounter; i++) {
                    
                    var item = cdb.filter(function(item){ return item[key] == value; });
                    var index = cdb.map(function(item){ return item[key]; }).indexOf(value);
                    
                    if (index >= 0) {
                        cdb.splice(index, 1);
                    }
                    
                    var itemDeleted = (Array.isArray(item)) ? item[0] : item;
                    
                    // Callback
                    cb({ old: Object.create(itemDeleted), new: null, action: 'Deleted' });
                    // Change Feed
                    if (changeFeedCB != undefined) 
                    { changeFeedCB({ old: Object.create(itemDeleted), new: null, action: 'Deleted' }); }
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
        
        clean: function clean(cb) {
            cdb = [];   
            
            // Callback
            cb = cb || function() {};
            cb({ old: null, new: null, action: 'Cleaned' });
            // Change Feed
            if (changeFeedCB != undefined) 
            { changeFeedCB({ old: null, new: null, action: 'Cleaned' }); }
            
            return this;
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
        },
        
        update: function update(params, cb) {
            // >> Validations <<
            var $this = this;
            
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
                    
                    $this.get({ key: key, value: value}).items.forEach(function(dbItem){
                        var result = updateProps(params.item, dbItem);
                        
                        // Callback
                        cb({ old: Object.create(result.before), new: Object.create(result.after), action: 'Updated' });
                        // Change Feed
                        if (changeFeedCB != undefined) 
                        { changeFeedCB({ old: Object.create(result.before), new: Object.create(result.after), action: 'Updated' }); }
                    });
                    
                }, params.ms);
                
            } else {
                
                $this.get({ key: key, value: value}).items.forEach(function(dbItem){
                    var result = updateProps(params.item, dbItem);
                    
                    // Callback
                    cb({ old: Object.create(result.before), new: Object.create(result.after), action: 'Updated' });
                    // Change Feed
                    if (changeFeedCB != undefined) 
                    { changeFeedCB({ old: Object.create(result.before), new: Object.create(result.after), action: 'Updated' }); }
                });
                
            }
            
            return this;
            
        }
        
    };
    
};

module.exports = cooldb;