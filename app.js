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
app.use('/', express.static(path.join(__dirname, './dist/')));
app.use('/css/', express.static(path.join(__dirname, './dist/css')));
app.use('/LudoGame', ludoRouter);
app.use('/SimpleGenerator', simpleGeneratorRouter);
app.use('/sendMail', sendMailRouter);

app.get('/cgr', (req, res) => {
    res.download(path.join('./dist/') + 'images/cgrgambling.pdf');
});
app.get('/', (req, res) =>{
    res.sendFile(path.join('./dist/') + 'index.html');
});



module.exports = app;