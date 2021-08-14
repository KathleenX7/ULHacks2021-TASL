/**
 * @fileoverview client side JS for game
 */
var socket = io.connect();
const username = getUsername();

var image = document.getElementById("image");
var choiceA = document.getElementById("aValue");
var choiceB = document.getElementById("bValue");
var choiceC = document.getElementById("cValue");
var choiceD = document.getElementById("dValue");

var radios = document.getElementsByName("answer");

var radA = document.getElementById("A");
var radB = document.getElementById("B");
var radC = document.getElementById("C");
var radD = document.getElementById("D");

var feedback = document.getElementById("feedback");

/**
 * Parses cookies and stuff to figure out what the username is
 * @returns username of the user
 */
function getUsername() {
    let ret = undefined;
    const allCookies = decodeURIComponent(document.cookie).split("; ");
    for(let i = 0;i < allCookies.length;i++) {;
        if (allCookies[i].split("=")[0] === "userData") {
            let start = allCookies[i].split("=")[1].indexOf("\"username\":\"") + "\"username\":\"".length;
            let end = allCookies[i].split("=")[1].indexOf(",") - 1;
            ret = allCookies[i].split("=")[1].substring(start, end);
        }
    }
    return ret;
}

/**
 * Requests a single question
 */
function requestLevel() {
    socket.emit("request question", username);
    console.log("sent request");
}

function submitQuestion() {
    for(let i = 0;i < radios.length;i++) {
        if (radios[i].checked) {
            socket.emit("answer", {image: image.src, answer: radios[i].value});
        }
    }
}

socket.on("question", (data) => {
    image.src = `Images/${data.image}`;
    let questions = data.questions;
    choiceA.innerHTML = questions[0];
    radA.value = questions[0];
    choiceB.innerHTML = questions[1];
    radB.value = questions[1];
    choiceC.innerHTML = questions[2];
    radC.value = questions[2];
    choiceD.innerHTML = questions[3];
    radD.value = questions[3];
});

socket.on("results", (response) => {
    feedback.innerHTML = response.feedback;
});