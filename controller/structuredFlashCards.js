const express = require('express');
const stfcRouter = express.Router();
const Db = require('../model/stFCDB');
// The route if for /structuredFlashCards/

// validate the user
stfcRouter.get('/checkuser/:username/:pass', Db.checkUser);

// create user in db
stfcRouter.post('/createuser', Db.createUser);

// create a list of flash cards for user
stfcRouter.post('/insertdeck', Db.insertDeck);

// TODO: create deck for user
stfcRouter.post('/createdeck',  (req, res) => {
    res.status(500);
})

// TODO: get the list of deck information
// TODO: if over certain amount, specify which range of ids
stfcRouter.get('/getdeck/:user/:id', (req, res) => {
    res.status(500);
});

// TODO: get list of deck ids for given user
stfcRouter.get('getdeckids/:username', (req, res) => {
    res.status(500);
});


module.exports  = stfcRouter;