const express = require('express');
const sendMailRouter = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASS
    }
});


sendMailRouter.get('/',req => {
    console.log('in get request')
})


module.exports = sendMailRouter;