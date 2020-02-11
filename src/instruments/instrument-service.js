const xss = require('xss')


const instrumentService={
    getAllinstruments(knex){
        return knex.select('*').from('instrument')
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
        return{
            id:inst.id,
            image:xss(inst.image),
            name:xss(inst.name),
            decription:xss(inst.description),
            date_created:inst.date_created
        }
    },
    serializedInstruments(allinst){
        return allinst.map(inst=>this.serializedInstrument(inst))
    }
}
module.exports=instrumentService;