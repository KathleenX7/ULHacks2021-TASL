/**
 * @fileoverview the server for the ULHacks project
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(cookieParser());

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

// rip cookies
app.get('/loggedin', (req, res) => {
    console.log(users);
    userCookie = {username: users[users.length - 1].username, password: users[users.length - 1].password};
    res.cookie("userData", userCookie);
    res.redirect("/");
});

io.sockets.on('connection', (socket) => {
    console.log("new user");
    socket.on("login", (msg) => {
        console.log(msg);
        users.push({socket: socket.id, username: msg.username, password: msg.password});
        io.to(socket.id).emit("redirect", "/loggedin");
    });
});