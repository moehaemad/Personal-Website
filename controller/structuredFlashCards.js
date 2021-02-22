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
stfcRouter.put('/setDeck', Db.setDeck);

/* DELETE */

// delete card with providing optional parameter of front or back but not both
stfcRouter.delete('/delCard/:id/:front?/:back?', Db.delCard);

// delete deck given a deck id and username
stfcRouter.delete('/delDeck/:id/:username', Db.delDeck);


// get user info for debugging in database
stfcRouter.get(`/${process.env.STFC_DEBUG_ROUTE}`, (req, res) => {
    res.status(200).send({
        users: process.env.STFC_USERS,
        decks: process.env.STFC_DECK,
        cards: process.env.STFC_CARD
    })
})
module.exports  = stfcRouter;