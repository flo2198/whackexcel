let init = false;
let trialArray;

let scoreArray = {
    char: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true],
    duration: [820, 469, 950, 926, 412, 853, 964, 906, 664, 510, 709, 948, 477, 578, 733, 961, 639, 987, 959, 868, 828, 843, 528, 571, 858, 888, 471, 577, 712, 945, 746, 967, 496, 617, 427, 762, 741, 833, 508, 426]
}

/*
let scoreArray = {
    char: [false, true],
    duration: [2000, 10000]
}
*/

function initOfficalGame () {
    trialArray = scoreArray;
    init = true;
}

export function pickNext () {
    let arrayLength = trialArray.char.length;
    let randomNum = Math.floor(Math.random() * arrayLength);
    let randomChar = trialArray.char.splice(randomNum, 1)[0];
    let randomDur = trialArray.duration.splice(randomNum, 1)[0];
    return [randomDur, randomChar];
}

initOfficalGame()