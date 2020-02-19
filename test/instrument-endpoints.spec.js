const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const {TEST_DATABASE_URL} = require('../src/config')


describe('instrument endpoints',()=>{
    let db

    const testInstruments =  helpers.makeInstrumentarray();

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection:TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db));

    describe('Get /api/instruments',()=>{
        context('given no things',()=>{
            it('responds with 200 and an empty list',()=>{
                return supertest(app)
                .get('/api/instruments')
                .expect(200,[])
            })
        })
        context('given there are instrument in the db',()=>{
            beforeEach('insert instruments',()=>{
                //helpers.seedInstruments(db,testInstruments)
                db
                .into('instrument')
                .insert(testInstruments);
                
            })
            it('responds with 200 and all of the instruments',()=>{
                return supertest(app)
                .get('/api/instruments')
                .expect(200,testInstruments)
            })
        })
    })
})