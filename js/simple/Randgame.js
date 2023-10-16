function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomChar() {
    return Boolean(Math.round(Math.random() * 0.6));
}

export function pickNext () {
    return [randomTime(400, 1000), randomChar()];
}
