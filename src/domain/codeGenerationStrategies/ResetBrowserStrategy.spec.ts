"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {ResetBrowserStrategy} from "./ResetBrowserStrategy";

describe("when converting pepino-lang instructions to reset the browser in order to start a new session", () => {

    var strategy = new ResetBrowserStrategy();
    var instructions = "Reset Browser";

    it("should be able to generate typing instructions", () => {
        expect(strategy.canGenerate(instructions)).to.be.true;
    });

    it("should pass on unrecognized instructions", () => {
        expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
    });

    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(instructions))
            .to.equal("this.browser.reload();");
    });
});
