var coolDb = cooldb,
    coolDB = coolDb();

coolDB.changeFeed(function(change){
    console.log(change);
});


//coolDB.add({ item: {name: 'Steven 2'}, async: true, ms: 0 });

// add
//coolDB.add({name: 'Steven'}); // Key => [item] was not found

/*
coolDB.add({ item: {name: 'Steven'} }); 
coolDB.add({ item: {name: 'Mochi'} });
coolDB.add({ item: {name: 'Carlos'} });
coolDB.add({ item: {name: 'Carlos'} });
coolDB.add({ item: {name: 'Cindy'} });
coolDB.add({ item: {name: 'Jenny'} });
coolDB.add({ item: {name: 'Papa'} });
*/

/*
console.log('Before async add');
coolDB.add({ item: {name: 'Carlos'}, async: true });
coolDB.add({ item: {name: 'Cindy'}, async: true });
console.log('After async add');
*/

// delete
/*
console.log(coolDB.db()[2]);
coolDB.del({ key: 'name', value: 'Carlos' });
console.log('Delete 1');
console.log(coolDB.db()[2]);
coolDB.del({ key: 'cuid', value: coolDB.db()[2].cuid });
console.log('Delete 2');
*/

/*
console.log('Before async del');
console.log(coolDB.db()[2]);
coolDB.del({ key: 'name', value: 'Carlos', async: true }, function(data) { console.log('response'); });
console.log(coolDB.db()[3]);
coolDB.del({ key: 'cuid', value: coolDB.db()[3].cuid, async: false });
console.log('After async del');
*/

//console.log(coolDB.get({ key: 'name', value: 'Carlos'}));
//console.log(coolDB.first({ key: 'name', value: 'Carlos'}));

//console.log(coolDB.del({ key: 'name', value: 'Carlos' }));

//console.log(coolDB.update({ key: 'name', value: 'Carlos', item: { name: 'Pacman' } }));


var people = [
    { name: 'Mary' },
    { name: 'Blue' },
    { name: 'Blue' },
    { name: 'Trunk' }
];

coolDB.add({ item: people });


//console.log( coolDB.first({ key:'name', value: 'Blue' }) );
// console.log( coolDB.get({ key:'name', value: 'Blue' }) );

/*
coolDB.first({ key:'name', value: 'Blue', async: true, ms: 0 }, function(result){
    console.log(result);
});
*/

/*
coolDB.get({ key:'name', value: 'Blue', async: true, ms: 0 }, function(result){
    console.log(result);
});
*/


coolDB.del({ key:'name', value: 'Mary' });

/*
coolDB.del({ key:'name', value: 'Mary', async: true, ms: 0 }, function(result){
    console.log(result);
});
*/

//coolDB.add({ item: people, async: true, ms: 0 });

coolDB.update({ key: 'name', value: 'Blue', item: { name: 'Pacman' } });

/*
coolDB.update({ key: 'name', value: 'Blue', item: { name: 'Pacman' }, async: false, ms: 0 }, 
function (result){
    console.log(result);
});
*/

//console.log(coolDB.db());
//console.log(coolDB.clone());
console.log( coolDB.clean() );

