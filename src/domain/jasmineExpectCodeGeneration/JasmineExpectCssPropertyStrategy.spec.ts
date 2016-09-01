"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {JasmineExpectCssPropertyStrategy} from "./JasmineExpectCssPropertyStrategy";

describe("when converting pepino-lang instructions to a jasmine-style expect assertion", () => {
    describe("without variables", () => {
        const strategy = new JasmineExpectCssPropertyStrategy();
        const instructions = "Verify that object \"selector\" has css property \"color\" with value \"value\"";

        it("should be able to generate css property instructions", () => {
            expect(strategy.canGenerate(instructions)).to.be.true;
        });

        it("should pass on unrecognized instructions", () => {
            expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
        });

        it("should convert the assert to jasmine expect code", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(JSON.stringify(browser.getCssProperty(\"selector\", \"color\")).toUpperCase()).toContain(\"value\".toUpperCase());");
        });
    });

    describe("with variable in the object", () => {
        const strategy = new JasmineExpectCssPropertyStrategy();
        const instructions = "Verify that object \"$selector\" has css property \"color\" with value \"value\"";

        it("should convert the assert to jasmine expect code with correct variable object", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(JSON.stringify(browser.getCssProperty(selector, \"color\")).toUpperCase()).toContain(\"value\".toUpperCase());");
        });
    });

    describe("with variable in the property", () => {
        const strategy = new JasmineExpectCssPropertyStrategy();
        const instructions = "Verify that object \"selector\" has css property \"$color\" with value \"value\"";

        it("should convert the assert to jasmine expect code with correct variable property", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(JSON.stringify(browser.getCssProperty(\"selector\", color)).toUpperCase()).toContain(\"value\".toUpperCase());");
        });
    });

    describe("with variable in the value", () => {
        const strategy = new JasmineExpectCssPropertyStrategy();
        const instructions = "Verify that object \"selector\" has css property \"color\" with value \"$value\"";

        it("should convert the assert to jasmine expect code with correct variable value", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(JSON.stringify(browser.getCssProperty(\"selector\", \"color\")).toUpperCase()).toContain(value.toUpperCase());");
        });
    });
});
