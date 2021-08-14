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

function requestLevel() {
    socket.emit("request question", username);
    console.log("sent request");
}

socket.on("question", (data) => {
    image.src = `Images/${data.image}`;
    let questions = data.questions;
    choiceA.innerHTML = questions[0];
    choiceB.innerHTML = questions[1];
    choiceC.innerHTML = questions[2];
    choiceD.innerHTML = questions[3];
});