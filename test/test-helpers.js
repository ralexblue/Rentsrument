function makeInstrumentarray(users){
    return [
        {
            id:1,
            image:'http://placehold.it/500x500',
            name:'Acoustic guitar',
            description:'like brand new barely touched',
            category:'Guitar',
            user_id:users[0].id,
            date_created:`2029-01-22T16:28:32.615Z`
        },
        {
            id:2,
            image:'http://placehold.it/500x500',
            name:'Fender Guitar',
            description:'heavily used and scrateches play well',
            category:'Guitar',
            user_id:users[0].id,
            date_created:`2029-01-22T16:28:32.615Z`
        },
        {
            id:3,
            image:'http://placehold.it/500x500',
            name:'bass',
            description:'moderetly used',
            category:'Guitar',
            user_id:users[0].id,
            date_created:`2029-01-22T16:28:32.615Z`
        },
        {
            id:4,
            image:'http://placehold.it/500x500',
            name:'piano',
            description:'brand new',
            category:'Keyboard',
            user_id:users[0].id,
            date_created:`2029-01-22T16:28:32.615Z`
        },
        {   id:5,     
            image:'http://placehold.it/500x500',
            name:'A tamborine',
            description:'used',
            category:'Percussion',
            user_id:users[0].id,
            date_created:`2029-01-22T16:28:32.615Z`
        },
        {
            id:6,
            image:'http://placehold.it/500x500',
            name:'violin',
            description:'will sell if need be ',
            category:'Strings',
            user_id:users[0].id,
            date_created:`2029-01-22T16:28:32.615Z`
        },
    ]
}
function usersForinstruments(){
    [
        {
            id:1,
            user_name:'testuser',
            full_name:'bob joe',
            password:'password',
            email:'test1@email.com',
            contact='111-222-3333'
        },
        {
            id:2,
            user_name:'testuser2',
            full_name:'bob joe2',
            password:'password2',
            email:'test2@email.com',
            contact='112-222-3333'
        },
    ]

}
function makeAuthHeader(user, secret = JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.user_name,
      algorithm: 'HS256',
    })
    return `Bearer ${token}`
}

function cleanTables(db){
    return db.raw(
        `TRUNCATE
        instrument,
        users
        RESTART IDENTITY CASCADE`
    )
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('users').insert(preppedUsers)
      .then(() =>
        db.raw(
          `SELECT setval('users_id_seq', ?)`,
          [users[users.length - 1].id],
        )
      )
  }



  function seedInstruments(db, users, instruments){
    return seedUsers(db,users)
      .then(()=>
        db.into('instruments')
        .insert(instruments)
      )
  }



module.exports ={
    makeInstrumentarray,
    cleanTables,
    seedInstruments,
    usersForinstruments,
    makeAuthHeader,
    seedUsers
}
