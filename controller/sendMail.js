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

sendMailRouter.post('/', (req, res, next) => {
    let mail = {
        from: '"' +req.body.name + '" <' + process.env.NODEMAILER_EMAIL + '>',
        to: process.env.WORK_EMAIL,
        subject: "Website: " + req.body.name,
        html: "<h3> EMAIL: " + req.body.email + "</h3>" + "<br/>" + req.body.message
    }
    transporter.sendMail(mail, err=>{
        if (err) console.log(err);
    })
    res.status(204).send('OK');
});


module.exports = sendMailRouter;