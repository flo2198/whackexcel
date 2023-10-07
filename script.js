const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const targets = document.querySelectorAll('.target');
let lastHole;
let timeUp = false;
let score = 0;
let showing = 'init'

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    if (idx === lastHole) {
        return randomHole(holes);
    }
    lastHole = idx;
    return idx;
}

function randomPeeper(hole) {
    const decider = Boolean(Math.round(Math.random() * 0.6));
    if (decider) {
        hole.classList.add('up', 'neo');
        showing = 'neo';
    } else {
        hole.classList.add('up', 'excel');
        showing = 'excel';
    }
    return decider;
}

function antiPeep(decider, hole) {
    if (decider) {
        hole.classList.remove('up', 'neo');
    } else {
        hole.classList.remove('up', 'excel');
    }
}

function peep() {
    const time = randomTime(1000, 1100); 
    const id = randomHole(holes);
    const hole = holes[id]
    const decider = randomPeeper(hole);
    setTimeout(() => {
        antiPeep(decider, hole);
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000);
}

// Catch hit
function bonk(e) {
    console.log('Been hit!')
    if (!e.isTrusted) return; // cheater!
    if (showing === 'excel') {
        this.parentNode.classList.remove('up', 'excel');
        score++;
    }
    else if (showing === 'neo') {
        this.parentNode.classList.remove('up', 'neo');
        score--;
    }
    scoreBoard.textContent = score;
}

targets.forEach(target => target.addEventListener('click', bonk));