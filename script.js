const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const targets = document.querySelectorAll('.target');
const switchButton = document.getElementById("myButton");
const switchProgress = document.getElementById("myProgress");
const butorpro = document.getElementById("buttonorprogress");

let lastHole = 10;
let timeUp = false;
let score = 0;
let showing = 'none'

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

function randomPeeper(hole, target) {
    const decider = Boolean(Math.round(Math.random() * 0.6));
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
    const time = randomTime(400, 1000); 
    lastHole = randomHole(holes);
    const hole = holes[lastHole];
    const target = targets[lastHole];
    const decider = randomPeeper(hole, target);
    setTimeout(() => {
        antiPeep(decider, hole, target);
        if (!timeUp) peep();
    }, time);
}

function init() {
    wait();
    startTimer();
    startGame();
}

async function wait() {
    await new Promise(r => setTimeout(r, 2000));
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
            butorpro.innerHTML = '<span id="myButton"><button id= "startButton" onClick="startGame();startTimer()">Start!</button></span>';
            clearInterval(downloadTimer);
        }
        countDown.value = timeVal;
        timeVal++;
    }, 1000);
}

// Catch hit
function bonk(e) {
    let targetVal = e.target.classList[1];
    let hitId = targetVal.substring(6);
    if (hitId == lastHole) {
        if (!e.isTrusted) {
            console.log('CHEATER!'); 
            return; // cheater!
        }
        if (showing == 'excel') {
            this.parentNode.children[0].classList.remove('excel');
            this.parentNode.classList.remove('up');
            score++;
        }
        else if (showing == 'neo') {
            this.parentNode.children[0].classList.remove('neo');
            this.parentNode.classList.remove('up');
            score = score - 2;
        }
    } else if (showing == 'none') {
        return;
    } else {
        return;
    }
    showing = 'none';
    scoreBoard.textContent = score;
}

targets.forEach(target => target.addEventListener('click', bonk));
