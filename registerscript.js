/**
 * @fileoverview ULHacks register client code
 */

var socket = io.connect();

var nameText = document.getElementById("rName");
var userText = document.getElementById("rUser");
var passText = document.getElementById("rPass");


function register() {
}

socket.on("login error", (errorMsg) => {
    var errorLabel = document.getElementById("errorMes");
    errorLabel.textContent = `Error: ${errorMsg}`;
});