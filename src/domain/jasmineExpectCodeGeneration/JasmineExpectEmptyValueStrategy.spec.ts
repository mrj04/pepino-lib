"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {JasmineExpectEmptyValueStrategy} from "./JasmineExpectEmptyValueStrategy";

describe("when converting pepino-lang instructions to a jasmine-style expect assertion in empty value ", () => {

    describe("without selector", () => {
        var strategy = new JasmineExpectEmptyValueStrategy();
        var instructions = "Verify \"something\" is empty";

        it("should be able to generate typing instructions", () => {
            expect(strategy.canGenerate(instructions)).to.be.true;
        });

        it("should not be able to generate because of invalid instructions", () => {
            expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
        });

        it("should not be able to generate because of missing 'is' parameter", () => {
            var similar_instructions = "Verify \"something\" empty";
            expect(strategy.canGenerate(similar_instructions)).to.be.false;
        });

        it("should not be able to generate because of missing 'empty' parameter", () => {
            var similar_instructions = "Verify \"something\" is";
            expect(strategy.canGenerate(similar_instructions)).to.be.false;
        });

        it("should be able to convert the assert empty value to jasmine expect code", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.getValue()).toEqual('');");
        });
    });

    describe("with selector", () => {
        var strategy = new JasmineExpectEmptyValueStrategy();
        var instructions = "Verify <$someElement> is empty";

        it("should convert the assert to jasmine expect code with correct variable element", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.getValue(someElement)).toEqual('');");
        });
    });
});
