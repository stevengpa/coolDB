# coolDB
This is a lightweight library for Client | Server which helps the CRUD actions in memory over objects / data stored in an internal JS Array.

<br />
## Implementation

#### Browser
``` html
<script src="dist/browser-cooldb.js"></script>
```
``` javascript
var cooldb = cooldb,
    coolDB = cooldb();
```

#### Node
```
npm install cooldb
```
``` javascript
var cooldb 	= require('cooldb'),
	coolDB 	= cooldb();
```
<br />
## Methods
### add
Add an object / array to the internal cooldb Array. It also includes automatically an unique id to each object through [CUID by Eric Elliot](https://github.com/ericelliott/cuid).
```
function add(params, cb)
params: { item (Object / Array) | async (true/false) | ms (setTimeout milliseconds) }
returns: cooldb object
```
``` javascript
// >> Add Objects <<
// Sync
coolDB.add({ item: {name: 'Steven'} }); // Added => Object {name: "Steven", cuid: "cia78ggu600004j50tjx0bqxy"}

// Async
coolDB.add({ item: {name: 'Steven 2'}, async: true, ms: 500 }, 
  function(result){
    console.log(result); // Object {old: null, new: Object, action: "Inserted"}
});

// >> Add Array <<
// Sync
coolDB.add({ item: [{ name: 'Steven' }, { name: 'Steven 2' }] });

// Async
coolDB.add({ item: [{ name: 'Steven' }, { name: 'Steven 2' }], async: true, ms: 0 }, 
  function(result){
    console.log(result); 
    // Object {old: null, new: Object, action: "Inserted"} 
    // Object {old: null, new: Object, action: "Inserted"}
});

```
### del
Delete the items where a key + value match with the items stored inside the cooldb Array
```
function del(params, cb)
params: { key (Property name) | value (Property value) | async (true/false) | ms (setTimeout milliseconds) }
returns: cooldb object
```
``` javascript
// Sync
coolDB.del({ key:'name', value: 'Mary' }); // Delete all items where name = Mary

// Async
coolDB.del({ key:'name', value: 'Mary', async: true, ms: 0 }, 
  function(result){
    console.log(result); // Object {old: Object, new: null, action: "Deleted"}
});

```
### update
Update the items where a key + value match with the items stored inside the cooldb Array
```
function update(params, cb)
params: { key (Property name) | value (Property value) | item (New Property values) |async (true/false) | ms (setTimeout milliseconds) }
returns: cooldb object
```
``` javascript
// Sync
coolDB.update({ key: 'name', value: 'Blue', item: { name: 'Pacman' } }); // Update name = Pacman where name = Blue

// Async
coolDB.update({ key: 'name', value: 'Blue', item: { name: 'Pacman' }, async: false, ms: 0 }, 
  function (result){
    console.log(result); // Object {old: Object, new: Object, action: "Updated"}
});

```
### first
Return the first item where a key + value match with the items stored inside the cooldb Array
```
function first(params, cb)
params: { key (Property name) | value (Property value) | async (true/false) | ms (setTimeout milliseconds) }
returns: Object { item (First object found) | count (Number of objects found) }
```
``` javascript
// Sync
coolDB.first({ key:'name', value: 'Blue' }); // Object {item: Object, count: 1} 

// Async
coolDB.first({ key:'name', value: 'Blue', async: true, ms: 0 }, 
  function(result){
    console.log(result); // Object {item: Object, count: 1}
});

```
### get
Get the items where a key + value match with the items stored inside the cooldb Array
```
function get(params, cb)
params: { key (Property name) | value (Property value) | async (true/false) | ms (setTimeout milliseconds) }
returns: Object { items (Array of objects found) | count (Number of objects found) }
```
``` javascript
// Sync
coolDB.get({ key:'name', value: 'Blue' }); // Object {items: Array[1], count: 1}

// Async
coolDB.get({ key:'name', value: 'Blue', async: true, ms: 0 }, 
  function(result){
    console.log(result); // Object {items: Array[2], count: 2}
});

```
### db
Get the cooldb Array Mirror.
```
function db()
returns: Array
```
``` javascript
// Sync
coolDB.db(); // [Object, Object, Object, Object]

```
### clone
Get the cooldb Array Clone.
```
function clone()
returns: Array
```
``` javascript
// Sync
coolDB.clone(); // [Object, Object, Object, Object]

```
### clean
Reset to empty Array the internal cooldb Array.
```
function clean(cb)
returns: cooldb object
```
``` javascript
// Sync
coolDB.clean(); // Object {changeFeed: function, get: function, add: function, del: function, db: function…}

```
### changeFeed
Subscribe to the internal cooldb Array's CRUD changes.
```
function changeFeed(fn)
returns: Object
```
``` javascript
coolDB.changeFeed(function(change){
    console.log(change);
    // Object {old: null, new: Object, action: "Inserted"}
    // Object {old: Object, new: null, action: "Deleted"}
    // Object {old: Object, new: Object, action: "Updated"}
    // Object {old: null, new: null, action: "Cleaned"}
});

```
