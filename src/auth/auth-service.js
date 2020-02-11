
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
    getUser(db,user){
    db
    .where({ user_name: user.user_name})
    .first()
    .then(dbUser=>{
        if(!dbUser)
        return res.status(400).json({
            error: 'Incorrect user_name or password',
        })
        return bcrypt.compare(loginUser.password,dbUser.password)
        .then(compareMatch=>{
            if(!compareMatch)
            return res.status(400).json({
               error: 'Incorrect user_name or password',
             })
             const sub =dbUser.user_name
             const payload={user_id: dbUser.id}
             const token= this.createJwt(sub,payload);
            res.send({
                authToken:token,
            });
        })
    })
    }
}

module.exports=authService