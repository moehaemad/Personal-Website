const express = require('express');
const stfcRouter = express.Router();
const Db = require('../model/stFCDB');
// The route if for /structuredFlashCards/

stfcRouter.get('/checkuser/:username/:pass', Db.checkUser);

stfcRouter.put('/createuser/:username/:pass', Db.createUser);

stfcRouter.put('/insertdeck/:id/')


module.exports  = stfcRouter;