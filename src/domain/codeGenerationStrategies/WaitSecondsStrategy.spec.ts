"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {WaitSecondsStrategy} from "./WaitSecondsStrategy";

describe("when converting pepino-lang instructions to wait for some seconds", () => {

    var strategy = new WaitSecondsStrategy();
    var text = "Wait 3 seconds";

    it("should be able to generate for wait instructions", () => {
        expect(strategy.canGenerate(text)).to.be.true;
    });

    it("should pass on unrecognized instructions", () => {
        expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
    });

    it("should pass on similar instructions", () => {
        expect(strategy.canGenerate("Wait for <#something> element")).to.be.false;
    });

    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(text)).to.equal("this.browser.pause(3000);")
    });

    it("should not convert steps that are missing seconds", () => {
        expect(strategy.canGenerate("Wait three seconds")).to.be.false;
    });
});