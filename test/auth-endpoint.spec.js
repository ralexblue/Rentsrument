const knex =require('knex');
const app =require('../src/app');
const helpers =require('./test-helpers');
const {TEST_DB_URL, JWT_SECRET} = require('../src/config')
const jwt = require('jsonwebtoken')

describe('Auth endpoint',()=>{
    let db
    const testUsers = helpers.makeUsersArray();
    const testUser = testUsers[0];

    before('make knex instance',()=>{
        db=knex({
            client:'pg',
            connection:TEST_DB_URL,
        })
        app.set('db',db)
    })
    after('disconnect from db',()=>db.destroy())

    before('cleanup',()=>helpers.cleanTables(db))

    afterEach('cleanup',()=>helpers.cleanTables(db))

    describe('POST /api/auth/login',()=>{
        beforeEach('insert users',()=>
            helpers.seedUsers(
                db,
                testUsers
            )
        )
        const requireFields =['user_name','password']
        requireFields.forEach(field=>{
            const loginAttemptBody= {
                user_name:testUser.user_name,
                password:testUser.password
            }
            it(`responds with 400 required error when ${field} is missing`,()=>{
                delete loginAttemptBody[field]
                
                return supertest(app)
                .post('/api/auth/login')
                .send(loginAttemptBody)
                .expect(400,{
                    error: `Missing ${field} in request body`
                })
            })
        })
        it('responds 400 invalid user_name and password when bad user_name',()=>{
            const invalidUser={user_name:'user-not',password:'password-not'}
            return supertest(app)
            .post('/api/auth/login')
            .send(invalidUser)
            .expect(400,{error:`Incorrect user_name or password`})
        })
        it(`responds 400 'invalid user_name or password' when bad password`, () => {
            const userInvalidPass = { user_name: testUser.user_name, password: 'incorrect' }
            return supertest(app)
            .post('/api/auth/login')
            .send(userInvalidPass)
            .expect(400, { error: `Incorrect user_name or password` })
        })
        it('responds 200 and jwt auth token using secret when valid credentails',()=>{
            const userValidCreds={
                user_name:testUser.user_name,
                password:testUser.password
            }
            const expectedToken =jwt.sign(
                {user_id:testUser.id},
                    JWT_SECRET
                ,{
                    subject:testUser.user_name,
                    algorithm:'HS256',
                }
            )
            return supertest(app)
                .post('/api/auth/login')
                .send(userValidCreds)
                .expect(200, {
                    authToken: expectedToken,
            })
        })
        
    })
})