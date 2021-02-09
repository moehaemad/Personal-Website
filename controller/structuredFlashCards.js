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
// get ids for the decks of a user
stfcRouter.get('/getDecks/:username', Db.getDecks);

// get cards for a given deck
stfcRouter.get('/getCards/:id', Db.getCards);

/* UPDATE */

// update a card given the columns to update and columns specified for
stfcRouter.put('/setCard', Db.setCard);

// update a deck given the columns to update and columns specified for
stfcRouter.put('/setDeckName', Db.setDeckName);


module.exports  = stfcRouter;