const express = require('express');
const stfcRouter = express.Router();
const Db = require('../model/stFCDB');
// The route if for /structuredFlashCards/

// validate the user
stfcRouter.get('/checkUser/:username/:pass', Db.checkUser);

// create user in db
stfcRouter.post('/createUser', Db.createUser);

// create a list of flash cards for user
stfcRouter.post('/createDeck', Db.createDeck);

// TODO: insert card into deck for user
stfcRouter.post('/insertCard',  (req, res) => {
    res.status(500);
})

// TODO: get the list of deck information
// TODO: if over certain amount, specify which range of ids
stfcRouter.get('/getDeck/:username', (req, res) => {
    res.status(500);
});

// TODO: get list of deck ids for given user
stfcRouter.get('getDeckIds/:username', (req, res) => {
    res.status(500);
});


module.exports  = stfcRouter;