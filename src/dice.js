'use strict';

const random = require("random-js");
const engine = random.engines.mt19937().autoSeed();

export function rolled(dices) {
    let rolls = dices.split(/\s/);
    let results = {};
    let regexp = /^(\d|d)d{0,1}([2468]|10|20|100)$/gi;
    console.log(`split : ${rolls}`);
    for (let i = 0; i < rolls.length; i++) {
        let matchs = regexp.exec(rolls[i]);
        console.log(`match : ${matchs} from ${rolls[i]}`);
        let times = /^\d+$/.test(matchs[1]) ? matchs[1] : "1";
        let dice = matchs[2];
        console.log(`throw : ${times}d${dice}`);
        let roll = random.dice(dice, times);
        let result = roll(engine);
        results[dice] = result;
    }
    return results;
}
