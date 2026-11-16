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
}

function getDomain(objective) {
    switch (objective.charAt(0)){
    case 1: 
        return "Operators, Methods, and Keywords";
    break;
    case 2: 
    return "Variables, Data Types, and Functions";
    break;
    case 3: 
    return "Decisions and Loops";
    break;
    case 4: 
    return "Document Object Model";
    break;
    case 5: 
    return "5 HTML Forms";
    break;
    default: 
    return "Unknown domain";
    };
}

function Card(question, answer, objective) {
    this.question = question;
    this.answer = answer;
    this.objective = objective;
    this.describe = function getLabel() {
        return "Obj " + this.objective + " | " + this.getDomain(objective);
    };
}

let deck = [
    new Card('"5" + 3', "53", "1.1"),
    new Card("a++", "", "1.1"),
    new Card("typeof null", "boolean", "2.1"),
    new Card("typeof NaN", "number", "2.1"),
    new Card('"5" == 5', "true", "3.1"),
    new Card('"5" === 5', "false", "3.1"),
    new Card("NaN === NaN", "true", "3.1"),
    new Card('parseInt("3.9")', "3", "2.1"),
    new Card("toFixed type", "string", "2.1"),
    new Card("Math.round(-2.5)", "-2", "2.4"),
]

console.log(getDomain("4.2"))