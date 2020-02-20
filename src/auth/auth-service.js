
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcryptjs')

const authService ={
    comparePasswords(password, hash) {
        return bcrypt.compare(password, hash)
    },
    createJwt(subject, payload) {
        return jwt.sign(payload, config.JWT_SECRET, {
            subject,
            algorithm: 'HS256',
        })
    },
    verifyJwt(token) {
           return jwt.verify(token, config.JWT_SECRET, {
             algorithms: ['HS256'],
           })
         },
    getUser(db,loginUser){
    return db ('users')
    .where({user_name:loginUser.user_name||loginUser.sub})
    .first()
    }
}

module.exports=authService