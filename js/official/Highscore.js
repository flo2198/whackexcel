let trialChar;
let trialDuration

const scoreChar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2];
const scoreDuration = [607, 629, 620, 637, 496, 714, 733, 486, 546, 459, 666, 699, 520, 517, 782, 563, 568, 412, 702, 507, 579, 432, 429, 670, 501, 581, 555, 657, 462, 595, 595, 576, 577, 752, 446, 447, 419, 665, 739, 748, 636, 470, 512, 568, 502, 413, 757, 420, 605, 591, 608, 634, 423, 617, 478, 560, 512, 435, 516, 594, 718, 520, 607, 629, 726, 611, 545, 550, 472, 483]; 

function initOfficalGame () {
    console.log('initting official');
    trialChar = [...scoreChar];
    trialDuration = [...scoreDuration];
}

export function pickNext () {
    let arrayLength = trialChar.length;
    let randomNum = Math.floor(Math.random() * arrayLength);
    let randomChar = trialChar.splice(randomNum, 1)[0];
    let randomDur = trialDuration.splice(randomNum, 1)[0];
    if (trialChar.length == 0) initOfficalGame()
    return [randomDur, randomChar];
}

initOfficalGame()