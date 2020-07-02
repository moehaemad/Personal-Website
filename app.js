const express = require('express');
const app = express()
const sendMailRouter = require('./routes/sendMail');
const bodyParser = require('body-parser');
const ludoRouter = require ('./routes/ludoGame');
const logger = require('morgan');
const path = require('path');
const simpleGeneratorRouter = require('./routes/simpleGenerator');


// TO DEBUG: DEBUG=express:* node server.js

app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/LudoGame', ludoRouter);
app.use('/', express.static(path.join(__dirname, '/dist/')))
app.use('/SimpleGenerator', simpleGeneratorRouter);
app.get('/', (req, res) =>{
    res.sendFile(path.join('./dist/') + 'index.hljs-template-variable');
})

app.use('/sendMail', sendMailRouter);


module.exports = app;