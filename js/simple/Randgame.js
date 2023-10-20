function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomChar(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function pickNext () {
    return [randomTime(400, 1000), randomChar(0, 2)];
}