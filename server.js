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
var userToLogin = null;

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
    if (req.cookies.userData === undefined) {
        // not logged in
        res.redirect("/login"); // so send log in
    } else {
        // should redirect to dashboard
        res.redirect("/dashboard");
    }
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/LoginPage.html");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/Register.html");
});

// rip cookies
app.get("/loggedin", (req, res) => {
    console.log(users);
    userCookie = {username: userToLogin.username, password: userToLogin.password};
    res.cookie("userData", userCookie);
    res.cookie("pfp", userToLogin.pfp);
    res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
    res.sendFile(__dirname + "/Dashboard.html");
});

app.get("/game", (req, res) => {
    res.sendFile(__dirname + "/Game.html");
});

io.sockets.on("connection", (socket) => {
    console.log("new user");
    socket.on("login", (loginData) => {
        let everythingWorkedFineAndDidntBreak = false;
        for (let i = 0 ;i < users.length;i++) {
            const user = users[i];
            console.log(user.username + user.password);
            if ((user.username === loginData.username) && (user.password === loginData.password)) {
                everythingWorkedFineAndDidntBreak = true;
                userToLogin = {username: loginData.username, password: loginData.password, pfp: user.pfp};
                io.to(socket.id).emit("redirect", "/loggedin");
            }
        }
        if (!everythingWorkedFineAndDidntBreak) {
            io.to(socket.id).emit("error", "Username or password is incorrect");
        }
    });
    socket.on("register", (regData) => {
        console.log(regData);
        let username = regData.username;
        let everythingWorkedFineAndDidtBreak = true;
        console.log(users);
        for(let i = 0;i < users.length;i++) {
            let user = users[i];
            console.log(`user: ${user}`);
            if (user.username === username) {
                io.to(socket.id).emit("error", "This username is taken");
                everythingWorkedFineAndDidtBreak = false;
            }
        }
        if (everythingWorkedFineAndDidtBreak) {
            // registration successful
            users.push(regData);
            io.to(socket.id).emit("redirect", "/login");
        }
    });
});