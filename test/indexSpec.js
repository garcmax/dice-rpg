'use strict';

const should = require("should");
const sinon = require("sinon");

const dicerpg = require('../index.js');
import * as dice from "../src/dice.js";

describe('module dicerpg', function () {

    beforeEach(function () {
        sinon.spy(dice, "rolled");
    });

    afterEach(function () {
        dice.rolled.restore();
    });

    it('should call function rolled', function (done) {
        let ret = dicerpg.rolled("d6");
        dice.rolled.calledOnce.should.be.ok;
        done();
    });
});