/**
 * @fileoverview client side JS for congrats and fail
 */
const level = getLevel();
const levelAndTopicMap = {
    "1": "Alphabet",
    "2": "Numbers",
    "3": "One Word Questions",
    "4": "Adjectives",
    "5": "Nouns",
    "6": "Verbs",
    "7": "Common Phrases",
    "8": "Final Wave"
}

var topic = document.getElementById("topic");

/**
 * Gets what level the user was on
 * @returns the level
 */
function getLevel() {
    let ret = undefined;
    const allCookies = decodeURIComponent(document.cookie).split("; ");
    for(let i = 0;i < allCookies.length;i++) {;
        if (allCookies[i].split("=")[0] === "level") {
            ret = allCookies[i].split("=")[1];
        }
    }
    return ret;
}

function setTopic() {
    topic.innerHTML = levelAndTopicMap[level];
}