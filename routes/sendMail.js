const express = require('express');
const sendMailRouter = express.Router();
const nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port
// })


sendMailRouter.get('/',req => {
    console.log('in get request')
})


module.exports = sendMailRouter;