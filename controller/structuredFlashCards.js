const express = require('express');
const stfcRouter = express.Router();
const Db = require('../model/stFCDB');
// The route if for /structuredFlashCards/

stfcRouter.get('/', (req, res)=>{
    res.status(200).send("Wrong endpoint buckaroo");
})

/* CREATE */

// create user in db
stfcRouter.post('/createUser', Db.createUser);

// create a list of flash cards for user
stfcRouter.post('/createDeck', Db.createDeck);

// create a card into stfc_card_text
stfcRouter.post('/createCard', Db.createCard);

/* READ */

// validate the user
stfcRouter.get('/checkUser/:username/:pass', Db.checkUser);

// TODO: if over certain amount, specify which range of ids
stfcRouter.get('/getDecks/:username', Db.getDecks);

// TODO: get list of deck ids for given user
stfcRouter.get('getDeckIds/:username', (req, res) => {
    res.status(500);
});


module.exports  = stfcRouter;