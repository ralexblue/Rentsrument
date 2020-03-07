const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const {TEST_DATABASE_URL} = require('../src/config')


describe('instrument endpoints',()=>{
    let db

    const testInstruments =  helpers.makeInstrumentarray();
    const testUsers=helpers.makeUsersArray();

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
                helpers.seedInstruments(db,testInstruments,testUsers)
            })

            it('responds with 200 and all of the instruments',()=>{
                return supertest(app)
                .get('/api/instruments')
                .expect(200,testInstruments)
            })
            it('responds with 200 and one of the instruments',()=>{
                return supertest(app)
                .get('/api/instruments/1')
                .expect(200,testInstruments[0])
            })
        })

    })
    describe('Post request api/instruments',()=>{
        beforeEach('insert instruments',()=>{
            helpers.seedInstruments(db,testInstruments,testUsers)
        })
        it(`responds 401 'Unauthorized request' when invalid password`, () => {
            const userInvalidPass = { user_name: testUsers[0].user_name, password: 'wrong' }
            return supertest(app)
              .post('/api/reviews')
              .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
              .expect(401, { error: `Unauthorized request` })
        })
        it("creates a new instrument",function(){
            const tesuser=testUsers[0];
            const newInstrument={
                id:6,
                image:'http://placehold.it/500x500',
                name:'cello',
                description:'okoko ',
                category:'Strings',
                user_id:tesuser.id,
                date_created:`2029-01-22T16:28:32.615Z`
            }
            return supertest(app)
                .post('/api/instrument')
                .set('Authorization', helpers.makeAuthHeader(testUser))
                .send(newInstrument)
                .expect(201)
        })     
    })
    describe('delete request api/instruments',()=>{
        beforeEach('insert instruments',()=>{
            helpers.seedInstruments(db,testInstruments,testUsers)
        })
        it("deletes an item",()=>{
            const instrumentToDel=testInstruments[0];
            const delInstrumentList=testInstruments.filter(inst=>inst.id!=instrumentToDel.id)
            const tesuser=testUsers[0];
            return supertest(app)
            .delete(`/api/instrument/${instrumentToDel.id}`)
            .set('Authorization', helpers.makeAuthHeader(tesuser))
            .get('/api/instruments')
            .expect(200,delInstrumentList)
        })
    })
    describe('patch request api/instruments',()=>{
        beforeEach('insert instruments',()=>{
            helpers.seedInstruments(db,testInstruments,testUsers)
        })
        it("patch an existing item",()=>{
            const tesuser=testUsers[0];
            const oldintrument=testInstruments[1];
            const updateinstrument={
                image:'http://placehold.it/500x500',
                name:'updateanem',
                description:'update ',
                category:'Strings',
                user_id:tesuser.id,
                date_created:`2029-01-22T16:28:32.615Z`
            }
            return supertest(app)
            .patch(`/api/instrument/${oldintrument.id}`)
            .set('Authorization', helpers.makeAuthHeader(tesuser))
            .send(updateinstrument)
            .get(`/api/instruments/${oldintrument.id}`)
            .expect(200,updateinstrument)
        })
    })
})