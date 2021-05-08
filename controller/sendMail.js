const express = require('express');
const sendMailRouter = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();
const AWS = require('aws-sdk');

//AWS SDK automatically detects the AWS_ACCESS_KEY_ID & AWS_SECRE_ACCESS_KEY
    //environment vairables.


//incase AWS sdk doesn't pickup the environment variables.
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    scretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-west-2"
})

//create aws ses object
const ses = new AWS.SES({
    apiVersion: "2020-12-01",
});


sendMailRouter.post('/', (req, res, next) => {
    //Notes for self:
    //Destiantion Interface defines array of strings for fields (ToAddresses, CcAddresses, BccAddresses). i.e. ToAddresses?: string[]
    //Message Interface defines Subject: Content, and Body: Body fields
        //the interface Content defines Data: string | undefined and Charset?: string
        //the interface Body defines Text?: Content and Html?: Content
    //Source is a string that is the verified SES email/
    const params = {
        "Destination":{
            "ToAddresses": [process.env.WORK_EMAIL]
        },
        "Message": {
            "Subject": {
                "Data": "Website: " + req.body.name,
                "Charset": "UTF-8"
            },
            "Body": {
                "Html":{
                    "Data": "<h3> EMAIL: " + req.body.email + "</h3>" + "<br/>" + req.body.subject,
                    "Charset": "UTF-8"
                },
                "Text":{
                    "Data": "body: " + req.body.email + "\nmessage: " + req.body.subject,
                    "Charset": "UTF-8"
                }

            }
        },
        "Source": process.env.WORK_EMAIL,
    }
    console.log(req.body)
    const sentEmail = ses.sendEmail(params).promise()
    sentEmail.then(data =>{
        console.log(data);
        res.status(204).send('OK');
    }).catch(err => {
        console.log(err);
        res.status(300).status('Error sending email');
    })
});


module.exports = sendMailRouter;