const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const {TEST_DATABASE_URL} = require('../src/config')


describe('users endpoints',()=>{
    let db

    
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

    describe('Get /api/users',()=>{
        context('given no things',()=>{
            it('responds with 200 and an empty list',()=>{
                return supertest(app)
                .get('/api/users')
                .expect(200,[])
            })
        })
        context('given there are users in the db',()=>{
            beforeEach('insert users',()=>{
                helpers.seedUsers(db,testUsers)
            })
            it('responds with 200 and one of the users',()=>{
                return supertest(app)
                .get('/api/users/1')
                .expect(200,testUsers[0])
            })
        })

    })
    describe('Post request api/users',()=>{
        beforeEach('insert users',()=>{
            helpers.seedUsers(db,testUsers)
        })
        it(`responds 401 'Unauthorized request' when invalid password`, () => {
            const userInvalidPass = { user_name: testUsers[0].user_name, password: 'wrong' }
            return supertest(app)
              .post('/api/users')
              .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
              .expect(401, { error: `Unauthorized request` })
        })
        it("creates a new user",function(){
            const tesuser=testUsers[0];
            const newuser={
                id:2,
                user_name:'man123',
                full_name:'man man',
                email:'email ',
                contact:'545464',
                date_created:`2029-01-22T16:28:32.615Z`
            }
            return supertest(app)
                .post('/api/users')
                .set('Authorization', helpers.makeAuthHeader(tesuser))
                .send(newuser)
                .expect(201)
        })     
    })
    describe('delete request api/users',()=>{
        beforeEach('insert users',()=>{
            helpers.seedUsers(db,testUsers)
        })
        it("deletes an item",()=>{
            const usersToDel=testUsers[0];
            const delusersList=testUsers.filter(user=>user.id!=usersToDel.id)
            const tesuser=testUsers[0];
            return supertest(app)
            .delete(`/api/users/${usersToDel.id}`)
            .set('Authorization', helpers.makeAuthHeader(tesuser))
            .get('/api/users')
            .expect(200,delusersList)
        })
    })
    describe('patch request api/users',()=>{
        beforeEach('insert users',()=>{
            helpers.seedUsers(db,testUsers)
        })
        it("patch an existing item",()=>{
            const tesuser=testUsers[0];
            const Updateduser={
                id:tesuser.id,
                user_name:'man123',
                full_name:'man man',
                email:'email ',
                contact:'545464',
                date_created:`2029-01-22T16:28:32.615Z`
            }
            return supertest(app)
            .patch(`/api/users/${tesuser.id}`)
            .set('Authorization', helpers.makeAuthHeader(tesuser))
            .send(Updateduser)
            .get(`/api/users/${tesuser.id}`)
            .expect(200,Updateduser)
        })
    })
})