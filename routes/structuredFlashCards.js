const express = require('express');
const stfcRouter = express.Router();
const Db = require('../db/stFCDB');
// The route if for /structuredFlashCards/

stfcRouter.get('/checkuser/:username/:pass', Db.checkUser);

stfcRouter.put('/createuser/:username/', (req, res) => {
    // TODO: implement the create user and test
    res.status(200);
})


module.exports  = stfcRouter;