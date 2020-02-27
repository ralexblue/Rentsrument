const xss = require('xss')


const instrumentService={
    getAllinstruments(knex){
            return knex.select('*').from('users').leftJoin('instrument','users.id','=','instrument.user_id')
    },
    addanitem(knex,newitem){
        return knex
        .insert(newitem)
        .into('instrument')
        .returning('*')
        .then(rows=>{
            return rows[0]
        })
    },
    getById(knex,id){
        return knex.from('instrument').select('*').where('id',id).first()
    },
    getUserWhoOwnsinst(knex,id){
        return knex.from('instrument').select('*').where('id',id).first()
    },
    getByUserId(knex,id){
        return knex.from('users').select('*').where('id',id).first()
    },
    deleteanitem(knex,id){
        return knex('instrument')
        .where({id})
        .delete()
    },
    updateitem(knex,id,newupdatefield){
        return knex('instrument')
        .where({id})
        .update(newupdatefield)
    },
    serializedInstrument(inst){
    if(inst.id){
        return{
            id:inst.id,
            image:xss(inst.image),
            name:xss(inst.name),
            decription:xss(inst.description),
            user_id:(inst.user_id),
            user_name:xss(inst.user_name),
            email:xss(inst.email),
            contact:xss(inst.contact),  
            date_created:inst.date_created
        }
    }
    else{
        return 0;
    }
        
    },
    serializedInstruments(allinst){
        const all=allinst.map(inst=>this.serializedInstrument(inst))
        const newall =all.filter(instrument=> instrument !== 0 )
        return newall
    }
}
module.exports=instrumentService;