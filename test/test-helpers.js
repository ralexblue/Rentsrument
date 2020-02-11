function makeInstrumentarray(){
    return [
        {
            image:'http://placehold.it/500x500',
            name:'Acoustic guitar',
            description:'like brand new barely touched',
            category:'Guitar',
            date_created:`2029-01-22T16:28:32.615Z`
        },
        {
      
            image:'http://placehold.it/500x500',
            name:'Fender Guitar',
            description:'heavily used and scrateches play well',
            category:'Guitar',
            date_created:`2029-01-22T16:28:32.615Z`
        },
        {
            image:'http://placehold.it/500x500',
            name:'bass',
            description:'moderetly used',
            category:'Guitar',
            date_created:`2029-01-22T16:28:32.615Z`
        },
        {
            image:'http://placehold.it/500x500',
            name:'piano',
            description:'brand new',
            category:'Keyboard',
            date_created:`2029-01-22T16:28:32.615Z`
        },
        {        
            image:'http://placehold.it/500x500',
            name:'A tamborine',
            description:'used',
            category:'Percussion',
            date_created:`2029-01-22T16:28:32.615Z`
        },
        {
            image:'http://placehold.it/500x500',
            name:'violin',
            description:'will sell if need be ',
            category:'Strings',
            date_created:`2029-01-22T16:28:32.615Z`
        },
    ]
}

function cleanTables(db){
    return db.raw(
        `TRUNCATE
        instrument
        RESTART IDENTITY CASCADE`
    )
}
function seedInstruments(db,instruments){
    return db.into('instrument').insert(instruments)
    

}


module.exports ={
    makeInstrumentarray,
    cleanTables,
    seedInstruments
}
