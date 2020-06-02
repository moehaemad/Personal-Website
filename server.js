var http = require('http');
var app = require ('./app');

// Just for fun cause i'll be using http traffic and using multiple ports with default 3000
const port = 8080;

app.set('port', port);
const server = http.createServer(app);

server.listen(port);
// app.listen(port, '127.0.0.1', 511,() => console.log(`listening on port ${port}`));