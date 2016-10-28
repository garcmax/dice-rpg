'use strict';

const random = require("random-js");
const engine = random.engines.mt19937().autoSeed();

export function rolled(input) {
    let rolls = input.split(/\s/);
    let results = {};
    let regexp = /^(\d|d)d{0,1}([2468]|10|12|20|100)$/i;
    for (let i = 0; i < rolls.length; i++) {
        let dices;
        try {
            dices = extractDices(rolls[i], regexp);
        } catch(e) {
            return { "error": "Bad Input" };
        }
        results[dices.dice] = rollDices(dices);
    }
    return results;
}

function extractDices(roll, regexp) {
    let matchs = regexp.exec(roll);
    if (matchs == null) {
        throw "1";
    }
    let times = /^\d+$/.test(matchs[1]) ? matchs[1] : "1";
    let dice = matchs[2];
    return {"dice" : dice, "times": times}
}

function rollDices(dices) {
    let roll = random.dice(dices.dice, dices.times);
    return roll(engine);    
}