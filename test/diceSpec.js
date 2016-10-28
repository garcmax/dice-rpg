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
    beforeEach(function () {
        rng = sinon.stub(random, "dice").returns(
            function (engine) {
                return [4];
            }
        );
    });

    afterEach(function () {
        random.dice.restore();
    });

    it('should get the result from d6 d4', function (done) {
        let result = dice.rolled("d6 d4");
        rng.calledTwice.should.be.ok();
        rng.calledWith("6", "1").should.be.true();
        rng.calledWith("4", "1").should.be.true();
        done();
    });
});

describe('throwing two dices multiple times', function () {

    var rng;
    beforeEach(function () {
        rng = sinon.stub(random, "dice").returns(
            function (engine) {
                return [4];
            }
        );
    });

    afterEach(function () {
        random.dice.restore();
    });

    it('should get the result from 3d6 2d4', function (done) {
        let result = dice.rolled("3d6 2d4");
        rng.calledTwice.should.be.ok();
        rng.calledWith("6", "3").should.be.true();
        rng.calledWith("4", "2").should.be.true();
        done();
    });
});

describe('throwing multiple dices multiple times', function () {

    it('should get the result from 1d100 2d20 3d6 2d4', function (done) {
        let result = dice.rolled("1d100 2d20 3d6 2d4");        
        result[100].length.should.equal(1);
        result[20].length.should.equal(2);
        result[6].length.should.equal(3);
        result[4].length.should.equal(2);
        done();
    });
});

describe('Error catching', function () {

    it('should get the error from badly formed input : d11', function (done) {
        let result = dice.rolled("d11");        
        result.should.deepEqual({"error" : "Bad Input"})        
        done();
    });

    it('should get the error from badly formed input : d112d6', function (done) {
        let result = dice.rolled("d112d6");        
        result.should.deepEqual({"error" : "Bad Input"})        
        done();
    });

     it('should get the error from badly formed input : 10d6', function (done) {
        let result = dice.rolled("10d6");        
        result.should.deepEqual({"error" : "Bad Input"})        
        done();
    });
});