const xss = require('xss')

const userService={
    getAllusers(knex){
        return knex.select('*').from('users')
    },
    addanitem(knex,newitem){
        return knex
        .insert(newitem)
        .into('users')
        .returning('*')
        .then(rows=>{
            return rows[0]
        })
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
            date_created:user.date_created,
            date_modified:user.date_modified   
        }
    },
    serializedUsers(allusers){
        return allusers.map(user=>this.serializedInstrument(user))
    }
}
module.exports=userService;