const AuthService = require('../auth/auth-service')
function requireAuth(req, res, next) {
    const authToken = req.get('Authorization')||'';
    let bearerToken
    if(!authToken.toLowerCase().startsWith('bearer ')){
    return res.status(401).json({ error: 'Missing bearer token' })
    }
    else{
        bearerToken=authToken.slice(7,authToken.length)
    }
    try{
        const payload = AuthService.verifyJwt(bearerToken);
        console.log(bearerToken)
        console.log(payload)
        AuthService.getUser(req.app.get('db'),payload)
        .then(user=>{
            //console.log(user);
            if(!user){
                return res.status(401).json({ error: 'Unauthorized request' })
            }
            req.user = user
            next()
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }catch(error){
        res.status(401).json({ error: 'Unauthorized request' })
    }
  }
  
  module.exports = {
    requireAuth,
  }