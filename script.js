/**
 * @fileoverview ULHacks client code
 */

var socket = io.connect();

var userText = document.getElementById("tUser");
var passText = document.getElementById("tPass");

var login = document.getElementById("btnLog");

function sendLoginInfo() {
    if ((userText.value !== "") && (passText.value !== "")) {
        console.log(userText.value + passText.value);
        // socket.emit("login", );
    }
}