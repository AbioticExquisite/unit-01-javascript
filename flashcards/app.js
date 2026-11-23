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