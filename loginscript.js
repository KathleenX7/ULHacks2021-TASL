/**
 * @fileoverview ULHacks login client code
 */

var socket = io.connect();

var userText = document.getElementById("tUser");
var passText = document.getElementById("tPass");

var login = document.getElementById("btnLog");

/**
 * Sends the login information to the server
 */
function sendLoginInfo() {
    if ((userText.value !== "") && (passText.value !== "")) {
        console.log({username:userText.value, password:passText.value});
        socket.emit("login", {username:userText.value, password:passText.value});
    }
}

socket.on("redirect", (redirect) => {
    console.log(redirect);
    window.location.href  = redirect;
});

socket.on("error", (errorMsg) => {
    var errorLabel = document.getElementById("errorMes");
    errorLabel.textContent = `Error: ${errorMsg}`;
});