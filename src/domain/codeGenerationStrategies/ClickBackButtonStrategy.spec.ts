"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {ClickBackButtonStrategy} from "./ClickBackButtonStrategy";

describe("when converting pepino-lang instructions to click the back button", () => {

    var strategy = new ClickBackButtonStrategy();
    var instructions = "Click Back Button";

    it("should be able to generate typing instructions", () => {
        expect(strategy.canGenerate(instructions)).to.be.true;
    });

    it("should not pass on unrecognized instructions", () => {
        expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
    });

    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(instructions))
            .to.equal("this.browser.back();");
    });
});
