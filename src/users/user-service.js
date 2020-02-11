const xss = require('xss')
const bcrypt = require('bcryptjs')

const userService={
    hashPassword(password) {
        return bcrypt.hash(password, 12)
    },
    validatePassword(password) {
        if (password.length < 5) {
            return 'Password must be longer than 5 characters'
        }
        if (password.length > 72) {
            return 'Password must be less than 72 characters'
        }
        if (password.startsWith(' ')||password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
        }
    },
    hasUserWithUserName(db, user_name) {
        return db('users')
        .where({ user_name })
        .first()
        .then(user => !!user)
    },
    getAllusers(knex){
        return knex.select('*').from('users')
    },
    insertUser(db, newUser) {
        return db
        .insert(newUser)
        .into('users')
        .returning('*')
        .then(([user]) => user)
    },
    getById(knex,id){
        return knex.from('users').select('*').where('id',id).first()
    },
    deleteanitem(knex,id){
        return knex('users')
        .where({id})
        .delete()
    },
    updateitem(knex,id,newupdatefield){
        return knex('users')
        .where({id})
        .update(newupdatefield)
    },
    serializedUser(user){
        return{
            id:user.id,
            user_name:xss(user.user_name),
            full_name:xss(user.full_name),
            password:xss(user.password),
            email:xss(user.email),
            contact:xss(user.contact),
            date_created:user.date_created,
            date_modified:user.date_modified   
        }
    },
    serializedUsers(allusers){
        return allusers.map(user=>this.serializedUser(user))
    }
}
module.exports=userService;