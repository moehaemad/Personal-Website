const express = require('express');
const SimpleGeneratorRouter = express.Router();
const path = require('path');


SimpleGeneratorRouter.get('/', (req, res) =>{
    res.send('Wazzup');
})

module.exports = SimpleGeneratorRouter;