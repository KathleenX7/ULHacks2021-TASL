/**
 * @fileoverview the server for the ULHacks project
 */

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server);

var users = [];

app.use(express.static(__dirname));

/**
 * server listens on port 3000
 */
server.listen(3000, () => {
    console.log('listening on *:3000');
});

app.get('/', (req, res) => {
    // if not logged in, go to login
    // otherwise go to interface stuff
    res.sendFile(__dirname + '/LoginPage.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/LoginPage.html');
});