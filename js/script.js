import { pickNext } from "./simple/Randgame";

const holes = document.querySelectorAll('.hole');
const titleOrHelp = document.getElementById('titleOrHelp');
const gameMode = document.getElementById('myGame');
const targets = document.querySelectorAll('.target');
const butorpro = document.getElementById("buttonorprogress");

let lastHole;
let timeUp = false;
let score = 0;
let showing = 'none'
let injected = false;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    if (idx === lastHole) {
        return randomHole(holes);
    }
    return idx;
}

function randomPeeper(hole, target, decider) {
    hole.classList.add('up');
    if (decider) {
        target.classList.add('neo');
        showing = 'neo';
    } else {
        target.classList.add('excel');
        showing = 'excel';
    }
    return decider;
}

function antiPeep(decider, hole, target) {
    hole.classList.remove('up');
    if (decider) {
        target.classList.remove('neo');
    } else {
        target.classList.remove('excel');
    }
}

function peep() {
    const targetDecider = pickNext();
    const time = targetDecider[0];
    const decider = targetDecider[1];
    lastHole = randomHole(holes);
    const hole = holes[lastHole];
    const target = targets[lastHole];
    randomPeeper(hole, target, decider)
    setTimeout(() => {
        antiPeep(decider, hole, target);
        if (!timeUp) peep();
    }, time);
}

async function init() {
    inject();
    const localScore = document.getElementById('score');
    scoreBoard = localScore;
    selectGame();
    await wait();
    startTimer();
    startGame();
}

function selectGame() {
    if (gameMode.value == "random") {
        import { pickNext } from "./simple/Randgame";
        return pickNext;
    } else if (gameMode.value == "official") {
        import { pickNext } from "./official/Highscore";
    } else if (gameMode.value == "expert") {
        import { pickNext } from './expert/Experts.js';
    } else {
        import { pickNext } from "./simple/Randgame";
    }
}

async function wait() {
    return new Promise(r => setTimeout(r, 1000));
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 30000);
}

function startTimer() {
    butorpro.innerHTML = '<progress value="0" max="30" id="countdown"></progress>';
    countDown = document.getElementById("countdown");
    var timeVal = 0;
    var downloadTimer = setInterval(function(){
        if(timeVal >= 30){
            butorpro.innerHTML = '<span id="myButton"><button id= "topButton" onClick="startGame();startTimer()">Start!</button></span>';
            clearInterval(downloadTimer);
        }
        countDown.value = timeVal;
        timeVal++;
    }, 1000);
}


function showHelp () {
    document.getElementById("overlay").style.display = "block";
}

function hideHelp () {
    document.getElementById("overlay").style.display = "none";
}

function inject () {
    if (! injected) {
        titleOrScore.innerHTML = 'Whack-An-Excel!';
        injected = true;
    }
    else {
        titleOrScore.innerHTML = 'Your Score:<span id="score">0</span>';
        injected = false;
    }    
}

// Catch hit
function bonk(e) {
    let targetVal = e.target.classList[1];
    let hitId = targetVal.substring(6);
    let buttonHit = checkButton(e.which, e.button);
    if (hitId == lastHole) {
        if (!e.isTrusted) {
            console.log('CHEATER!'); 
            return; // cheater!
        }
        if (showing == 'excel') {
            if (buttonHit != null) {
                this.parentNode.children[0].classList.remove('excel');
                this.parentNode.classList.remove('up');
                if (buttonHit) score++
                else score--
            }
        }
        else if (showing == 'neo') {
            if (buttonHit != null) {
                this.parentNode.children[0].classList.remove('neo');
                this.parentNode.classList.remove('up');
                if (! buttonHit) score += 2;
                else score -= 2;
            }
        }
    } else if (showing == 'none') {
        return;
    } else {
        return;
    }
    showing = 'none';
    scoreBoard.textContent = score;
}

function checkButton (theWhich, theButton) {
    if (theWhich == 1 || theButton === 0) return true
    else if (theWhich === 3 || theButton === 2) return false
    else return null
}

targets.forEach(target => target.addEventListener('mousedown', bonk));