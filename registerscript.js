/**
 * @fileoverview ULHacks register client code
 */

const koroImages = [
    "koro😐.png", 
    "KoroAngry.png", 
    "koroAngry2.png", 
    "KoroCry.png", 
    "koroFloor.png", 
    "KoroGoo.png", 
    "KoroHehe.png", 
    "koroHuman.png",
    "KoroNo.png",
    "KoroOriginal.png",
    "koroPink copy.png",
    "koroSpike.png",
    "koroWeirdSpike.png",
    "koroWow.png",
    "KoroYes.png"
];

let pfpCount = 0;

var socket = io.connect();

var nameText = document.getElementById("rName");
var userText = document.getElementById("rUser");
var passText = document.getElementById("rPass");

function setImage() {
    var pfp = document.getElementById("pfp");
    pfp.src = `/Images/Koro/${koroImages[pfpCount%koroImages.length]}`;
}

function increasePfpCount() {
    pfpCount++;
    if(pfpCount > koroImages.length) {
        pfpCount%=koroImages.length;
    }
    setImage();
}

function decreasePfpCount() {
    pfpCount--;
    while (pfpCount < 0) {
        pfpCount += koroImages.length;
    }
    setImage();
}

function sendRegisterInfo() {
}

socket.on("login error", (errorMsg) => {
    var errorLabel = document.getElementById("errorMes");
    errorLabel.textContent = `Error: ${errorMsg}`;
});