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

/**
 * Checks if an item is inside an array
 * @param {any} item the item to check
 * @param {array} array the array to check in
 * @returns true if it's inside, false otherwise
 */
function isIn(item, array) {
    for(let i = 0;i < array.length;i++) {
        if (array[i] === item) {
            return true;
        }
    }
    return false;
}

/**
 * Picks a certain number of unique elements from an array
 * @param {array} arr the array to choose from
 * @param {*} notThis a single element that should not be in the array
 * @param {integer} size number of unique elements to choose from the array
 * @returns a new array with size number of unique elements from arr, notThis not included
 */
function pickFromArray(arr, notThis, size) {
    let ret = [];
    while (ret.length < size) {
        let item = arr[Math.floor(Math.random()*arr.length)];
        if ((item !== notThis) && (!isIn(item, ret))) {
            ret.push(item);
        }
    }
    return ret;
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
    const user = req.cookies.userData;
    const level = req.cookies.level;
    for(let i = 0;i < users.length;i++) {
        if (users[i].username === user.username) {
            users[i].level = level;
        }
    }
    res.sendFile(__dirname + "/Game.html");
});

app.get("/userinfo", (req, res) => {
    res.sendFile(__dirname + "/UserInfoPage.html");
});

//oof imagine writing good code
app.get("/1", (req, res) => {
    res.cookie("level", 1);
    res.redirect("/game");
});

app.get("/2", (req, res) => {
    res.cookie("level", 2);
    res.redirect("/game");
});

app.get("/3", (req, res) => {
    res.cookie("level", 3);
    res.redirect("/game");
});

app.get("/4", (req, res) => {
    res.cookie("level", 4);
    res.redirect("/game");
});

app.get("/5", (req, res) => {
    res.cookie("level", 5);
    res.redirect("/game");
});

app.get("/6", (req, res) => {
    res.cookie("level", 6);
    res.redirect("/game");
});

app.get("/7", (req, res) => {
    res.cookie("level", 7);
    res.redirect("/game");
});

app.get("/8", (req, res) => {
    //since this is final exam, should do some check probably
    res.cookie("level", 8);
    res.redirect("/game");
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
    socket.on("request question", (username) => {
        for(let i = 0;i < users.length;i++) {
            if (users[i].username === username) {
                console.log(users[i]);
                let level = users[i].level;
                //send question
                if (level === "1"){
                    let index = Math.floor(Math.random()*questions.alphabet.length);
                    questionsToSend = pickFromArray(questions.alphabet, questions.alphabet[index], 3);
                    questionsToSend.push(questions.alphabet[index]);
                    questionsToSend.sort(() => Math.random() - 0.5); //apparently this shuffles (even if it doesn't sorting works fine)
                    console.log({image: `/1-Alphabet/${questionFiles.alphabet[index]}`, questions: questionsToSend});
                    io.to(socket.id).emit("question", {image: `/1-Alphabet/${questionFiles.alphabet[index]}`, questions: questionsToSend});
                }
            }
        }
    });
});