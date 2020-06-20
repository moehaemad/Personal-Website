const express = require('express');
const app = express()
const sendMailRouter = require('./routes/sendMail');
const bodyParser = require('body-parser');
const ludoRouter = require ('./routes/ludoGame');
const morgan = require('morgan');
const path = require('path');


// TO DEBUG: DEBUG=express:* node server.js

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/LudoGame', ludoRouter);
app.use('/', express.static(path.join(__dirname, '/dist/')))

app.get('/', (req, res) =>{
    res.sendFile(index);
})

app.use('/sendMail', sendMailRouter);


module.exports = app;