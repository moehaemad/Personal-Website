const express = require('express');
const simpleGeneratorRouter = express.Router();
const path = require('path');
const {query} = require('../db/index');

// This route is for /SimpleGenerator/


simpleGeneratorRouter.use('/js/', express.static(path.join(__dirname, '../dist/js')));


simpleGeneratorRouter.use('/react-assets', express.static(path.join(__dirname, "../dist/react-assets")));


simpleGeneratorRouter.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../dist/') + 'simple_generator.html');
})

simpleGeneratorRouter.get('/rest/:user', async (req, res, next)=>{
    let data;
    try{
        data = await query(req.params.user);
        res.json({query: data.rows});
    }catch(e){
        console.log('an error occured with query in GET');
        res.json({query: 'error with query'});
    }
    next();
})

module.exports = simpleGeneratorRouter;