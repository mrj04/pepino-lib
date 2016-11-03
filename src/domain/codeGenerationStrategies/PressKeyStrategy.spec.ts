"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {PressKeyStrategy} from "./PressKeyStrategy";

describe("when converting pepino-lang instructions to send keys to the browser", () => {

    var strategy = new PressKeyStrategy();
    var instructions = "press key \"Page Down\"";
    var instructionsWithUnknownKey = "press key \"x\"";

    it("should be able to generate typing instructions", () => {
        expect(strategy.canGenerate(instructions)).to.be.true;
    });

    it("should pass on unrecognized instructions", () => {
        expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
    });

    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(instructions))
            .to.equal("this.browser.keys(\"\uE00F\");");
    });

    it("should convert the step to cucumberjs code for an unknown key", () => {
        expect(strategy.generate(instructionsWithUnknownKey))
            .to.equal("this.browser.keys(\"x\");");
    });    
});
