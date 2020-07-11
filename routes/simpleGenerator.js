const express = require('express');
const simpleGeneratorRouter = express.Router();
const path = require('path');
const Db = require('../db/index');

// This route is for /SimpleGenerator/


simpleGeneratorRouter.use('/js/', express.static(path.join(__dirname, '../dist/js')));


simpleGeneratorRouter.use('/react-assets', express.static(path.join(__dirname, "../dist/react-assets")));


simpleGeneratorRouter.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../dist/') + 'simple_generator.html');
})

simpleGeneratorRouter.get('/:user/:pass', Db.confirmUser);


simpleGeneratorRouter.get('/randValues/:user/:type', Db.getValues);


simpleGeneratorRouter.post('/createUser', Db.createUser);

simpleGeneratorRouter.post('/insertValue', Db.insertValue);

simpleGeneratorRouter.post('/deleteValue', Db.deleteValue);

module.exports = simpleGeneratorRouter;