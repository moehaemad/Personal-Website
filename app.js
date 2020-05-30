const express = require('express');
const app = express();
const port = 3001;
const http = require('http');


app.use(express.static(__dirname + '/src/'))
console.log(__dirname)
app.get('/', (req, res) =>{
    // res.send('Hello World to the Express JS app');
    // res.render('src/public/index');
    res.send(index);
})

app.listen(port, '127.0.0.1', 511,() => console.log(`listening on port ${port}`));