const express = require('express');
const sendMailRouter = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS
    }
});

sendMailRouter.post('/', req => {
    let mail = {
        from: `from "WAAAZUP" <${process.env.NODEMAILER_EMAIL}>`,
        to: process.env.WORK_EMAIL,
        subject: "Henlo",
        html: "<h1> THIS POST IS IMPORTANT... sike</h1>"
    }
    transporter.sendMail(mail, err=>{
        if (err) console.log(err);
    })
});

sendMailRouter.get('/',req => {
    console.log('in get request')
})


module.exports = sendMailRouter;