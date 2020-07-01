const express = require('express');
const simpleGeneratorRouter = express.Router();
const path = require('path');
const {query} = require('../db/index');

// This route is for /SimpleGenerator/


simpleGeneratorRouter.use('/js/', express.static(path.join(__dirname, '../dist/js')));


simpleGeneratorRouter.use('/react-assets', express.static(path.join(__dirname, "../dist/react-assets")));


// simpleGeneratorRouter.get('/css/App.css', (req, res) =>{
//     res.sendFile(path.join('../dist/react-assets/') + 'App.css');
// });

simpleGeneratorRouter.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../dist/') + 'simple_generator.html');
    // res.send('Hello');
})

simpleGeneratorRouter.get('/user?', async (req, res, next) => {
    // console.log(`the response is ...`);
    // const user = await query();
    console.log(`in get request`);
    res.send('hello')
    
})

module.exports = simpleGeneratorRouter;