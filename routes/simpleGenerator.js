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

simpleGeneratorRouter.get('/user?', async (req, res) => {
    // await query((errQuery, resQuery) => {
    //     res.json({something: resQuery, other: errQuery});
    // });
    const data = await query();
    res.json({query: data.rows});
    
})

module.exports = simpleGeneratorRouter;