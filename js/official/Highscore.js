let init = false;
let trialArray;

let scoreArray = {
    char: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true],
    duration: [820, 469, 950, 926, 400, 853, 964, 906, 664, 556, 709, 948, 777, 578, 753, 1000, 639, 987, 959, 868, 818, 843, 666, 571, 858, 969, 471, 577, 712, 945, 746, 967, 696, 617, 492, 762, 741, 833, 570, 420]
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