"use strict";
const EXAM_DATE = new Date(2026, 10, 25);


function checkScreen() {
    if (window.innerWidth < 600) {
        document.getElementById("screenMsg").textContent = "Small screen: turn your device sideways for a bigger card.";
    }
    else {
        document.getElementById("screenMsg").textContent = "Window width: " + (window.innerWidth) + "px"
    }
}


function startApp() {
    checkScreen();
    // checkpoint 3
    document.getElementById("nextBtn").addEventListener("click", nextCard);
    document.getElementById("card").addEventListener("mouseover", highlightCard);
    document.getElementById("card").addEventListener("mouseout", unhighlightCard);
    document.addEventListener("keydown", checkKey);

    showCard(current);

    // checkpoint 4
    showCountdown();
    updateScore();
    document.getElementById("shuffleBtn").addEventListener("click", shuffleCard);
    document.getElementById("gotBtn").addEventListener("click", markGot);
    document.getElementById("missBtn").addEventListener("click", markMissed);
    document.getElementById("resetBtn").addEventListener("click", resetScore);
}

function getDomain(objective) {
    switch (objective.charAt(0)) {
        case "1":
            return "Operators, Methods, and Keywords";
        case "2":
            return "Variables, Data Types, and Functions";
        case "3":
            return "Decisions and Loops";
        case "4":
            return "Document Object Model";
        case "5":
            return "5 HTML Forms";
        default:
            return "Unknown domain";
    };
}

function Card(question, answer, objective) {
    this.question = question;
    this.answer = answer;
    this.objective = objective;
    this.getLabel = function () {
        return "Obj " + this.objective + " | " + getDomain(objective);
    };
}

let deck = [
    new Card('"5" + 3', "53 -- a string plus a number with join the two together", "1.1"),
    new Card("a++", "postfix -- adding one to a after it's used", "1.1"),
    new Card("typeof null", "object -- null always returns as an object", "2.1"),
    new Card("typeof NaN", "number -- NaN is used for numbers", "2.1"),
    new Card('"5" == 5', "true -- double equal looks past the string and sees the values (5)", "3.1"),
    new Card('"5" === 5', "false -- triple equal is more strict so it differentiates the string and number", "3.1"),
    new Card("NaN === NaN", "true -- NaN is equal to itself", "3.1"),
    new Card('parseInt("3.9")', "3 -- parseInt only takes the integer", "2.1"),
    new Card("toFixed type", "string -- toFixed always returns a string", "2.1"),
    new Card("Math.round(-2.5)", "-2 -- rounding a negative moves it up or to the left of the number line", "2.4"),
];

// Checkpoint 3
let current = 0

function showCard(index) {
    document.getElementById("cardLabel").textContent = deck[index].getLabel();
    document.getElementById("cardQuestion").textContent = deck[index].question
    document.getElementById("cardAnswer").textContent = deck[index].answer
    document.getElementById("cardAnswer").style.display = "none"
    document.getElementById("cardNumber").textContent = "Card " + (index + 1) + " of " + deck.length;
}

function flipCard() {
    if (document.getElementById("cardAnswer").style.display === "none") {
        document.getElementById("cardAnswer").style.display = "block";
    } else {
        document.getElementById("cardAnswer").style.display = "none";
    }
}

function nextCard() {
    current++
    if (current % deck.length === 0) {
        current = 0;
    }
    showCard(current);
}

function highlightCard() {
    let card = document.getElementById("card");
    card.className = "card highlight";
}

function unhighlightCard() {
    let card = document.getElementById("card")
    card.className = "card"
}

function checkKey(event) {
    if (event.key === "ArrowRight") {
        nextCard();
    }
}

// checkpoint 4
let gotIt = 0;
let missed = 0;

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleCard() {
    current = getRandom(0, deck.length - 1);
   showCard(current);
}
function updateScore() {
    if (document.getElementById("scoreMsg").textContent === "") {
        document.getElementById("scoreMsg").textContent = "No cards scored yet."
    } else {
    document.getElementById("scoreMsg").textContent = gotIt + " of " + (gotIt + missed) + " correct (" + Math.round((gotIt / (gotIt + missed)) * 100) + " %) "
}
if (Math.round((gotIt / (gotIt + missed)) * 100).toFixed(1) >= 90) {
    document.getElementById("scoreMsg").textContent += "Exam ready!"
} else if (Math.round((gotIt / (gotIt + missed)) * 100).toFixed(1) >= 80) {
    document.getElementById("scoreMsg").textContent += "Almost there. Keep flipping."
} else if (Math.round((gotIt / (gotIt + missed)) * 100).toFixed(1) >= 70) {
    document.getElementById("scoreMsg").textContent += "Flip your missed cards again."
}
}

function markGot() {
    gotIt += 1
    current++
    updateScore()
}

function markMissed() {
    missed += 1
    current++
    updateScore()
}

function resetScore() {
    let reset = confirm("Reset your score to 0?")
    if (reset === true) {
        gotIt = 0
        missed = 0
        document.getElementById("scoreMsg").textContent = ""
        updateScore()
    }
}

function showCountdown() {
    let date = new Date()
    document.getElementById("countdown").textContent = Math.ceil((EXAM_DATE - date) / (1000 * 60 * 60 * 24)) + " day until exam day." +
    EXAM_DATE.toLocaleDateString("en-US")
    if (date >= EXAM_DATE) {
        document.getElementById("countdown").textContent = "Exam day is here " + EXAM_DATE.toLocaleString("en-US") + ", You've got this! "
    }
}