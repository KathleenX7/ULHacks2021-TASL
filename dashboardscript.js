/**
 * @fileoverview client side 
 */
var socket = io.connect();

const username = getUsername();
const starImageMap = {
    0: "./Images/StarSystem/zerostars.png",
    1: "./Images/StarSystem/onestar.png",
    2: "./Images/StarSystem/twostars.png",
    3: "./Images/StarSystem/threestars.png"
}
var starCounter = document.getElementById("starCount");
var starCounters = [
    document.getElementById("1"),
    document.getElementById("2"),
    document.getElementById("3"),
    document.getElementById("4"),
    document.getElementById("5"),
    document.getElementById("6"),
    document.getElementById("7"),
    document.getElementById("8")
]

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
 * Requests the star count from the server
 */
function requestStarCount() {
    socket.emit("star request", username);
}

socket.on("stars", (starData) => {
    console.log(starData);
    let totalStars = starData[1] + starData[2] + starData[3] + starData[4] + starData[5] + starData[6] + starData[7];
    for (let i = 0;i < starCounters.length;i++) {
        starCounters[i].src = starImageMap[starData[i + 1]];
    }
    starCounter.innerHTML = totalStars;
})