'use strict';

const should = require("should");
const sinon = require("sinon");
const random = require("random-js");

import * as dice from "../src/dice.js";

describe('throwing one dice once', function () {

    var rng;
    var rngResult = [4];
    beforeEach(function () {
        rng = sinon.stub(random, "dice").returns(
            function (engine) {
                return rngResult;
            }
        );
    });

    afterEach(function () {
        random.dice.restore();
    });

    it('should get the result from d4', function (done) {
        let result = dice.rolled("d4");
        rng.calledWith("4", "1").should.be.true();
        result.should.deepEqual({4: rngResult});
        done();
    });
    it('should get the result from d6', function (done) {
        let result = dice.rolled("d6");
        rng.calledWith("6", "1").should.be.true();
        result.should.deepEqual({6: rngResult});
        done();
    });
    it('should get the result from d20', function (done) {
        let result = dice.rolled("d20");
        rng.calledWith("20", "1").should.be.true();
        result.should.deepEqual({20: rngResult});
        done();
    });
    it('should get the result from d100', function (done) {
        let result = dice.rolled("d100");
        rng.calledWith("100", "1").should.be.true();
        result.should.deepEqual({100: rngResult});
        done();
    });
});

describe('throwing one dice twice', function () {

    var rng;
    var rngResult = [4,3]
    beforeEach(function () {
        rng = sinon.stub(random, "dice").returns(
            function (engine) {
                return rngResult;
            }
        );
    });

    afterEach(function () {
        random.dice.restore();
    });

    it('should get the result from 2d6', function (done) {
        let result = dice.rolled("2d6");
        rng.calledWith("6", "2").should.be.true();
        result.should.deepEqual({6: rngResult});
        done();
    });
});

describe('throwing two dices once', function () {

    var rng;
    var rngResult = [4,3]
    beforeEach(function () {
        rng = sinon.stub(random, "dice").returns(
            function (engine) {
                return rngResult;
            }
        );
    });

    afterEach(function () {
        random.dice.restore();
    });

    it('should get the result from d6 d4', function (done) {
        let result = dice.rolled("d6 d4");
        rng.calledWith("6", "1").should.be.true();
        rng.calledWith("4", "1").should.be.true();
        result.should.deepEqual({6: rngResult, 4: rngResult});
        done();
    });
});