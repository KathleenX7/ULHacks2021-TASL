/**
 * @fileoverview ULHacks register client code
 */

const koroImages = [
    "KoroOriginal.png",
    "koroPink copy.png",
    "koroSpike.png",
    "koroWeirdSpike.png",
    "koroWow.png",
    "KoroYes.png",
    "koro😐.png", 
    "KoroAngry.png", 
    "koroAngry2.png", 
    "KoroCry.png", 
    "koroFloor.png", 
    "KoroGoo.png", 
    "KoroHehe.png", 
    "koroHuman.png",
    "KoroNo.png"
    
];

let pfpCount = 0;

var socket = io.connect();

var nameText = document.getElementById("rName");
var userText = document.getElementById("rUser");
var passText = document.getElementById("rPass");

/**
 * Sets the image based on count
 */
function setImage() {
    var pfp = document.getElementById("pfp");
    pfp.src = `/Images/Koro/${koroImages[pfpCount%koroImages.length]}`;
}

/**
 * Increases the count of profile pictures and bounds it
 */
function increasePfpCount() {
    pfpCount++;
    if(pfpCount > koroImages.length) {
        pfpCount%=koroImages.length;
    }
    setImage();
}

/**
 * Decreases count of profile pictures and bounds it
 */
function decreasePfpCount() {
    pfpCount--;
    while (pfpCount < 0) {
        pfpCount += koroImages.length;
    }
    setImage();
}

/**
 * Sends registration info to server
 */
function sendRegisterInfo() {
    if ((nameText.value !== "") && (userText.value !== "") && (passText.value !== "")) {
        socket.emit("register", {name: nameText.value, username: userText.value, password: passText.value, pfp: koroImages[pfpCount%koroImages.length]});
    }
}

socket.on("error", (errorMsg) => {
    var errorLabel = document.getElementById("errorMes");
    errorLabel.textContent = `Error: ${errorMsg}`;
});

socket.on("redirect", (redirect) => {
    console.log(redirect);
    window.location.href  = redirect;
});