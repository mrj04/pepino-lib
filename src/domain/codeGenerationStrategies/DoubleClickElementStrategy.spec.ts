"use strict";
import chai = require("chai");
var expect = chai.expect;
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {DoubleClickElementStrategy} from "./DoubleClickElementStrategy";

describe("when converting pepino-lang instructions to double click an element", () => {

    var strategy = new DoubleClickElementStrategy();
    var instructions = "Double Click <#element>";

    it("should be able to generate typing instructions", () => {
        expect(strategy.canGenerate(instructions)).to.be.true;
    });

    it("should pass on unrecognized instructions", () => {
        expect(strategy.canGenerate("unrecognized instructions")).to.be.false;
    });

    it("should convert the step to cucumberjs code", () => {
        expect(strategy.generate(instructions))
            .to.equal("this.browser.doubleClick(\"#element\");");
    });
});
