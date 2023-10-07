const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const targets = document.querySelectorAll('.target');
// const neos = document.querySelectorAll('.neo');
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
        console.log('Ah nah thats the same one bud');
        return randomHole(holes);
    }
    lastHole = idx;
    return idx;
}

/*
function randomPeeper(target) {
    console.log(target);
    const decider = Boolean(Math.round(Math.random()));
    console.log(decider);
    if (decider) {
        target.classList.add('excel');
        this.showing = 'excel';
    } else {
        target.classList.add('neo');
        this.showing = 'neo';
    }
    return decider;
}
*/

function randomPeeper(hole) {
    console.log(hole);
    const decider = Boolean(Math.round(Math.random()));
    console.log(decider);
    if (decider) {
        hole.classList.add('up', 'excel');
        this.showing = 'excel';
    } else {
        hole.classList.add('up', 'neo');
        this.showing = 'neo';
    }
    return decider;
}

function antiPeep(decider, hole) {
    if (decider) {
        hole.classList.remove('up', 'excel');
    } else {
        hole.classList.remove('up', 'neo');
    }
}

function peep() {
    const time = randomTime(1000, 1100); 
    const id = randomHole(holes);
    const hole = holes[id]
    // const target = targets[id]
    const decider = randomPeeper(hole);
    // hole.classList.add('up');
    setTimeout(() => {
        antiPeep(decider, hole);
        hole.classList.remove('up');
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

// Right hit (excel hit)
function bonk(e) {
    if (!e.isTrusted) return; // cheater!
    console.log('been clicked!')
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
// neos.forEach(neo => neo.addEventListener('click', fBonk));