const express =require('express');
const path =require('path');
const logger = require('../logger');
const bodyParser=express.json();
const instrumentService=require('./instrument-service')
const { requireAuth } = require('../middleware/jwt-auth')


const instrumentRouter=express.Router();



instrumentRouter
.route('/')
.get((req,res,next)=>{
    instrumentService.getAllinstruments(req.app.get('db'))
    .then(instruments=>{
        res.json(instrumentService.serializedInstruments(instruments))
    })
    .catch(next)
})
.post(requireAuth,bodyParser,(req,res,next)=>{
    const {image,name,description,category} =req.body;
    const newInstrument={image,name,description,category}
    for (const [key, value] of Object.entries(newInstrument)){
      if (value == null){
            return res.status(400).json({
            error: `Missing '${key}' in request body`
            })
        }
    }
    instrumentService.addanitem(req.app.get('db'),newInstrument)
    .then(instrument=>{
        res.status(201)
        .location(path.posix.join(req.originalUrl, `/${instrument.id}`))
        .json(instrumentService.serializedInstrument(instrument))
    })
    .catch(next)
})

instrumentRouter
.route('/:id')
.all((req,res,next)=>{
    const instrument_id=req.params.id;
    instrumentService.getById(req.app.get('db'),instrument_id)
    .then(instrument=>{
        if(!instrument){
            logger.error(`Instrument with id ${instrument_id} not found`)
            return res.status(400).json({
                error:{message:`Instrument Not Found`}
            })
        }
        res.instrument=instrument
        next()
    })
    .catch(next)
})
.get((req,res)=>{
    res.json(instrumentService.serializedInstrument(res.instrument))
})
.delete(requireAuth,(req,res,next)=>{
    const instrument_id=req.params.id;
    instrumentService.deleteanitem(req.app.get('db'),instrument_id)
    .then(numRowsAffected=>{
        logger.info(`Instument with id ${instrument_id} deleted`)
        res.status(204).end()
    })
    .catch(next) 
})
.patch(requireAuth,bodyParser,(req,res,next)=>{
    const {image,name,description,category} =req.body;
    const updateInstrument={id:req.params.id,image,name,description,category}
    const numberOfValues = Object.values(updateInstrument).filter(Boolean).length
    if (numberOfValues === 0) {
        return res.status(400).json({
          error: {
            message: `Request body must contain either 'name'`
          }
        })
    }
    instrumentService.updateitem(req.app.get('db'),req.params.id,updateInstrument)
    .then(numRowsAffected=>{
        res.status(201).end()
    })
    .catch(next)
})


module.exports=instrumentRouter;




