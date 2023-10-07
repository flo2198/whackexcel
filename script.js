const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const targets = document.querySelectorAll('.target');
let lastHole;
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
    this.lastHole = idx;
    return idx;
}

function randomPeeper(hole, target) {
    const decider = Boolean(Math.round(Math.random() * 0.6));
    hole.classList.add('up');
    if (decider) {
        target.classList.add('neo');
        showing = 'neo';
    } else {
        // hole.classList.add('up');
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
        // hole.classList.remove('up', 'excel');
    }
}

function peep() {
    const time = randomTime(400, 1000); 
    const id = 3;// randomHole(holes);
    const hole = holes[id];
    console.log(hole);
    console.log(lastHole);
    const target = targets[id];
    const decider = randomPeeper(hole, target);
    setTimeout(() => {
        antiPeep(decider, hole, target);
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000);
    showing = 'none';
}

// Catch hit
function bonk(e) {
    let targetVal = e.target.classList[1];
    let hitId = targetVal.substring(6);
    console.log(hitId);
    console.log(lastHole);
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
            score--;
        }
    } else if (showing == 'none') {
        return;
    } else {
        score--;
    }
    scoreBoard.textContent = score;
}

targets.forEach(target => target.addEventListener('click', bonk));