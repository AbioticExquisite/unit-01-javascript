"use strict";
const EXAM_DATE = new Date(2026, 10, 25);

let screenMsg = document.getElementById("screenMsg")

function checkScreen() {
   if (window.innerWidth < 600) {
    screenMsg.textContent = "Small screen: turn your device sideways for a bigger card.";
} 
    else {
        screenMsg.textContent = "Window width: " + (window.innerWidth) + " px"
    }
}

function startApp() {
    checkScreen();
}