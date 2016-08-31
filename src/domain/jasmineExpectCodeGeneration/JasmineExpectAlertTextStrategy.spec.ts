"use strict";
import chai = require("chai");
const expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {JasmineExpectAlertTextStrategy} from "./JasmineExpectAlertTextStrategy";

describe("when converting pepino-lang instructions to a jasmine-style expect assertion", () => {
    describe("without variables", () => {
        const strategy = new JasmineExpectAlertTextStrategy();
        const instructions = "Verify alert text to be \"something\"";

        it("should be able to generate typing instructions", () => {
            expect(strategy.canGenerate(instructions)).to.be.true;
        });

        it("should pass on unrecognized instructions", () => {
            expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
        });

        it("should convert the assert to jasmine expect code", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.alertText()).toContain(\"something\");");
        });
    });

    describe("with variable in the contents", () => {
        const strategy = new JasmineExpectAlertTextStrategy();
        const instructions = "Verify alert text to be \"$someString\"";

        it("should convert the assert to jasmine expect code with correct variable contents", () => {
            expect(strategy.generate(instructions))
                .to.equal("expect(browser.alertText()).toContain(someString);");
        });
    });

});
