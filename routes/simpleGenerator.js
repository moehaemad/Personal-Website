const express = require('express');
const simpleGeneratorRouter = express.Router();
const path = require('path');
const {confirmUser} = require('../db/index');

// This route is for /SimpleGenerator/


simpleGeneratorRouter.use('/js/', express.static(path.join(__dirname, '../dist/js')));


simpleGeneratorRouter.use('/react-assets', express.static(path.join(__dirname, "../dist/react-assets")));


simpleGeneratorRouter.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../dist/') + 'simple_generator.html');
})

simpleGeneratorRouter.get('/:user/:pass', (req, res) => confirmUser(req, res, req.body));


simpleGeneratorRouter.post('/', (req, res, next) => {
    console.log(req.body);
    res.json({body: req.body});
    next()
});

module.exports = simpleGeneratorRouter;