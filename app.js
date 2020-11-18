const express = require('express');
const app = express()
const sendMailRouter = require('./routes/sendMail');
const bodyParser = require('body-parser');
const ludoRouter = require ('./routes/ludoGame');
const logger = require('morgan');
const path = require('path');
const simpleGeneratorRouter = require('./routes/simpleGenerator');
// const log = require('./db/logging');


// TO DEBUG: DEBUG=express:* node server.js

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use('/', express.static(path.join(__dirname, './dist/')));
app.use('/css/', express.static(path.join(__dirname, './dist/css')));
app.use(['/LudoGame', '/ludogame'], ludoRouter);
app.use(['/SimpleGenerator', '/simplegen', '/simplegenerator'], simpleGeneratorRouter);
app.use('/sendMail', sendMailRouter);

app.get(['/workextension', '/WorkExt', '/workext', '/WorkExtension'], (req, res) => res.redirect('https://github.com/moehaemad/WorkExtension'));

app.get(['/BudgetCalculator', '/budgetcalculator', '/budgetcalc', '/BudgetCalc'], (req, res) => res.redirect('https://github.com/moehaemad/Budget-Calc.'));

app.get(['/cgr', '/CGR'], (req, res) => {
    if (req.path === '/CGR') res.redirect('https://github.com/moehaemad/CGR-Project');
    res.download(path.join('./dist/') + 'images/cgrgambling.pdf');
});
app.get('/', (req, res) =>{
    // log.logConnection();
    res.sendFile(path.join('./dist/') + 'index.html');
});




module.exports = app;