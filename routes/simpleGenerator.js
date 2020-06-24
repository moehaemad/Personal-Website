const express = require('express');
const simpleGeneratorRouter = express.Router();
const path = require('path');


simpleGeneratorRouter.use('/js/', express.static(path.join(__dirname, '../dist/js')));


simpleGeneratorRouter.use('/react-assets', express.static(path.join(__dirname, "../dist/react-assets")));


// simpleGeneratorRouter.get('/css/App.css', (req, res) =>{
//     res.sendFile(path.join('../dist/react-assets/') + 'App.css');
// });

simpleGeneratorRouter.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../dist/') + 'simple_generator.html');
    // res.send('Hello');
})

module.exports = simpleGeneratorRouter;