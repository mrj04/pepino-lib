"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {RightClickElementStrategy} from "./RightClickElementStrategy";

describe("when converting pepino-lang instructions to right click an element", () => {

    var strategy = new RightClickElementStrategy();
    var instructions = "Right Click <#element>";

    it("should be able to generate typing instructions", () => {
        expect(strategy.canGenerate(instructions)).to.be.true;
    });

    it("should pass an unrecognized instructions", () => {
        expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
    });

    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(instructions))
            .to.equal("this.browser.rightClick(\"#element\");");
    });
});
