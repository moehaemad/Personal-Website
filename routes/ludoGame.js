const express = require('express');
const ludoRouter = express.Router();
const path = require('path');

ludoRouter.use('/resources/', express.static(path.join(__dirname, '../src/LudoGame/resources')));

ludoRouter.use ('/css/', express.static(path.join(__dirname, '../src/LudoGame/css')));

ludoRouter.use ('/js/', express.static(path.join(__dirname, '../src/LudoGame/js')));

ludoRouter.get('/', (req, res) => {
    // res.render(ludo, (err, html) =>{
    //     if (err) res.send(err);
    //     res.send(html);
    // });
    res.sendFile(path.join(__dirname, '../src/LudoGame/') + 'ludo.html');
});

module.exports = ludoRouter;