let trialChar;
let trialDuration

const scoreChar = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true];
const scoreDuration = [820, 469, 950, 926, 400, 853, 964, 906, 664, 556, 709, 948, 777, 578, 753, 1000, 639, 987, 959, 868, 818, 843, 666, 571, 858, 969, 471, 577, 712, 945, 746, 967, 696, 617, 492, 762, 741, 833, 570, 420]; 

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
