"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {SwitchIFrameStrategy} from "./SwitchIFrameStrategy";

describe("when converting pepino-lang instructions to toggle a checkbox", () => {
    describe("without variables", () => {
        const strategy = new SwitchIFrameStrategy();
        const instructions = "Switch to iframe <#element>";

        it("should be able to generate typing instructions", () => {
            expect(strategy.canGenerate(instructions)).to.be.true;
        });

        it("should pass on unrecognized instructions", () => {
            expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
        });

        it("should convert the step to cucumberjs code", () => {
            expect(strategy.generate(instructions))
                .to.equal("this.browser.frame(browser.element(\"#element\").value);");
        });
    });

    describe("with variables", () => {
        const strategy = new SwitchIFrameStrategy();
        const instructions = "Switch to iframe <$element>";

        it("should convert the assert to jasmine expect code with correct variable element", () => {
            expect(strategy.generate(instructions))
                .to.equal("this.browser.frame(browser.element(element).value);");
        });
    });
});
