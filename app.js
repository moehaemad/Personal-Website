const express = require('express');
const app = express()
const sendMailRouter = require('./routes/sendMail');


app.use(express.static(__dirname + '/src/'))
console.log(__dirname)
app.get('/', (req, res) =>{
    // res.send('Hello World to the Express JS app');
    // res.render('src/public/index');
    res.render(index);
})

app.use('/sendMail', sendMailRouter);


module.exports = app;