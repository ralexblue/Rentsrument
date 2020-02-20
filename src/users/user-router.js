const express = require('express')

const usersRouter = express.Router()
const jsonBodyParser = express.json()
const path = require('path')
const userService =require('./user-service')
const logger = require('../logger');
const { requireAuth } = require('../middleware/jwt-auth')
const instrumentService=require('../instruments/instrument-service')
usersRouter
.route('/')
.post(jsonBodyParser, (req, res,next) => {
  const { password,user_name,email,contact,full_name} = req.body
  for (const field of ['full_name', 'user_name', 'password']){
    if (!req.body[field]){
      return res.status(400).json({
        error: `Missing '${field}' in request body`
      })
    }
  }
  const passwordErr=userService.validatePassword(password)
  if (passwordErr) {
     return res.status(400).json({
       error: passwordErr,
     })

  }
  userService.hasUserWithUserName(req.app.get('db'),user_name)
  .then(checkifuserexist=>{
    if(checkifuserexist){
      return res.status(400).json({ error: `Username already taken` })
    }
    return userService.hashPassword(password)
    .then(hashPassword=>{
        const newUser={
          user_name,
          full_name,
          password:hashPassword,
          email:email||'',
          contact:contact||'',
        }
        return userService.insertUser(req.app.get('db'),newUser)
        .then(user=>{
          res.status(201)
          .location(path.posix.join(req.originalUrl, `/${user.id}`))
          .json(userService.serializedUser(user))
        })
      })
    })
  .catch(next)  
})
.get((req,res,next) => {
  userService.getAllusers(req.app.get('db'))
  .then(users=>{
    res.json(userService.serializedUsers(users))
  })
  .catch(next)
})

usersRouter
.route('/:id')
.all((req,res,next)=>{
  const userid = req.params.id;
  userService.getById(req.app.get('db'),userid)
  .then(user=>{
    if(!user){
      logger.error(`user with id ${userid} not found`)
      return res.status(404).json({
        error:{message:`User Not Found`}
      })
    }
    res.user=user;
    next()
  })
  .catch(next)
})
.get((req,res)=>{
  res.json(userService.serializedUser(res.user))
})
.patch(requireAuth,jsonBodyParser,(req,res,next)=>{
  const {user_name,full_name,email,contact} =req.body;
  const updateUser={id:req.params.id,user_name,full_name,email,contact}
  if (!updateUser.user_name || !updateUser.full_name) {
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'user_name','full_name'`
        }
      })
  }
  userService.updateitem(req.app.get('db'),req.params.id,updateUser)
  .then(numRowsAffected=>{
      res.status(201).end()
  })
  .catch(next)
})




usersRouter
.route('/instruments/:id')
.get((req,res,next)=>{
  const userid = req.params.id;
  userService.getAllInstrumentsForUser(req.app.get('db'),userid)
  .then(inst=>{
    if(!inst){
      logger.error(`instruments with user-id ${userid} not found`)
      return res.status(404).json({
        error:{message:`User instruments Not Found`}
      })
    }
    res.json(instrumentService.serializedInstruments(inst))
  })
  .catch(next)
})



module.exports = usersRouter