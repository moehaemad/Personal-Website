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

sendMailRouter.post('/', (req, res) => {
    let mail = {
        // from: `from "WAAAZUP" <${process.env.NODEMAILER_EMAIL}>`,
        from: 'from "' + req.body.name + '" <' + process.env.NODEMAILER_EMAIL + '>',
        to: process.env.WORK_EMAIL,
        subject: req.body.subject,
        html: "<h1> EMAIL: " + req.body.email + "</h1>" + "<br/>" + req.subject
    }
    // transporter.sendMail(mail, err=>{
    //     if (err) console.log(err);
    // })
});

sendMailRouter.get('/',(req, res) => {
    res.send('sup');
})


module.exports = sendMailRouter;