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
    console.log(result);
});
// Object {old: null, new: Object, action: "Inserted"}

// >> Add Array <<
// Sync
coolDB.add({ item: [{ name: 'Steven' }, { name: 'Steven 2' }] });

// Async
coolDB.add({ item: [{ name: 'Steven' }, { name: 'Steven 2' }], async: true, ms: 0 }, 
  function(result){
    console.log(result);
});
// Object {old: null, new: Object, action: "Inserted"}
// Object {old: null, new: Object, action: "Inserted"}

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
    console.log(result);
});
// Object {old: Object, new: null, action: "Deleted"}

```
