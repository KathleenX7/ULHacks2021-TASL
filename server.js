/**
 * @fileoverview the server for the ULHacks project
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const http = require('http');
const { ESRCH } = require('constants');
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(cookieParser());

let users = [];
let userToLogin = null;

const questionFiles = {
    alphabet: ["A.png", "B.png", "C.png", "D.png", "E.png", "F.png", "G.png", "H.png", "I.png", "J.png", 
        "K.png", "L.png", "M.png", "N.png", "O.png", "P.png", "Q.png", "R.png", "S.png", "T.png", "U.png", "V.png", 
        "W.png", "X.png", "Y.png", "Z.png"],
    numbers: ["0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png"],
    oneWordQuestions: ["how.jpg", "what.jpg", "when.jpg", "where.jpg", "which.jpg", "who.jpg", "why.jpg"],
    adjectives: ["bad.png", "black.png", "blue.png", "brown.png", "cold.png", "good.png", "green.png", "happy.png", 
        "hot.png", "orange.png", "pink.png", "purple.png", "red.png", "sad.png", "white.png", "yellow.png"],
    nouns: ["bear.png", "bicycle.png", "car.jpg", "chair.jpg", "family.png", "plane.jpg", "water.png"],
    verbsPng: ["tochoose.png", "toclean.png", "tocompliment.png", "todrive.jpg", "tofinish.png", "tofly.jpg", "togo.png", "topickup.png", "tosit.jpg"],
    commonPhrases: ["goodbye.jpg", "hello.jpg", "iloveyou.png", "nicetomeetyou.jpg", "no.jpg", "please.jpg", "thanks.jpg", "thankyou.png", "yes.jpg"]
};

const questions = {
    alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    oneWordQuestions: ["How", "What", "When", "Where", "Which", "Who", "Why"],
    adjectives: ["Bad", "Black", "Blue", "Brown", "Cold", "Good", "Green", "Happy", "Hot", "Orange", "Pink", "Purple", "Red", "Sad", "White", "Yellow"],
    nouns: ["Bear", "Bicycle", "Car", "Chair", "Family", "Plane", "Water"],
    verbsPng: ["To choose", "To clean", "To compliment", "To drive", "To finish", "To fly", "To go", "To pick up", "To sit"],
    commonPhrases: ["Goodbye", "Hello", "I love you", "Nice to meet you", "No", "Please", "Thanks", "Thank you", "Yes"]
}

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

app.get("/logout", (req, res) => {
    res.clearCookie("userData");
    res.clearCookie("pfp");
    res.redirect("/");
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